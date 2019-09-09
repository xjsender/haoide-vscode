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
        restUri: "",
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
        }
    }
});