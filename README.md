# Todoer

A vscode extension to help with handling simple markdown checklists. Hopefully compatible with Dendron.

![GitHub contributors](https://img.shields.io/github/contributors/BoarCore/Todoer?style=flat-square)
![GitHub top language](https://img.shields.io/github/languages/top/BoarCore/Todoer?style=flat-square)
![Open Issues](https://img.shields.io/github/issues-raw/BoarCore/Todoer?style=flat-square)

## Hopeful Features

Going to turn these into github issues at some point soon.

- [x] ~~Ability to toggle single or multiple lines as todos~~
- [x] ~~Ability to mark a todo as complete with a shortcut, will toggle.~~
- [ ] Ability to add a start time to a todo with a shortcut
- [ ] Ability to add a end time with a duration when the todo is completed and it has a start time
- [ ] Ability to pause a todo
  - should keep when started
  - add pause notation
  - keep duration of total time
- [ ] Ability to archive completed tasks in the same file
- [ ] Ability to archive completed tasks to another file
- [ ] Possibly update frontmatter with total elapsed time in the document

Dendron tags can be used for importance/priority.

## Requirements

- VSCode
- Markdown file
- This extension

## Extension Settings

I'm not sure if the keyboard shortcut toggling is native or not so I've included it.

- [ ] Change keyboard shortcut for Toggle Task.
- [ ] Change keyboard shortcut for Toggle Done.
- [ ] Setting to turn strikethrough on/off for completed task.

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

For example:

This extension contributes the following settings:

- `myExtension.enable`: enable/disable this extension
- `myExtension.thing`: set to `blah` to do something

## Known Issues

See Github Issues. Please do a search before submitting an issue to check for duplicates.

## Contributing

Ensure that you've read through the extensions guidelines and follow the best practices for creating your extension.

- [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

All features should keep in the mind flexibility with settings(i.e. ) and compatibility with Dendron

- All shortcuts should be adjustable by the end user via settings
- Don't adjust frontmatter unless explicitly stated. Never touch frontmatter id.

When you clone the repo, configure your githooks path so that conventional hooks are enforced.

`git config core.hooksPath .githooks`

## Release Notes

See [Changelog](./CHANGELOG.md)
