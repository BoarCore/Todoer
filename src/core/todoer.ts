export function toggleTasks(todos: string): string {
  const allLinesToggledOn = todos.replace(/^(?!- \[ \] )/gm, "- [ ] ");
  return allLinesToggledOn === todos
    ? todos.replace(/^- \[ \] /gm, "")
    : allLinesToggledOn;
}
