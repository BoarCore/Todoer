/*
^
(?![ \t]*-[ \t]*\[[^\]]*\])    # Negative lookahead. Don't match lines that look like "- [<any_char>]"
([ \t]*)                       # Capture leading indentation
(?:-|\[[ \t]*\])?              # Non capture group. Match zero or one "-" or a "[ ]"
[ \t]*(.*?)[ \t]*              # Capture the task text, leaving off any leading or trailing whitespace
$
*/
const nonTasks =
  /^(?![ \t]*-[ \t]*\[[^\]]*\])([ \t]*)(?:-|\[[ \t]*\])?[ \t]*(.*?)[ \t]*$/gm;

/*
^
([ \t]*)               # Capture leading indentation 
-[ \t]*\[[ \t]*\]      # Match the a string that looks like "- [ ]"
(?![ \t]*~~.*?~~)      # Negative lookahead.  Don't match cancelled todos
[ \t]*(.*?)[ \t]*      # Capture the task text, leaving off any leading or trailing whitespace
$
*/
const incompleteTasksThatMightHaveNoText =
  /^([ \t]*)-[ \t]*\[[ \t]*\](?![ \t]*~~.*?~~)[ \t]*(.*?)[ \t]*$/gm;

/*
^
([ \t]*)                # Capture leading indentation 
-[ \t]*\[[ \t]*\]       # Match the a string that looks like "- [ ]"
(?![ \t]*~~.*?~~)       # Negative lookahead.  Don't match cancelled todos
[ \t]*(.*?\S.*?)[ \t]*  # Capture the task text, leaving off any leading or trailing whitespace.  Make sure there's at least one non-whitespace character in order to match.
$
*/
const incompleteTasksWithText =
  /^([ \t]*)-[ \t]*\[[ \t]*\](?![ \t]*~~.*?~~)[ \t]*(.*?\S.*?)[ \t]*$/gm;

/*
^
([ \t]*)                 # Capture leading indentation 
-[ \t]*\[[ \t]*\]        # Match the a string that looks like "- [ ]"
[ \t]*~~(.*?)~~[ \t]*    # Capture the task text, leaving off any leading or trailing whitespace and strikethroughs
$
*/
const cancelledTasks = /^([ \t]*)-[ \t]*\[[ \t]*\][ \t]*~~(.*?)~~[ \t]*$/gm;

/*
^
([ \t]*)                     # Capture leading indentation 
-[ \t]*\[[ \t]*x[ \t]*\]     # Match the a string that looks like "- [x]" (completed task)
(?![ \t]*~~.*?~~)            # Negative lookahead.  Don't match cancelled todos
[ \t]*(.*?)[ \t]*            # Capture the task text, leaving off any leading or trailing whitespace
$
*/
const completeTasks =
  /^([ \t]*)-[ \t]*\[[ \t]*x[ \t]*\](?![ \t]*~~.*?~~)[ \t]*(.*?)[ \t]*$/gm;

export function toggleTask(input: string): string {
  let toggledOn = input.replace(nonTasks, "$1- [ ] $2");

  // If no formatting change occured from trying to turn the input into tasks,
  // then they might all be tasks already.  Try toggling them into non-tasks.
  return toggledOn === input
    ? input.replace(incompleteTasksThatMightHaveNoText, "$1$2")
    : toggledOn;
}

export function toggleComplete(input: string): string {
  const toggledComplete = input.replace(incompleteTasksWithText, "$1- [x] $2");

  // If no formatting change occured from trying to turn the input into
  // completed tasks, then they might all be completed already.
  // Try toggling them back into incomplete tasks.
  return toggledComplete === input
    ? input.replace(completeTasks, "$1- [ ] $2")
    : toggledComplete;
}

export function toggleCancel(input: string): string {
  const cancelled = input.replace(incompleteTasksWithText, "$1- [ ] ~~$2~~");

  // If no formatting change occured from trying to turn the input into
  // cancelled tasks, then they might all be cancelled already.
  // Try toggling them back into incomplete tasks.
  return cancelled === input
    ? input.replace(cancelledTasks, "$1- [ ] $2")
    : cancelled;
}
