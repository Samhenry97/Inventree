<template>
  <div id="conversation" class="pa-4 fill-height d-flex flex-column">
    <template v-if="add">
      <Header>New Message</Header>

      <span>
        <UserSearch v-model="users"></UserSearch>
      </span>

      <v-spacer></v-spacer>

      <span>
        <v-text-field
            v-model="message.content"
            append-outer-icon="mdi-send"
            hide-details
            @keypress.enter="sendMessage"
            @click:append-outer="sendMessage"
        ></v-text-field>
      </span>
    </template>
    <template v-else>
      <Header>{{ conversationName(conversation) }}</Header>

      <div class="flex-grow-1 d-flex flex-column justify-end">
        <Message v-for="message of messages" :key="message._id" :message="message"></Message>
      </div>

      <span>
        <v-text-field
            v-model="message.content"
            append-outer-icon="mdi-send"
            hide-details
            @keypress.enter="sendMessage"
            @click:append-outer="sendMessage"
        ></v-text-field>
      </span>
    </template>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { defaultModel as conversationDefaultModel } from '../../store/conversations.module';
  import { defaultModel as messageDefaultModel } from '../../store/messages.module';
  import UserSearch from '../../components/UserSearch';
  import Header from '../../components/Header';
  import { A_CREATE_CONVERSATION, A_CREATE_MESSAGE } from '../../store/actions.type';
  import Message from '../../components/messages/Message';

  export default {
    name: 'Conversation',
    components: { Message, Header, UserSearch },
    data: () => ({
      conversation: conversationDefaultModel(),
      message: messageDefaultModel(),
      users: []
    }),
    computed: {
      ...mapGetters(['conversationById', 'user', 'messagesByConversation', 'conversationName']),
      add() {
        return !this.conversation._id;
      },
      messages() {
        return this.add ? [] : this.messagesByConversation(this.conversation._id);
      }
    },
    mounted() {
      this.init(this.$route.params.conversation);
    },
    beforeRouteUpdate(to, from, next) {
      this.init(to.params.conversation);
      next();
    },
    methods: {
      init(id) {
        this.message = messageDefaultModel();
        if (id) {
          this.conversation = this.conversationById(id);
        } else {
          this.conversation = conversationDefaultModel();
        }
      },
      async sendMessage() {
        if (this.add) {
          this.users.push(this.user);
          this.conversation.users = this.users
              .map(user => user._id);

          const created = await this.$store.dispatch(A_CREATE_CONVERSATION, this.conversation);
          await this.$store.dispatch(A_CREATE_MESSAGE, { ...this.message, conversation: created._id });
          await this.$router.push({ name: 'conversation', params: { conversation: created._id } });
        } else {
          await this.$store.dispatch(A_CREATE_MESSAGE, { ...this.message, conversation: this.conversation._id });
        }

        this.message = messageDefaultModel();
      }
    }
  };
</script>

<style scoped>

</style>
