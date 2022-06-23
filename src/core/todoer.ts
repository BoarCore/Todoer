/*
^
(?![ \t]*-[ \t]*\[[^\]]*\])    # Negative lookahead. Don't match lines that look like "- [<any_char>]"
([ \t]*)                       # Capture leading indentation
(?:-|\[[ \t]*\])?              # Non capture group. Match zero or one "-" or a "[ ]"
[ \t]*(.*?)[ \t]*              # Capture the task text, leaving off any leading or trailing whitespace
$
*/
const nonTasks = /^(?![ \t]*-[ \t]*\[[^\]]*\])([ \t]*)(?:-|\[[ \t]*\])?[ \t]*(.*?)[ \t]*$/gm;

/*
^
(?!                                       # Negative lookahead.  Don't match completed or cancelled tasks
  [ \t]*-[ \t]*\[[ \t]*x[ \t]*\]          # Don't match lines that start with "- [x]" (completed tasks)
  |                                       # OR
  [ \t]*-[ \t]*\[[ \t]*\][ \t]*~~[^~]+~~  # Don't match lines that match "- [ ] ~~<some text>~~" (cancelled tasks)
)
([ \t]*)                                  # Capture leading indentation 
-[ \t]*\[[ \t]*\]                         # Match the a string that looks like "- [ ]"
[ \t]*(.*?)[ \t]*                         # Capture the task text, leaving off any leading or trailing whitespace
$
*/
const incompleteTasks = /^([ \t]*)-[ \t]*\[[ \t]*\](?![ \t]*~~.*?~~)[ \t]*(.*?)[ \t]*$/gm;

/*
^
(?!                                       # Negative lookahead.  Don't match completed or cancelled tasks
  [ \t]*-[ \t]*\[[ \t]*x[ \t]*\]          # Don't match lines that start with "- [x]" (completed tasks)
  |                                       # OR
  [ \t]*-[ \t]*\[[ \t]*\][ \t]*~~[^~]+~~  # Don't match lines that match "- [ ] ~~<some text>~~" (cancelled tasks)
)
([ \t]*)                                  # Capture leading indentation 
-[ \t]*\[[ \t]*\]                         # Match the a string that looks like "- [ ]"
[ \t]*(.*?)[ \t]*                         # Capture the task text, leaving off any leading or trailing whitespace
$
*/
const cancelledTasks = /^([ \t]*)-[ \t]*\[[ \t]*\][ \t]*~~(.*?)~~[ \t]*$/gm;

/*
^
(?![ \t]*-[ \t]*\[[ \t]*\][ \t]*~~[^~]+~~) # Negative lookahead. Don't match lines that look like "- [ ] ~~<some text>~~" (cancelled tasks)
([ \t]*)                                   # Capture leading indentation 
-[ \t]*\[[ \t]*x[ \t]*\]                   # Match the a string that looks like "- [x]" (completed task)
[ \t]*(.*?)[ \t]*                          # Capture the task text, leaving off any leading or trailing whitespace
$
*/
const completeTasks = /^([ \t]*)-[ \t]*\[[ \t]*x[ \t]*\](?![ \t]*~~.*?~~)[ \t]*(.*?)[ \t]*$/gm;

export function toggleTask(input: string): string {
  let toggledOn = input.replace(nonTasks, "$1- [ ] $2");

  // If no formatting change occured from trying to turn the input into tasks,
  // then they might all be tasks already.  Try toggling them into non-tasks.
  return toggledOn === input ? input.replace(incompleteTasks, "$1$2") : toggledOn;
}

export function toggleComplete(input: string): string {
  const toggledComplete = input.replace(incompleteTasks, "$1- [x] $2");

  // If no formatting change occured from trying to turn the input into
  // completed tasks, then they might all be completed already.
  // Try toggling them back into incomplete tasks.
  return toggledComplete === input ? input.replace(completeTasks, "$1- [ ] $2") : toggledComplete;
}

export function toggleCancel(input: string): string {
  const cancelled = input.replace(incompleteTasks, "$1- [ ] ~~$2~~");

  // If no formatting change occured from trying to turn the input into
  // cancelled tasks, then they might all be cancelled already.
  // Try toggling them back into incomplete tasks.
  return cancelled === input ? input.replace(cancelledTasks, "$1- [ ] $2") : cancelled;
}
