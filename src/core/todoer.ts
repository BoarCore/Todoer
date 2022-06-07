export function toggleTasks(todos: string): string {
  const allLinesToggledOn = todos.replace(/^(?!- \[ \] )/gm, "- [ ] ");
  return allLinesToggledOn === todos
    ? todos.replace(/^- \[ \] /gm, "")
    : allLinesToggledOn;
}

export function toggleComplete(todos: string): string {
  // Example: "- [ ] Go shopping"
  const incompleteTodos = /^- \[ \] \s*(.*?)\s*$/gm;

  // Example: "- [x] ~~Go shopping~~"
  const completeTodos = /^- \[x\] \s*~~\s*(.*?)\s*~~\s*$/gm;

  const allTodosCompleted = todos.replace(incompleteTodos, "- [x] ~~$1~~");
  return allTodosCompleted === todos
    ? todos.replace(completeTodos, "- [ ] $1")
    : allTodosCompleted;
}
