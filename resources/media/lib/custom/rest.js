const vscode = acquireVsCodeApi();
const callbacks = {};

/**
 * 调用vscode原生api
 * @param data 可以是类似 {cmd: 'xxx', param1: 'xxx'}，也可以直接是 cmd 字符串
 * @param cb 可选的回调函数
 */
function callVscode(data) {
    if (typeof data === 'string') {
        data = { cmd: data };
    }

    vscode.postMessage(data);
}

let vue = new Vue({
    el: '#app',
    data: {
        restUri: "",
        restBody: {},
        showBodyPanel: false
    },
    mounted() {
        
    },
    watch: {
        
    },
    methods: {
        executeRest() {
            callVscode({
                uri: this.restUri,
                body: this.restBody
            })
        },
        showBodyPanel() {
            let method = $(".radioBtn.active").children().val();
            if (["post", "patch", "put"].includes(method)) {
                this.showBodyPanel = true;
            }
            else {
                this.showBodyPanel = false;
            }
        }
    }
});