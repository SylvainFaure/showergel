(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["users"],{"1b5b":function(e,t,s){},ed81:function(e,t,s){"use strict";s.r(t);var a=s("7a23"),n=Object(a["M"])("data-v-76109be4");Object(a["t"])("data-v-76109be4");var c={id:"playout_history",class:"content"},d=Object(a["g"])("h1",null,"Users",-1),r=Object(a["g"])("p",null,[Object(a["f"])(" From here you can edit usernames and passwords that will be allowed to stream, if "),Object(a["g"])("code",null,"harbor"),Object(a["f"])(" authentication "),Object(a["g"])("a",{href:"https://showergel.readthedocs.io/en/latest/liquidsoap.html#authenticating-users-on-harbor",target:"_blank"}," is set up "),Object(a["f"])(". ")],-1),o=Object(a["g"])("div",{class:"modal-background"},null,-1),l={class:"modal-card"},i={class:"modal-card-head"},u=Object(a["g"])("p",{class:"modal-card-title"},"Create user account",-1),b={class:"modal-card-body"},j=Object(a["g"])("p",null," Avoid special characters (even spaces) in usernames. ",-1),O={class:"field"},g=Object(a["g"])("label",{class:"label",for:"username"},"Username",-1),h={class:"control"},m={class:"field"},f=Object(a["g"])("label",{class:"label",for:"password"},"Pass phrase",-1),p={class:"control"},w={class:"field"},U=Object(a["g"])("label",{class:"label",for:"password_confirmation"},"Confirm pass phrase",-1),v={class:"control"},P={class:"help is-danger"},C={class:"modal-card-foot"},A=Object(a["g"])("button",{class:"button is-success",type:"submit",form:"addUser"},"Create account",-1),_={class:"table-container"},k={class:"table is-striped"},y=Object(a["g"])("thead",null,[Object(a["g"])("tr",null,[Object(a["g"])("th",null,"Username"),Object(a["g"])("th",null,"Created"),Object(a["g"])("th",null,"Modified"),Object(a["g"])("th",null,"Actions")])],-1),M=Object(a["g"])("i",{class:"mdi mdi-account-off"},null,-1);Object(a["r"])();var q=n((function(e,t,s,n,q,F){return Object(a["q"])(),Object(a["d"])("div",c,[d,r,Object(a["g"])("button",{class:"button block is-primary is-rounded",onClick:t[1]||(t[1]=function(e){return q.showUserAdd=!0})},"Add"),Object(a["g"])("div",{class:["modal",{"is-active":q.showUserAdd}]},[o,Object(a["g"])("div",l,[Object(a["g"])("header",i,[u,Object(a["g"])("button",{class:"delete","aria-label":"close",onClick:t[2]||(t[2]=function(e){return F.resetAdd()})})]),Object(a["g"])("section",b,[Object(a["g"])("form",{onSubmit:t[6]||(t[6]=Object(a["L"])((function(e){return F.addUser()}),["prevent"])),class:"box",id:"addUser"},[j,Object(a["g"])("div",O,[g,Object(a["g"])("div",h,[Object(a["K"])(Object(a["g"])("input",{class:"input",id:"username","onUpdate:modelValue":t[3]||(t[3]=function(e){return q.addUsername=e})},null,512),[[a["F"],q.addUsername]])])]),Object(a["g"])("div",m,[f,Object(a["g"])("div",p,[Object(a["K"])(Object(a["g"])("input",{class:"input",type:"password",id:"password","onUpdate:modelValue":t[4]||(t[4]=function(e){return q.addPassword=e})},null,512),[[a["F"],q.addPassword]])])]),Object(a["g"])("div",w,[U,Object(a["g"])("div",v,[Object(a["K"])(Object(a["g"])("input",{class:"input",type:"password",id:"password_confirmation","onUpdate:modelValue":t[5]||(t[5]=function(e){return q.addPasswordConfirmation=e})},null,512),[[a["F"],q.addPasswordConfirmation]])]),Object(a["K"])(Object(a["g"])("p",P," Pass phrases don't match ",512),[[a["G"],F.addPasswordsMismatch]])])],32)]),Object(a["g"])("footer",C,[A,Object(a["g"])("button",{class:"button",onClick:t[7]||(t[7]=function(e){return F.resetAdd()})},"Cancel")])])],2),Object(a["g"])("div",_,[Object(a["g"])("table",k,[y,Object(a["g"])("tbody",null,[(Object(a["q"])(!0),Object(a["d"])(a["a"],null,Object(a["w"])(q.users,(function(e){return Object(a["q"])(),Object(a["d"])("tr",{key:e.username},[Object(a["g"])("td",null,Object(a["B"])(e.username),1),Object(a["g"])("td",null,Object(a["B"])(new Date(e.created_at).toLocaleString()),1),Object(a["g"])("td",null,Object(a["B"])(new Date(e.modified_at).toLocaleString()),1),Object(a["g"])("td",null,[Object(a["g"])("button",{class:"button is-danger icon",onClick:function(t){return F.deleteUser(e.username)},title:"Remove user account"},[M],8,["onClick"])])])})),128))])])])])})),F=s("ba6a"),K={error_handler:function(e){e.response&&e.response.data.message?console.log(e.response.data.message):console.log(e)}},R={data:function(){return{addUsername:"",addPassword:"",addPasswordConfirmation:"",showUserAdd:!1,users:[]}},computed:{addPasswordsMismatch:function(){return this.addPassword!=this.addPasswordConfirmation}},methods:{getUsers:function(){F["a"].get("/users").then(this.onResults).catch(K.error_handler)},onResults:function(e){this.users=e.data.users},resetAdd:function(){this.showUserAdd=!1,this.addUsername="",this.addPassword="",this.addPasswordConfirmation=""},addUser:function(){this.addPasswordsMismatch||F["a"].put("/users",{username:this.addUsername,password:this.addPassword}).then(this.resetAdd).then(this.getUsers).catch(K.error_handler)},deleteUser:function(e){confirm("Really remove ".concat(e,"'s account ? All related data will be removed too."))&&F["a"].delete("/users/"+e).then(this.getUsers).catch(K.error_handler)}},mounted:function(){this.getUsers()}};s("f242");R.render=q,R.__scopeId="data-v-76109be4";t["default"]=R},f242:function(e,t,s){"use strict";s("1b5b")}}]);
//# sourceMappingURL=users.14fd5a22.js.map