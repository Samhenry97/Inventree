<template>
  <fragment>
    <SideBar>
      <v-list v-if="loading">
        <v-skeleton-loader type="list-item-avatar-two-line@4"></v-skeleton-loader>
      </v-list>
      <v-list v-else dense nav>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Conversations ({{ conversations.length }})</v-list-item-title>
          </v-list-item-content>

          <v-list-item-action>
            <router-link :to="{ name: 'conversations' }">
              <v-btn icon>
                <v-icon>mdi-message-plus</v-icon>
              </v-btn>
            </router-link>
          </v-list-item-action>
        </v-list-item>

        <v-list-item
            v-for="conversation of conversations"
            :key="conversation._id"
            :to="{ name: 'conversation', params: { conversation: conversation._id } }"
            link
            color="secondary"
        >
          <v-list-item-avatar>
            <v-img :src="conversationUser(conversation).picture"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ conversationName(conversation) }}</v-list-item-title>
            <v-list-item-subtitle>{{ messagesByConversation(conversation._id)[0].content }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </SideBar>

    <v-content v-if="!loading">
      <template v-if="$route.name === 'conversations'">
        <Conversation key="newConversation"></Conversation>
      </template>

      <router-view v-else></router-view>
    </v-content>
  </fragment>
</template>

<script>
  import { mapGetters } from 'vuex';
  import SideBar from '../../components/SideBar';
  import { A_FETCH_CONVERSATIONS } from '../../store/actions.type';
  import Conversation from './Conversation';

  export default {
    name: 'ConversationsDashboard',
    components: { Conversation, SideBar },
    computed: {
      ...mapGetters(['conversations', 'user', 'messagesByConversation', 'conversationName'])
    },
    data: () => ({
      loading: true
    }),
    mounted() {
      this.$store.dispatch(A_FETCH_CONVERSATIONS)
          .then(() => this.loading = false);
    },
    methods: {
      conversationUser(conversation) {
        for (const user of conversation.users) {
          if (user._id !== this.user._id) {
            return user;
          }
        }
      }
    }
  };
</script>

<style scoped>

</style>
