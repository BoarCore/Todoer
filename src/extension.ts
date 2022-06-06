// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import * as todoer from "./core/todoer";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  const TODO_TEXT = "- [ ] ";
  const DONE_TEXT = "- [x] ";
  const DONE_TEXT_WITH_STRIKE = "- [x] ~~";

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

  const getEditor = () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      logger.appendLine("No Editor Found.");
      return undefined;
    }
    logger.appendLine("WE HAVE AN EDITOR");
    return editor;
  };

  const getSelection = (editor: vscode.TextEditor) => {
    return editor.selection;
  };
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand("todoer.toggleTask", () => {
    // The code you place here will be executed every time your command is executed
    // Display a message box to the user

    const editor = getEditor();
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

    const toggledTasks = todoer.toggleTasks(text);

    editor.edit((edit) => edit.replace(range, toggledTasks));
  });

  let toggleDone = vscode.commands.registerCommand("todoer.toggleDone", () => {
    logger.appendLine(`todoer.toggleDone`);

    const editor = getEditor();
    if (!editor) {
      return;
    }

    const selection = getSelection(editor);
    const line = selection.active.line;
    const lineText = editor.document.lineAt(line).text;
    if (lineText.startsWith(TODO_TEXT)) {
      logger.appendLine(`Detected: Not Done. Marking as Done.`);
      editor.edit((edit) => {
        edit.replace(
          new vscode.Range(
            new vscode.Position(line, 3),
            new vscode.Position(line, 4)
          ),
          "x"
        );
        edit.insert(new vscode.Position(line, 6), "~~");
        edit.insert(new vscode.Position(line, lineText.length), "~~");
      });
    } else if (lineText.startsWith(DONE_TEXT)) {
      logger.appendLine(`Detected: Done. Removing.`);
      editor.edit((edit) => {
        if (lineText.startsWith(DONE_TEXT_WITH_STRIKE)) {
          edit.delete(
            new vscode.Range(
              new vscode.Position(line, 6),
              new vscode.Position(line, 8)
            )
          );
          var lastIndex = lineText.lastIndexOf("~~");
          if (lastIndex > 8) {
            edit.delete(
              new vscode.Range(
                new vscode.Position(line, lastIndex),
                new vscode.Position(line, lastIndex + 2)
              )
            );
          }
        }
        edit.replace(
          new vscode.Range(
            new vscode.Position(line, 3),
            new vscode.Position(line, 4)
          ),
          " "
        );
      });
    }
    logger.appendLine(`Success todoer.toggleDone`);
  });

  context.subscriptions.push(disposable);
  context.subscriptions.push(toggleDone);
}

// this method is called when your extension is deactivated
export function deactivate() {}
