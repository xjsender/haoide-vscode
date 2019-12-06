import * as vscode from "vscode";
import * as nls from 'vscode-nls';
const localize = nls.loadMessageBundle();

export default class ProgressNotification {
    /**
     * Start vscode progress notfication
     * 
     * @param self the context of invoker
     * @param methodName the method name of the invoker
     * @param options options for sepcified request
     * @param options.progressMessage progress message of request
     * @param options.timeout request timeout miliseconds, default is 120000
     */
    public static showProgress(self: any, methodName: string, options: any) {
        return vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: "Running Task: ",
            cancellable: true
        }, (progress, token) => {
            token.onCancellationRequested(() => {
                vscode.window.showWarningMessage(
                    localize('cancelRequest.text',
                        'Your request was cancelled'
                    )
                );
            });

            progress.report({ message: methodName });

            // Bind options with progress
            options.progress = progress;

            return self[methodName](options);
        }) as Promise<any>;
    }
    
    /**
     * Notify user with the api request progress
     * 
     * @param progress vscode progress instance
     * @param message message to report
     * @param increment progress rate, from 0 - 100
     */
    public static notify(progress: vscode.Progress<any>, message: string, increment?: number) {
        if (progress) {
            progress.report({
                message: message,
                increment: increment
            });
        }
    }
}
