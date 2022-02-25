import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate"

export default createStore({
  state: {
    user : null,
    posts : null,
    comments : null,
    idProfil : null
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
    idProfil: (state) => {
      return state.idProfil
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
    },
    IDPROFIL(state, idProfil) {
      state.idProfil = idProfil;
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
    },
    idProfil(context, idProfil) {
      context.commit('IDPROFIL', idProfil);
    }
  },
  modules: {
  },
  plugins: [createPersistedState()]
});
