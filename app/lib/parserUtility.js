export const parseRawAttrs = (attributes, tagName) => {
    var key = tagName + '="';
    var index = attributes.indexOf(key);

    if (index < 0) {
        key = tagName += "='";
        index = attributes.indexOf(key);
    }

    var result = [];
    var i = index + key.length;
    while (i <= attributes.length) {
        var charactor = attributes.charAt(i);
        if (charactor == '"' || charactor == "'") {
            break;
        }
        result.push(charactor);
        i++;
    }
    return result.join('');
}