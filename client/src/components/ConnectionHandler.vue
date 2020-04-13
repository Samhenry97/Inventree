<template>
  <div v-if="!connected" id="connection-handler">
    <div v-if="!reconnect_failed">
      <p class="display-2">Lost Connection</p>
      <p class="display-1">Reconnecting...</p>
    </div>
    <div v-else>
      <p class="display-2">Connection Error</p>
      <a class="display-1" @click="refresh">Refresh Page</a>
    </div>
  </div>
</template>

<script>
  import { A_LOGIN } from '../store/actions.type';

  export default {
    name: 'ConnectionHandler',
    data: () => ({
      connected: true,
      reconnect_attempt: 0,
      reconnect_failed: false,
      reconnect_success: false
    }),
    sockets: {
      connect() {
        this.connected = true;
      },
      disconnect() {
        this.connected = false;
      },
      reconnect_attempt(attempt) {
        this.reconnect_attempt = attempt;
        this.connected = false;
      },
      reconnect_failed() {
        this.reconnect_failed = true;
        this.connected = false;
      },
      reconnect() {
        this.connected = true;
        if (this.$auth.user) {
          this.$store.dispatch(A_LOGIN, this.$auth.user);
        }
      }
    },
    methods: {
      refresh() {
        location.reload();
      }
    }
  };
</script>

<style scoped>
#connection-handler {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000000;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
}

a {
  text-decoration: underline;
}
</style>
