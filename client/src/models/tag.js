import store from '../store';

export default class Tag {
  static exists(tag) {
    for (const otherTag of store.state.tags[tag.type]) {
      if (otherTag.name.toLowerCase() === tag.name.toLowerCase()) return true;
    }
    return false;
  }

  static getById(type, id) {
    for (const tag of store.state.tags[type]) {
      if (tag._id === id) {
        return tag;
      }
    }
    return null;
  }

  static getByName(type, name) {
    for (const tag of store.state.tags[type]) {
      if (tag.name.toLowerCase() === name.toLowerCase()) {
        return tag;
      }
    }
    return null;
  }
}
