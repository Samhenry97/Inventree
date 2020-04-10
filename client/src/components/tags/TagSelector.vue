<template>
  <v-combobox
      v-model="editValue"
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
    <template v-slot:selection="{ item, disabled, attrs }">
      <v-chip
          :key="item"
          :disabled="disabled"
          v-bind="attrs"
      >
        {{ tagById('book', item).name }}
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
        {{ tagById('book', item).name }}
      </v-chip>
      <v-spacer></v-spacer>
      <div v-if="item === editTag">
        <v-list-item-action @click.stop>
          <v-btn
              icon
              :disabled="!editTagName.trim() || tagFindOne('book', { name: editTagName })"
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
  import { mapState, mapGetters } from 'vuex';

  export default {
    name: 'TagSelector',
    props: {
      value: Array,
      type: String
    },
    data: () => ({
      tagSearch: '',
      tagsDisabled: false,
      editTag: null,
      editTagName: null,
      editValue: []
    }),
    computed: {
      ...mapState({
        allTags: state => state.tags
      }),
      ...mapGetters(['tagFindOne', 'tagById']),
      tags() {
        return this.allTags[this.type].map(tag => tag._id);
      }
    },
    watch: {
      value(val) {
        this.editValue = val;
      },
      editValue(val, prev) {
        if (val.length > 0 && val.length > prev.length) {
          const newTag = val.filter(tag => !prev.includes(tag))[0];
          const nameTag = this.tagFindOne('book', { name: newTag });
          if (nameTag) {
            this.editValue = this.editValue.filter(tag => tag !== newTag);
            if (this.editValue.includes(nameTag._id)) return;
            this.editValue.push(nameTag._id);
            this.$emit('change', this.editValue);
          } else if (!this.tagById('book', newTag)) {
            this.tagsDisabled = true;
            this.editValue = this.editValue.filter(tag => tag !== newTag);
            this.$socket.emit('createTag', { name: newTag, type: 'book' }, result => {
              this.editValue.push(result._id);
              this.tagsDisabled = false;
              this.$emit('change', this.editValue);
            })
          } else {
            this.$emit('change', this.editValue);
          }
        } else {
          this.$emit('change', this.editValue);
        }
      },
      tags(val, prev) {
        if (val.length < prev.length) {
          this.editValue = this.editValue.filter(tag => val.includes(tag));
          this.$emit('change', this.editValue);
        }
      }
    },
    methods: {
      deleteTag(tag) {
        if (confirm('Are you sure you want to delete this tag?')) {
          this.$socket.emit('deleteTag', this.tagById('book', tag));
        }
      },
      updateTag() {
        const update = { ...this.tagById('book', this.editTag), name: this.editTagName };
        this.$socket.emit('updateTag', update);
        this.editTag = {};
      },
      startEditing(tag) {
        this.editTag = tag;
        this.editTagName = this.tagById('book', tag).name;
      },
      filterTags(item, query) {
        const name = this.tagById('book', item).name;
        return name.toLowerCase().includes(query);
      }
    }
  };
</script>

<style scoped>

</style>
