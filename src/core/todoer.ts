// Example: "- [ ] Go shopping"
const incompleteTodos = /^- \[ \] \s*(.*?)\s*$/gm;

// Example: "- [x] ~~Go shopping~~"
const completeTodos = /^- \[x\] \s*~~\s*(.*?)\s*~~\s*$/gm;

const nonTodos = /^(?!- \[(?:x| )\] )\s*(.*?)\s*$/gm;

const completeOrIncompleteTodos = new RegExp(
  completeTodos.source + "|" + incompleteTodos.source,
  "gm"
);

export function toggleTasks(todos: string): string {
  const allLinesToggledOn = todos.replace(nonTodos, "- [ ] $1");

  // GOTCHA: Because "completeOrIncompleteTodos" has two capture groups
  // separated by a regex "|" (or), I guess JavaScript always assigns
  // the first capture group to $1 and the second to $2.  I don't know
  // how to tell which regex on either side of the "|" matched, and so
  // I just print both $1$2 together, which works, surprisingly.
  return allLinesToggledOn === todos
    ? todos.replace(completeOrIncompleteTodos, "$1$2")
    : allLinesToggledOn;
}

export function toggleComplete(todos: string): string {
  const allTodosCompleted = todos.replace(incompleteTodos, "- [x] ~~$1~~");
  return allTodosCompleted === todos
    ? todos.replace(completeTodos, "- [ ] $1")
    : allTodosCompleted;
}
