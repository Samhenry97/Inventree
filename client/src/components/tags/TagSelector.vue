<template>
  <v-combobox
      v-model="item.tags"
      :items="tags"
      :search-input.sync="tagSearch"
      :disabled="tagsDisabled"
      :loading="tagsDisabled"
      :filter="filterTags"
      label="Tags"
      multiple
  >
    <template v-slot:no-data>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            No results matching "<strong>{{ tagSearch }}</strong>". Press <kbd>enter</kbd> to create a new tag.
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>
    <template v-slot:selection="data">
      <v-chip
          :key="data.item"
          :disabled="data.disabled"
          v-bind="data.attrs"
      >
        {{ tag(data.item).name }}
      </v-chip>
    </template>
    <template v-slot:item="{ item }">
      <v-text-field
        v-if="item === editTag"
        v-model="editTagName"
        autofocus
        flat
        solo
        hide-details
        @keyup.enter="updateTag"
        @keydown.enter.stop.prevent
        @click.stop
      ></v-text-field>
      <v-chip
          v-else
          :key="item"
      >
        {{ tag(item).name }}
      </v-chip>
      <v-spacer></v-spacer>
      <div v-if="item === editTag">
        <v-list-item-action @click.stop>
          <v-btn
              icon
              :disabled="!editTagName.trim() || Tag.exists({ name: editTagName, type: 'book' })"
              @click.stop.prevent="updateTag()"
          >
            <v-icon color="success">mdi-check</v-icon>
          </v-btn>
        </v-list-item-action>
        <v-list-item-action @click.stop>
          <v-btn icon @click.stop.prevent="editTag = null">
            <v-icon color="error">mdi-cancel</v-icon>
          </v-btn>
        </v-list-item-action>
      </div>
      <div v-else>
        <v-list-item-action @click.stop>
          <v-btn icon @click.stop.prevent="startEditing(item)">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </v-list-item-action>
        <v-list-item-action @click.stop>
          <v-btn icon @click.stop.prevent="deleteTag(item)">
            <v-icon color="error">mdi-delete</v-icon>
          </v-btn>
        </v-list-item-action>
      </div>
    </template>
  </v-combobox>
</template>

<script>
  import { mapState } from 'vuex';
  import Tag from '../../models/tag';

  export default {
    name: 'TagSelector',
    props: {
      item: Object,
      type: String
    },
    data: () => ({
      tagSearch: '',
      tagsDisabled: false,
      editTag: null,
      editTagName: null,
      Tag
    }),
    computed: {
      ...mapState({
        allTags: state => state.tags
      }),
      tags() {
        return this.allTags[this.type].map(tag => tag._id);
      }
    },
    watch: {
      'item.tags' (val, prev) {
        if (val.length > 0 && val.length > prev.length) {
          const newTag = val.filter(tag => !prev.includes(tag))[0];
          if (!Tag.getById('book', newTag)) {
            this.tagsDisabled = true;
            this.item.tags = this.item.tags.filter(tag => tag !== newTag);
            this.$socket.emit('createTag', { name: newTag, type: 'book' }, result => {
              this.item.tags.push(result._id);
              this.tagsDisabled = false;
            })
          }
        }
      },
      tags(val, prev) {
        if (val.length < prev.length) {
          this.item.tags = this.item.tags.filter(tag => val.includes(tag));
        }
      }
    },
    methods: {
      deleteTag(tag) {
        if (confirm('Are you sure you want to delete this tag?')) {
          this.$socket.emit('deleteTag', this.tag(tag));
        }
      },
      updateTag() {
        const update = { ...this.tag(this.editTag), name: this.editTagName };
        this.$socket.emit('updateTag', update);
        this.editTag = {};
      },
      startEditing(tag) {
        this.editTag = tag;
        this.editTagName = this.tag(tag).name;
      },
      filterTags(item, query) {
        const name = this.tag(item).name;
        return name.toLowerCase().includes(query);
      },
      tag(id) {
        return Tag.getById('book', id) || {};
      }
    }
  };
</script>

<style scoped>

</style>
