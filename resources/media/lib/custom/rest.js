const vscode = acquireVsCodeApi();

/**
 * Send message to vscode context
 * 
 * @param {object} data 
 */
function callVscode(data) {
    vscode.postMessage(data);
}

let app = new Vue({
    el: '#app',
    data: {
        restUri: "/sobjects/",
        restMethod: "get",
        restBody: ""
    },
    computed: {
        isBodyVisible: function() {
            return ["post", "put", "patch"].includes(
                this.restMethod
            )
        }
    },
    methods: {
        executeRest() {
            callVscode({
                serverUrl: this.restUri,
                method: this.restMethod,
                data: this.restBody
            })
        },
        formatBody() {
            try {
                this.restBody = JSON.stringify(JSON.parse(this.restBody), null, 4);
            }
            catch (err) {
                
            }
        }
    }
});