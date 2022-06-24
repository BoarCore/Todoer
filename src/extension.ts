// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import * as todoer from "./core/todoer";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
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

  const toggleTaskCmd = vscode.commands.registerCommand(
    "todoer.toggleTask",
    createCommand(todoer.toggleTask)
  );
  const toggleDoneCmd = vscode.commands.registerCommand(
    "todoer.toggleDone",
    createCommand(todoer.toggleComplete)
  );
  const toggleCancelCmd = vscode.commands.registerCommand(
    "todoer.toggleCancel",
    createCommand(todoer.toggleCancel)
  );

  context.subscriptions.push(toggleTaskCmd);
  context.subscriptions.push(toggleDoneCmd);
  context.subscriptions.push(toggleCancelCmd);
}

// this method is called when your extension is deactivated
export function deactivate() {}

function createCommand(todoerFn: (s: string) => string): () => void {
  return function () {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      return;
    }

    // Get all text from selected lines
    const selection = editor.selection;
    const document = editor.document;
    const startPos = document.lineAt(selection.start).range.start;
    const endPos = document.lineAt(selection.end).range.end;
    const range = new vscode.Range(startPos, endPos);
    const text = document.getText(range);

    const toggledTasks = todoerFn(text);

    editor.edit((edit) => edit.replace(range, toggledTasks));
  };
}
