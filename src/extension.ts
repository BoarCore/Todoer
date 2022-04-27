// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated

  const logger = vscode.window.createOutputChannel("Todoer");

  // Would be nice to format lgoger at some point
  // const winston = require('winston')
  // https://stackoverflow.com/questions/34085330/how-to-write-to-log-from-vscode-extension
  //   const logger = winston.Logger = winston.createLogger({
  // 	  level: 'debug',
  // 	  format: winston.format.combine(
  // 		  winston.format.colorize(),
  // 		  winston.format.simple(),
  // 		  winston.format.timestamp({
  // 			format: "YYYY-MM-DD HH:mm:ss"
  // 		  }),
  // 		  winston.format.printf((timestamp: string, level: string, message: string) =>
  // 		  {
  // 			  return `[${timestamp}] ${level} ${message}`
  // 			})
  // 	  ),
  // 	  transports: [
  // 		  new winston.transports.Console({ level: 'info' })
  // 	  ]
  //   })

  // 	logger.info({ level: 'info', message: "Congrats, todoer is active!" })

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand("todoer.toggleTask", () => {
    // The code you place here will be executed every time your command is executed
    // Display a message box to the user

    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      logger.appendLine("No Editor Found.");
      return;
    }
    logger.appendLine("WE HAVE AN EDITOR");
    const selection = editor.selection;
    if (selection.isSingleLine) {
      logger.appendLine("Detected: Single Line");

      const { text } = editor.document.lineAt(selection.active.line);
      if (text.startsWith("- [ ] ")) {
        logger.appendLine("Detected: Existing Todo. Removing.");
        const start = new vscode.Position(selection.active.line, 0);
        const end = new vscode.Position(selection.active.line, 6);
        editor.edit((edit) => edit.delete(new vscode.Range(start, end)));
      } else {
        logger.appendLine("Detected: No Existing Todo. Adding.");
        editor.edit((edit) =>
          edit.insert(new vscode.Position(selection.active.line, 0), "- [ ] ")
        );
      }
    } else {
      // TODO: If any lines start with "- [ ] " then remove it from all lines (Do not add in this case).
      logger.appendLine("Detected: Multiple Lines");
      editor.edit((edit) => {
        for (var i = selection.start.line; i <= selection.end.line; i = i + 1) {
          logger.appendLine("Line: " + i.toString());
          const line = new vscode.Position(i, 0);
          edit.insert(line, "- [ ] ");
        }
      });
    }
    logger.appendLine("Success, added todo");
  });
  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
