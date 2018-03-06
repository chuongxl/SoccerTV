import * as types from './types.js'
import * as httpClient from '../lib/httpClient'
import * as parserService from '../lib/liveMatchParser'
export const getLiveMatchs = (urlProvider) => {
    return (dispatch) => {
        httpClient.downloadHTMLAsync(urlProvider).then(x => {
            const data = parserService.parseLiveMatchs(x);
            dispatch(setLiveMatchs(data));
        });
    }
}

const setLiveMatchs = (newData) => {
    return {
        type: types.SET_LIVE_MATCHS,
        data: newData,
    }
};

export const setMatchLink = (url) => {
    return {
        type: types.SET_MATCH_LINK,
        data: url,
    }
};

export const getMatchLinkInfo = (url) => {
    return (dispatch) => {
        httpClient.downloadHTMLAsync(url).then(x => {
            const data = parserService.parseMatchLinkInfo(x);
            dispatch(setMatchLinkInfo(data));
        });
    }
}

const setMatchLinkInfo = (newData) => {
    return {
        type: types.SET_MATCH_LINK_INFO,
        data: newData,
    }
};

export const setMatchIndex = (index) => {
    return {
        type: types.SET_MATCH_INDEX,
        data: index,
    }
}
export const setMatchLinkIndex = (index) => {
    return {
        type: types.SET_MATCH_LINK_INDEX,
        data: index,
    }
}
