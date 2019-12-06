const vscode = acquireVsCodeApi();

/**
 * Send message to vscode context
 * 
 * @param {object} data 
 */
function callVscode(data) {
    vscode.postMessage(data);
}

// Handle messages sent from the extension to the webview
window.addEventListener('message', event => {
    const message = event.data;
    switch (message.cmd) {
        case 'vscodeCallback':
            let queryResult = JSON.parse(JSON.stringify(message.data));
            buildTable(queryResult.records);
        default: break;
    }
});

var records = [];
function buildTable(records) {
    schema = [];
    if (records && records.length > 0) {
        for (const key in records[0]) {
            if (records[0].hasOwnProperty(key)) {
                schema.push({
                    "header": key, 
                    "key": key,
                    "hide": key === "attributes",
                    "template": function(row, key) {
                        value = row[key];
                        id = parseId(row.attributes.url);
        
                        // Null value
                        if (_.isNull(value)) {
                            return "";
                        }
                        // Child to Parent
                        else if (_.isObject(value) && !value.records) {
                            return ('<a style="cursor: pointer;" id="{0}" type="{1}" ' + 
                                    'onclick="showRow(this);">{1}</a>').format(
                                id, key
                            );
                        }
                        // Parent to Children
                        else if (_.isObject(value) && value.records) {
                            return ('<a style="cursor: pointer;" id="{0}" type="{1}" ' + 
                                    'onclick="showRow(this);">{1}({2})</a>').format(
                                id, key, value.records.length
                            );
                        }
                        // Other
                        else {
                            return value;
                        }
                    }
                });
            }
        }
    }

    // Before draw table, destroy it firstly
    $('#queryResult').data('columns', null);

    // Draw table
    $('#queryResult').columns({
        size: 10,
        data: records,
        schema: schema
    });
}

function showRow(ele) {
    record_id = $(ele).attr("id");
    _type = $(ele).attr("type");
    records.forEach(function(record) {
        if (record.attributes.url.indexOf(record_id) > 0) {
            show_area = "";

            // For example, record["Owner"] or record["Opportunities"]
            obj = record[_type];

            // Parent to Child
            if (obj.records) {
                obj_records = obj.records;
                var show_area = '<table class="table table-striped">';
                show_area += '<tr>';
                for (var k in obj_records[0]) {
                    if (k == "attributes") continue;
                    show_area += "<th>" + k + "</th>";
                }
                show_area += '</tr>';

                $.each(obj_records, function(index, value) {
                    show_area += "<tr>";
                    $.each(value, function (key, val) {
                        if (key != "attributes") {
                            show_area += "<td>" + val + "</td>";
                        }
                    });
                    show_area += "</tr>";
                });

                show_area += "</table>";
            }
            // Child to Parent
            else {
                Object.keys(obj).forEach(function(key) {
                    if (!_.isObject(obj[key])) {
                        show_area += (
                            '<div class="form-group">' +
                                '<label class="col-sm-2 control-label">{0}:</label>' + 
                                '<div class="col-sm-10">' + 
                                    '<p class="form-control-static">{1}</p>' + 
                                '</div>' + 
                            '</div>'
                        ).format(key, obj[key] ? obj[key] : "");
                    }
                });
            }

            $("#showDetail-body").html(show_area);
            $("#showDetail-dialog").modal("show");
        }
    });
}

let app = new Vue({
    el: '#app',
    data: {
        soql: "SELECT Id, Name FROM Account LIMIT 100"
    },
    computed: {
        
    },
    methods: {
        executeQuery(isTooling) {
            console.log(isTooling);
            
            callVscode({
                soql: this.soql, 
                isTooling: isTooling,
                isExport: false
            });
        },
        exportToCSV(isTooling) {
            console.log(isTooling);
            callVscode({
                soql: this.soql, 
                isTooling: isTooling,
                isExport: true
            })
        }
    }
});
