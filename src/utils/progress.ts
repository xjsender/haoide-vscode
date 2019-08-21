import * as vscode from "vscode";

export default class ProgressNotification {
    /**
     * Start vscode progress notfication
     * 
     * @param self the context of invoker
     * @param methodName the method name in the metadata Api
     * @param options any
     */
    public static showProgress(self: any, methodName: string, options: any) {
        return vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: "Running Task: ",
            cancellable: true
        }, (progress, token) => {
            token.onCancellationRequested(() => {
                console.log("You canceled the long polling operation");
            });

            // Notify for init action
            progress.report({ message: methodName });

            return self[methodName](options, progress);
        }) as Promise<any>;
    }
    
    /**
     * Notify user with the api request progress
     * 
     * @param progress vscode progress instance
     * @param message message to report
     * @param increment progress rate, from 0 - 100
     */
    public static notify(progress: any, message: string, increment?: number) {
        if (progress) {
            progress.report({
                message: message,
                increment: increment
            });
        }
    }
}