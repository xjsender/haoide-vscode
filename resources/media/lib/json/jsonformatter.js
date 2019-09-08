window.SINGLE_TAB = "  ";
window.ImgCollapsed = "./img/Collapsed.gif";
window.ImgExpanded = "./img/Expanded.gif";
window.quoteKeys = true;

function $id(id) {
    return document.getElementById(id);
}

function isTypeofArray(obj) {
    return obj &&
        typeof obj === 'object' &&
        typeof obj.length === 'number' &&
        !(obj.propertyIsEnumerable('length'));
}

function process() {
    setTab();
    window.IsCollapsible = true;
    var json = $id("RawJson").value;
    if (!json) return;
    var html = "";

    try {
        if (json == "") json = "\"\"";
        var obj = eval("[" + json + "]");
        html = processObject(obj[0], 0, false, false, false);
        $id("Canvas").innerHTML = "<PRE class='CodeContainer'>" + html + "</PRE>";
    } catch (e) {
        alert("JSON is not valid: " + e.message);
        $id("Canvas").innerHTML = "";
    }
}
window._dateObj = new Date();
window._regexpObj = new RegExp();

function processObject(obj, indent, addComma, isArray, isPropertyContent) {
    var html = "";
    var comma = (addComma) ? "<span class='Comma'>,</span> " : "";
    var type = typeof obj;
    var clpsHtml = "";

    if (isTypeofArray(obj)) {
        if (obj.length == 0) {
            html += getRow(indent, "<span class='ArrayBrace'>[ ]</span>" + comma, isPropertyContent);
        } else {
            clpsHtml = window.IsCollapsible ? "<span><img src=\"" + window.ImgExpanded + 
                "\" onClick=\"expImgClicked(this)\" /></span><span class='collapsible'>" : "";
            html += getRow(indent, "<span class='ArrayBrace'>[</span>" + clpsHtml, isPropertyContent);
            for (var i = 0; i < obj.length; i++) {
                html += processObject(obj[i], indent + 1, i < (obj.length - 1), true, false);
            }
            clpsHtml = window.IsCollapsible ? "</span>" : "";
            html += getRow(indent, clpsHtml + "<span class='ArrayBrace'>]</span>" + comma);
        }
    } else if (type == 'object') {
        if (obj == null) {
            html += formatLiteral("null", "", comma, indent, isArray, "Null");
        } else if (obj.constructor == window._dateObj.constructor) {
            html += formatLiteral("new Date(" + obj.getTime() + ") /*" + 
                obj.toLocaleString() + "*/", "", comma, indent, isArray, "Date");
        } else if (obj.constructor == window._regexpObj.constructor) {
            html += formatLiteral("new RegExp(" + obj + ")", "", comma, indent, isArray, "RegExp");
        } else {
            var numProps = 0;
            for (var prop in obj) numProps++;
            if (numProps == 0) {
                html += getRow(indent, "<span class='ObjectBrace'>{ }</span>" + comma, isPropertyContent);
            } else {
                clpsHtml = window.IsCollapsible ? "<span><img src=\"" + window.ImgExpanded + 
                    "\" onClick=\"expImgClicked(this)\" /></span><span class='collapsible'>" : "";
                html += getRow(indent, "<span class='ObjectBrace'>{</span>" + clpsHtml, isPropertyContent);

                var j = 0;

                for (var prop in obj) {
                    var quote = window.quoteKeys ? "\"" : "";

                    html += getRow(indent + 1, "<span class='PropertyName'>" + quote + prop + quote + 
                        "</span>: " + processObject(obj[prop], indent + 1, ++j < numProps, false, true));
                }

                clpsHtml = window.IsCollapsible ? "</span>" : "";

                html += getRow(indent, clpsHtml + "<span class='ObjectBrace'>}</span>" + comma);

            }

        }

    } else if (type == 'number') {
        html += formatLiteral(obj, "", comma, indent, isArray, "Number");
    } else if (type == 'boolean') {
        html += formatLiteral(obj, "", comma, indent, isArray, "Boolean");
    } else if (type == 'function') {
        if (obj.constructor == window._regexpObj.constructor) {
            html += formatLiteral("new RegExp(" + obj + ")", "", comma, indent, isArray, "RegExp");
        } else {
            obj = formatFunction(indent, obj);
            html += formatLiteral(obj, "", comma, indent, isArray, "Function");
        }
    } else if (type == 'undefined') {
        html += formatLiteral("undefined", "", comma, indent, isArray, "Null");
    } else {
        html += formatLiteral(obj.toString().split("\\").join("\\\\").split('"').join('\\"'), 
            "\"", comma, indent, isArray, "String");
    }

    return html;
}

function formatLiteral(literal, quote, comma, indent, isArray, style) {
    if (typeof literal == 'string') {
        literal = literal.split("<").join("&lt;").split(">").join("&gt;");
    }

    var str = "<span class='" + style + "'>" + quote + literal + quote + comma + "</span>";

    if (isArray) str = getRow(indent, str);

    return str;

}

function formatFunction(indent, obj) {
    var tabs = "";
    for (var i = 0; i < indent; i++) {
        tabs += window.TAB;
    }
    var funcStrArray = obj.toString().split("\n");

    var str = "";
    for (var i = 0; i < funcStrArray.length; i++) {
        str += ((i == 0) ? "" : tabs) + funcStrArray[i] + "\n";
    }

    return str;
}

function getRow(indent, data, isPropertyContent) {
    var tabs = "";
    for (var i = 0; i < indent && !isPropertyContent; i++) {
        tabs += window.TAB;
    }

    if (data != null && data.length > 0 && data.charAt(data.length - 1) != "\n") {
        data = data + "\n";
    }

    return tabs + data;
}

function quoteKeysClicked() {
    window.quoteKeys = $id("quoteKeys").checked;
    process();
}

function collapseAllClicked() {
    ensureIsPopulated();
    traverseChildren($id("Canvas"), function(element) {
        if (element.className == 'collapsible') {
            makeContentVisible(element, false);
        }
    }, 0);
}

function expandAllClicked() {
    ensureIsPopulated();
    traverseChildren($id("Canvas"), function(element) {
        if (element.className == 'collapsible') {
            makeContentVisible(element, true);
        }
    }, 0);
}

function makeContentVisible(element, visible) {
    var img = element.previousSibling.firstChild;
    if (!!img.tagName && img.tagName.toLowerCase() == "img") {
        element.style.display = visible ? 'inline' : 'none';
        element.previousSibling.firstChild.src = visible ? window.ImgExpanded : window.ImgCollapsed;
    }
}

function traverseChildren(element, func, depth) {
    for (var i = 0; i < element.childNodes.length; i++) {
        traverseChildren(element.childNodes[i], func, depth + 1);
    }

    func(element, depth);
}

function expImgClicked(img) {
    var container = img.parentNode.nextSibling;
    if (!container) return;
    var disp = "none";
    var src = window.ImgCollapsed;

    if (container.style.display == "none") {
        disp = "inline";
        src = window.ImgExpanded;
    }

    container.style.display = disp;
    img.src = src;
}

function collapseLevel(level) {
    ensureIsPopulated();
    traverseChildren($id("Canvas"), function(element, depth) {
        if (element.className == 'collapsible') {
            if (depth >= level) {
                makeContentVisible(element, false);
            } else {
                makeContentVisible(element, true);
            }
        }
    }, 0);
}

function tabSizeChanged() {
    process();
}

function setTab() {
    var select = $id("TabSize");
    window.TAB = multiplyString(parseInt(select.options[select.selectedIndex].value), window.SINGLE_TAB);
}

function ensureIsPopulated() {
    if (!$id("Canvas").innerHTML && !!$id("RawJson").value) process();
}

function multiplyString(num, str) {
    var sb = [];
    for (var i = 0; i < num; i++) {
        sb.push(str);
    }
    return sb.join("");
}

function selectAllClicked() {
    if (!!document.selection && !!document.selection.empty) {
        document.selection.empty();
    } 
    else if (window.getSelection) {
        var sel = window.getSelection();
        if (sel.removeAllRanges) {
            window.getSelection().removeAllRanges();
        }
    }

    var range = (!!document.body && !!document.body.createTextRange)
        ? document.body.createTextRange()
        : document.createRange();

    if (!!range.selectNode) {
        range.selectNode($id("Canvas"));
    }
    else if (range.moveToElementText) {
        range.moveToElementText($id("Canvas"));
    }

    if (!!range.select) {
        range.select($id("Canvas"));
    }
    else {
        window.getSelection().addRange(range);
    }
}

function linkToJson() {
    var val = $id("RawJson").value;
    val = escape(val.split('/n').join(' ').split('/r').join(' '));
    $id("InvisibleLinkUrl").value = val;
    $id("InvisibleLink").submit();
}
