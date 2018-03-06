import createReducer from '../lib/createReducer.js'
import * as types from '../actions/types.js'
export const liveMatchs = createReducer({}, {
  [types.SET_LIVE_MATCHS](state, action) {
    return action.data;
  }
});

export const selectedMatch = createReducer({}, {
  [types.SET_MATCH_LINK](state, action) {
    return action.data;
  }
});


export const matchLinkInfo = createReducer({}, {
  [types.SET_MATCH_LINK_INFO](state, action) {
    return action.data;
  }
});

export const matchIndex = createReducer({}, {
  [types.SET_MATCH_INDEX](state, action) {
    return action.data;
  }
});

export const matchLinkIndex = createReducer({}, {
  [types.SET_MATCH_LINK_INDEX](state, action) {
    return action.data;
  }
});