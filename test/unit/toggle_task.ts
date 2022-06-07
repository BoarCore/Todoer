import { expect } from "chai";
import * as todoer from "../../src/core/todoer";

describe("Toggling a Task", () => {
  describe("Should toggle non-tasks to task", () => {
    // prettier-ignore
    const theories = [
      [ "Go shopping",       "- [ ] Go shopping"    ],
      [ " \tGo shopping\t ", "- [ ] Go shopping"    ],
      [ "[] Go shopping",    "- [ ] [] Go shopping" ],
      [ "",                  "- [ ] "               ],
      [ "\t",                "- [ ] "               ],
      [ " ",                 "- [ ] "               ],
    ];

    for (const [input, expected] of theories) {
      it(`Should toggle ${JSON.stringify(input)}`, () => {
        const actual = todoer.toggleTasks(input);
        expect(actual).to.be.equal(expected);
      });
    }
  });

  describe("Should toggle incomplete tasks to non-tasks", () => {
    // prettier-ignore
    const theories = [
      [ "- [ ] Go shopping",       "Go shopping"     ],
      [ "- [ ] ~Go shopping~",     "~Go shopping~"   ],
      [ "- [ ] Go ~~shopping~~",   "Go ~~shopping~~" ],
      [ "- [ ] ~~Go shopping~~",   "~~Go shopping~~" ],
      [ "- [ ] [ ] Go shopping",   "[ ] Go shopping" ],
      [ "- [ ] \t Go shopping \t", "Go shopping"     ],
      [ "- [ ] ",                  ""                ],
    ];

    for (const [input, expected] of theories) {
      it(`Should toggle ${JSON.stringify(input)}`, () => {
        const actual = todoer.toggleTasks(input);
        expect(actual).to.be.equal(expected);
      });
    }
  });

  describe("Should toggle completed tasks to non-tasks", () => {
    // prettier-ignore
    const theories = [
      [ "- [x] ~~Go shopping~~",       "Go shopping"     ],
      [ "- [x] ~~Go ~~shopping~~~~",   "Go ~~shopping~~" ],
      [ "- [x] ~~~Go shopping~~",      "~Go shopping"    ],
      [ "- [x] ~~~~Go shopping~~~~",   "~~Go shopping~~" ],
      [ "- [x] ~~[x] Go shopping~~",   "[x] Go shopping" ],
      [ "- [x] ~~ \tGo shopping\t ~~", "Go shopping"     ],
      [ "- [x]  \t~~Go shopping~~\t ", "Go shopping"     ],
      [ "- [x] ~~~~",                  ""                ],
    ];

    for (const [input, expected] of theories) {
      it(`Should toggle ${JSON.stringify(input)}`, () => {
        const actual = todoer.toggleTasks(input);
        expect(actual).to.be.equal(expected);
      });
    }
  });

  it("Should toggle multiple non-tasks to tasks", () => {
    // prettier-ignore
    const input = 
      "Go shopping\n" + 
      "Go running\n" + 
      "Do homework";

    // prettier-ignore
    const expected = 
      "- [ ] Go shopping\n" + 
      "- [ ] Go running\n" + 
      "- [ ] Do homework";

    const actual = todoer.toggleTasks(input);
    expect(actual).to.be.equal(expected);
  });

  it("Should toggle multiple tasks to non-tasks", () => {
    // prettier-ignore
    const input = 
      "- [ ] Go shopping\n" + 
      "- [ ] Go running\n" + 
      "- [ ] Do homework";

    // prettier-ignore
    const expected = 
      "Go shopping\n" + 
      "Go running\n" + 
      "Do homework";

    const actual = todoer.toggleTasks(input);
    expect(actual).to.be.equal(expected);
  });

  it("Should toggle a mix of tasks and non-tasks to tasks", () => {
    // prettier-ignore
    const input = 
      "Go shopping\n" + 
      "- [ ] Go running\n" + 
      "- [ ] Do homework";

    // prettier-ignore
    const expected = 
      "- [ ] Go shopping\n" + 
      "- [ ] Go running\n" + 
      "- [ ] Do homework";

    const actual = todoer.toggleTasks(input);
    expect(actual).to.be.equal(expected);
  });

  it("Should toggle a mix of tasks and non-tasks to tasks, but ignore completed tasks", () => {
    // prettier-ignore
    const input = 
      "Go shopping\n" + 
      "- [x] ~~Go running~~\n" + 
      "- [ ] Do homework";

    // prettier-ignore
    const expected = 
      "- [ ] Go shopping\n" + 
      "- [x] ~~Go running~~\n" + 
      "- [ ] Do homework";

    const actual = todoer.toggleTasks(input);
    expect(actual).to.be.equal(expected);
  });
});
