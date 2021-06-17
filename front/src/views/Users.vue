<template>
  <div id="playout_history" class="content">
    <h1 class="title">Users</h1>
    <p>
      From here you can edit usernames and passwords that will be allowed to
      stream, if <code>harbor</code> authentication
      <a
        href="https://showergel.readthedocs.io/en/latest/liquidsoap.html#authenticating-users-on-harbor"
        target="_blank"
      >
        is set up </a
      >.
    </p>
    <Button type="primary" rounded @click="showUserAdd = true"> Add </Button>

    <Modal
      title="Create user account"
      :visible="showUserAdd"
      @close="resetAdd()"
    >
      <template v-slot:default>
        <form @submit.prevent="addUser()" class="box" id="addUser">
          <p>Avoid special characters (even spaces) in usernames.</p>

          <Input v-model="addUsername" id="username" label="Username" />
          <Input
            v-model="addPassword"
            type="password"
            id="password"
            label="Pass phrase"
          />
          <Input
            v-model="addPasswordConfirmation"
            type="password"
            id="password_confirmation"
            label="Confirm pass phrase"
            :error="addPasswordsMismatch ? 'Pass phrases don\'t match' : null"
          />
        </form>
      </template>
      <template v-slot:footer>
        <Button type="primary" submit form="addUser">Create account</Button>
        <div class="ml-4">
          <Button type="secondary" @click="resetAdd()">Cancel</Button>
        </div>
      </template>
    </Modal>
    <Table
      :columns="[
        { key: 'username', label: 'Username' },
        { key: 'created', label: 'Created' },
        { key: 'modified', label: 'Modified' },
        { key: 'actions', label: 'Actions' },
      ]"
      :rows="mappedUsers"
    >
      <template v-slot:actions="slotProps">
        <Button type="danger" iconOnly @click="deleteUser(slotProps.username)">
          <i class="mdi mdi-account-off"></i>
        </Button>
      </template>
    </Table>
  </div>
</template>

<script>
import http from "@/http";
import notifications from "@/notifications";
import Table from "../components/Table.vue";
import Button from "../components/Button";
import Input from "../components/Input.vue";
import Modal from "../components/Modal.vue";

export default {
  components: {
    Button,
    Input,
    Modal,
    Table,
  },
  data() {
    return {
      addUsername: "",
      addPassword: "",
      addPasswordConfirmation: "",
      showUserAdd: false,
      users: [],
    };
  },

  computed: {
    addPasswordsMismatch() {
      return this.addPassword != this.addPasswordConfirmation;
    },
    mappedUsers() {
      return this.users.map((u) => ({
        username: u.username,
        created: new Date(u.created_at).toLocaleString(),
        modified: new Date(u.modified_at).toLocaleString(),
      }));
    },
  },

  methods: {
    getUsers() {
      http
        .get("/users")
        .then(this.onResults)
        .catch(notifications.error_handler);
    },
    onResults(response) {
      this.users = response.data.users;
    },
    resetAdd() {
      this.showUserAdd = false;
      this.addUsername = "";
      this.addPassword = "";
      this.addPasswordConfirmation = "";
    },
    addUser() {
      if (!this.addPasswordsMismatch) {
        http
          .put("/users", {
            username: this.addUsername,
            password: this.addPassword,
          })
          .then(this.resetAdd)
          .then(this.getUsers)
          .catch(notifications.error_handler);
      }
    },
    changePassword(username) {
      let pass = prompt(`Please enter a new pass phrase for ${username}`);
      if (pass) {
        let confirm = prompt(`Please confirm ${username}'s new pass phrase`);
        if (confirm) {
          if (confirm == pass) {
            http
              .post(`/users/${username}`, {
                password: pass,
              })
              .then(notifications.success_handler("Pass phrase updated"))
              .catch(notifications.error_handler);
          } else {
            notifications.error("Pass phrases don't match !");
          }
        }
      }
    },
    deleteUser(username) {
      if (
        confirm(
          `Really remove ${username}'s account ? All related data will be removed too.`
        )
      ) {
        http
          .delete("/users/" + username)
          .then(this.getUsers)
          .catch(notifications.error_handler);
      }
    },
  },
  mounted() {
    this.getUsers();
  },
};
</script>

<style scoped>
#showUserAdd {
  cursor: pointer;
}
</style>
