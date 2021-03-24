"""
HTTP server and application launcher
"""

import sys
import os.path
import logging
import logging.config
from os import environ
from configparser import ConfigParser
from functools import wraps

from sqlalchemy import engine_from_config
from bottle import response, HTTPError, request, static_file, redirect, HTTPResponse
from bottle.ext.sqlalchemy import Plugin as SQLAlchemyPlugin

from . import app
from .liquidsoap_connector import Connection

_log = logging.getLogger(__name__)

def read_bool_param(param):
    debug = app.config['listen'].get(param)
    if debug in ('False', 'false'):
        return False
    else:
        return bool(debug)

def main():
    if len(sys.argv) < 2:
        print("Missing argument: path to showergel's .ini", file=sys.stderr)
        sys.exit(1)
    config_path = sys.argv[1]
    logging.config.fileConfig(config_path, disable_existing_loggers=False)

    # we don't use Bottle's app.config.load_config because it's eager loading
    # values: that doesn't go well with interpolation keys in logging config
    parser = ConfigParser()
    parser.read(config_path)
    app.config = parser

    engine = engine_from_config(app.config['db'])
    app.install(SQLAlchemyPlugin(engine))

    static_root = os.path.join(os.path.dirname(__file__), 'www')
    _log.info("static_root=%s",static_root)
    @app.route('/<path:path>')
    def serve_front(path):
        return static_file(path, root=static_root)
    @app.route('/')
    def root_redirect():
        redirect('/index.html')

    def force_python_rootlogger(fn):
        """
        Server's logger may bypasses our logging.config.fileConfig,
        especially when an error occurs. So we add this tiny plugin
        """
        @wraps(fn)
        def _force_python_rootlogger(*args, **kwargs):
            try:
                actual_response = fn(*args, **kwargs)
            except HTTPError:
                raise
            except Exception as excn:
                if isinstance(excn, HTTPResponse):
                    # may happen when redirecting: Bottle raises a response
                    return excn
                else:
                    _log.exception(excn)
                    raise HTTPError(500, "Internal Error", excn) from None
            return actual_response
        return _force_python_rootlogger
    app.install(force_python_rootlogger)

    def send_cors(fn):
        """
        Send CORS headers along all requests.
        This is only enabled in debug mode, because WebPack's live-compiling-server
        is hosting on another port
        """
        @wraps(fn)
        def _send_cors(*args, **kwargs):
            response.headers['Access-Control-Allow-Origin'] = '*'
            response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, OPTIONS, HEAD, DELETE'
            response.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token'

            if request.method != 'OPTIONS':
                return fn(*args, **kwargs)
        return _send_cors

    server = 'paste'
    debug = read_bool_param('debug')
    if read_bool_param('demo'):
        # stubbing to :memory: works better with the default, mono-threaded server
        server = 'wsgiref'
        app.install(send_cors)
        from showergel.demo import stub_all
        stub_all(app.get_engine(), app.config)
    elif debug:
        _log.warning("Running in development mode - don't do this on a broadcasting machine")
        app.install(send_cors)

    Connection.setup(app.config)

    try:
        port = int(app.config['listen']['port'])
    except ValueError:
        port = int(environ[app.config['listen']['port']])

    app.run(
        server=server,
        host=app.config['listen']['address'],
        port=port,
        reloader=debug,
        quiet=True,
    )
