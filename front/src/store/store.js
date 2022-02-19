import { createStore } from 'vuex'

export default createStore({
  state: {
    user : null,
    posts : null,
    comments : null
  },
  getters: {
    user: (state) => {
      return state.user;
    },
    posts: (state) => {
      return state.posts
    },
    comments: (state) => {
      return state.comments
    },
  },
  mutations: {
    USER(state, user) {
      state.user = user;
    },
    POSTS(state, posts) {
      state.posts = posts;
    },
    COMMENTS(state, comments) {
      state.comments = comments;
    }
  },
  actions: {
    user(context, user) {
      context.commit('USER', user);
    },
    posts(context, posts) {
      context.commit('POSTS', posts);
    },
    comments(context, comments) {
      context.commit('COMMENTS', comments);
    }
  },
  modules: {
  }
});
