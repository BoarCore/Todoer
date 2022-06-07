import { expect } from "chai";
import * as todoer from "../../src/core/todoer";

describe("Toggling Task Completion", () => {
  describe("Should toggle an incomplete task to complete", () => {
    // prettier-ignore
    const theories = [
      [ "- [ ] Go shopping",       "- [x] ~~Go shopping~~"     ],
      [ "- [ ] ~Go shopping~",     "- [x] ~~~Go shopping~~~"   ],
      [ "- [ ] Go ~~shopping~~",   "- [x] ~~Go ~~shopping~~~~" ],
      [ "- [ ] ~~Go shopping~~",   "- [x] ~~~~Go shopping~~~~" ],
      [ "- [ ] [ ] Go shopping",   "- [x] ~~[ ] Go shopping~~" ],
      [ "- [ ] \t Go shopping \t", "- [x] ~~Go shopping~~"     ],
      [ "- [ ] ",                  "- [x] ~~~~"                ],
    ];

    for (const [input, expected] of theories) {
      it(`Should toggle ${JSON.stringify(input)}`, () => {
        const actual = todoer.toggleComplete(input);
        expect(actual).to.be.equal(expected);
      });
    }
  });

  describe("Should toggle a completed task to incomplete", () => {
    // prettier-ignore
    const theories = [
      [ "- [x] ~~Go shopping~~",       "- [ ] Go shopping"     ],
      [ "- [x] ~~Go ~~shopping~~~~",   "- [ ] Go ~~shopping~~" ],
      [ "- [x] ~~~Go shopping~~",      "- [ ] ~Go shopping"    ],
      [ "- [x] ~~~~Go shopping~~~~",   "- [ ] ~~Go shopping~~" ],
      [ "- [x] ~~[x] Go shopping~~",   "- [ ] [x] Go shopping" ],
      [ "- [x] ~~ \tGo shopping\t ~~", "- [ ] Go shopping"     ],
      [ "- [x]  \t~~Go shopping~~\t ", "- [ ] Go shopping"     ],
      [ "- [x] ~~~~",                  "- [ ] "                ],
    ];

    for (const [input, expected] of theories) {
      it(`Should toggle ${JSON.stringify(input)}`, () => {
        const actual = todoer.toggleComplete(input);
        expect(actual).to.be.equal(expected);
      });
    }
  });

  describe("Should do nothing when input is not a todo", () => {
    // prettier-ignore
    const notTodos = [
      "Go shopping",
      "",
      "\t",
      "-\t[ ] Go shopping",
      "-  [ ] Go shopping",
      "[ ] Go shopping",
      "- [] Go shopping",
      "- [ ]Go shopping",
      "- [x] ~nope~~",
      "- [x] ~~nope~",
      "- [x] nope",
    ];

    for (const input of notTodos) {
      it(`Should not modify ${JSON.stringify(input)}`, () => {
        const actual = todoer.toggleComplete(input);
        expect(actual).to.be.equal(input);
      });
    }
  });

  it("Should toggle multiple incomplete tasks to complete", () => {
    // prettier-ignore
    const input =
      "- [ ] Go shopping\n" + 
      "- [ ] Go running\n" + 
      "- [ ] Do homework";

    const expected =
      "- [x] ~~Go shopping~~\n" +
      "- [x] ~~Go running~~\n" +
      "- [x] ~~Do homework~~";

    const actual = todoer.toggleComplete(input);
    expect(actual).to.be.equal(expected);
  });

  it("Should toggle multiple complete tasks to incomplete", () => {
    const input =
      "- [x] ~~Go shopping~~\n" +
      "- [x] ~~Go running~~\n" +
      "- [x] ~~Do homework~~";

    // prettier-ignore
    const expected =
      "- [ ] Go shopping\n" + 
      "- [ ] Go running\n" + 
      "- [ ] Do homework";

    const actual = todoer.toggleComplete(input);
    expect(actual).to.be.equal(expected);
  });

  it("Should toggle a mixture of incomplete/complete tasks to all complete", () => {
    // prettier-ignore
    const input =
      "- [ ] Go shopping\n" + 
      "- [ ] Go running\n" + 
      "- [x] ~~Do homework~~";

    const expected =
      "- [x] ~~Go shopping~~\n" +
      "- [x] ~~Go running~~\n" +
      "- [x] ~~Do homework~~";

    const actual = todoer.toggleComplete(input);
    expect(actual).to.be.equal(expected);
  });

  it("Should ignore lines that aren't todos", () => {
    // prettier-ignore
    const input =
      "- [ ] Go shopping\n" + 
      "not a todo\n" +
      "\n" +
      "\t\n" +
      "- [ ] Do homework";

    const expected =
      "- [x] ~~Go shopping~~\n" +
      "not a todo\n" +
      "\n" +
      "\t\n" +
      "- [x] ~~Do homework~~";

    const actual = todoer.toggleComplete(input);
    expect(actual).to.be.equal(expected);
  });
});
