import Vue from 'vue';
import Vuex from 'vuex';
import items from './items.module';
import user from './user.module';
import shelves from './shelves.module';
import tags from './tags.module';
import checkouts from './checkouts.module';
import containers from './containers.module';
import types from './types.module';
import general from './general.module';
import fields from './fields.module';
import conversations from './conversations.module';
import messages from './messages.module';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    items,
    user,
    shelves,
    tags,
    checkouts,
    containers,
    types,
    general,
    fields,
    conversations,
    messages
  }
})
