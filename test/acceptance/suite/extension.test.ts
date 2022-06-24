import { SilentReporter } from "@vscode/test-electron";
import * as assert from "assert";

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from "vscode";
// import * as myExtension from '../../extension';

suite("Extension Test Suite", () => {
  // Make sure there is an active editor
  suiteSetup(async () => {
    await vscode.commands.executeCommand(
      "workbench.action.files.newUntitledFile"
    );
  });

  // Clear the contents of the active text editor before each test
  setup(async () => {
    const editor = getEditor();
    const document = editor.document;
    vscode.window.showTextDocument;

    await editor.edit((edit) => {
      edit.delete(
        new vscode.Range(
          new vscode.Position(0, 0),
          new vscode.Position(document.lineCount + 1, 0)
        )
      );
    });
  });

  test("Creating a task", async () => {
    // Given some text is entered
    const editor = getEditor();
    await editor.edit((edit) => {
      edit.insert(new vscode.Position(0, 0), "Go shopping");
    });

    // When I create a task
    await vscode.commands.executeCommand("todoer.toggleTask");
    await wait(200);

    // Then a task is created
    assert.strictEqual(editor.document.getText(), "- [ ] Go shopping");
  });

  test("Cancelling a task", async () => {
    // Given a task has been created
    const editor = getEditor();
    await editor.edit((edit) => {
      edit.insert(new vscode.Position(0, 0), "Go shopping");
    });
    await vscode.commands.executeCommand("todoer.toggleTask");
    await wait(200);
    assert.strictEqual(editor.document.getText(), "- [ ] Go shopping");

    // When I cancel the task
    await vscode.commands.executeCommand("todoer.toggleCancel");
    await wait(200);

    // Then the task is cancelled
    assert.strictEqual(editor.document.getText(), "- [ ] ~~Go shopping~~");
  });

  test("Completing a task", async () => {
    // Given a task has been created
    const editor = getEditor();
    await editor.edit((edit) => {
      edit.insert(new vscode.Position(0, 0), "Go shopping");
    });
    await vscode.commands.executeCommand("todoer.toggleTask");
    await wait(200);
    assert.strictEqual(editor.document.getText(), "- [ ] Go shopping");

    // When I complete the task
    await vscode.commands.executeCommand("todoer.toggleDone");
    await wait(200);

    // Then the task is completed
    assert.strictEqual(editor.document.getText(), "- [x] Go shopping");
  });

  test("Multiple lines", async () => {
    // Given a multi-line selection
    const editor = getEditor();
    await editor.edit((edit) => {
      edit.insert(new vscode.Position(0, 0), "Go shopping\nGo running");
    });
    await wait(200);

    // When I select both of them and create a task
    await vscode.commands.executeCommand("cursorMove", {
      to: "up",
      by: "line",
      select: true,
    });
    await vscode.commands.executeCommand("todoer.toggleTask");
    await wait(200);

    // Then both lines have been turned into tasks
    assert.strictEqual(
      editor.document.getText(),
      "- [ ] Go shopping\n- [ ] Go running"
    );
  });
});

// I've observed that calling `editor.document.getText()` right after calling
// `await vscode.commands.executeCommand()`, I still get the old text before
// formatting.  I'm not sure why.  Adding a slight sleep in between these
// calls seems to fix the test flakiness.
async function wait(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => resolve(), ms);
  });
}

function getEditor() {
  let editor = vscode.window.activeTextEditor;
  if (!editor) {
    throw new Error("Expected to get a vscode.TextEditor, but got undefined");
  }
  return editor;
}
