import HTMLParser from 'fast-html-parser';
import * as AppSetting from '../config/appSetting'
import * as utility from './parserUtility'
export const parseMatchLinkInfo = (html) => {

    var root = HTMLParser.parse(html);
    var rootItem = root.querySelectorAll("#sopcast .learn-more-content a");
    var result = [];
    for (var i = 0; i < rootItem.length; i++) {
        var link = utility.parseRawAttrs(rootItem[i].rawAttrs, 'title');
        if (link.indexOf("acestream://") > -1) {
            var content = rootItem[i].childNodes[0].rawText;
            let itemLink = {
                ace: link,
                lable: content
            };
            result.push(itemLink)
        }
        if (AppSetting.TopMatchLink === result.length) {
            break;
        }
    }


    return result;
};
export const parseLiveMatchs = (html) => {
    var root = HTMLParser.parse(html);
    var rootItem = root.querySelector('#post .post-text div ul');
    var result = [];

    var length = rootItem.childNodes.length;
    var count = 0;
    var newSection = {
        livedate: "Today And Tomorrow",
        matchs: []
    };
    var days = 0;
    while (count < length) {
        if (days == 2) {
            break;//only get data of today and tomorrow.
        }
        var item = rootItem.childNodes[count];
        if (item.classNames.indexOf('livedate') > -1) {
            days++;
            for (var i = count + 1; i < length; i++) {
                var nextItem = rootItem.childNodes[i];
                if (nextItem.tagName == "li") {
                    var match = _parseMatch(nextItem);
                    if (match) {
                        newSection.matchs.push(match);
                    }
                    count++;
                } else {
                    break;
                }
            }

        }
        count++;

    }
    result.push(newSection);
    return result;
};

const _parseMatch = (matchDomNode) => {
    var root = matchDomNode.querySelector(".match");
    var leagueItem = root.querySelector(".leaguelogo a");
    var timeItem = root.querySelector(".matchtime b").childNodes[0].rawText;
    var homeItem = root.querySelector(".homelogo a");
    var awayItem = root.querySelector(".awaylogo a");
    var liveLinkItem = root.querySelector(".livelink a");

    if (leagueItem == null || homeItem == null) {
        return null;
    }
    var result = {
        league: utility.parseRawAttrs(leagueItem.rawAttrs, 'title'),
        home: utility.parseRawAttrs(homeItem.rawAttrs, 'title'),
        away: awayItem ? utility.parseRawAttrs(awayItem.rawAttrs, 'title') : '',
        url: liveLinkItem ? utility.parseRawAttrs(liveLinkItem.rawAttrs, 'href') : '',
        time: timeItem
    };

    return result;
}

