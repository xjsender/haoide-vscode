String.prototype.format = function() {
    var args = arguments;

    return this.replace(/{(\d+)}/g, function(match, number) {
        return typeof args[number] != 'undefined' ? args[number] :
            '{' + number + '}';
    });
};

var parseId = function(url) {
    lastIndexOfSlash = url.lastIndexOf("/");
    return url.substr(lastIndexOfSlash + 1, url.length);
}

/**
 * Get parameter from location search
 * @param   {string}  key  Parameter name
 * @return  {string}       Parameter value
 */
function getURLParameter(key){
    var search = location.search;

    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
    var r = search.substr(search.indexOf("\?") + 1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
