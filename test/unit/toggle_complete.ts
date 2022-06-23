import { expect } from "chai";
import * as todoer from "../../src/core/todoer";

describe("Completing a task", () => {
  describe("Should toggle an incomplete task to complete", () => {
    // prettier-ignore
    const theories = [
      // Obvious cases
      [ "- [ ] Go shopping",      "- [x] Go shopping" ],

      // Extra space on the end
      [ "- [ ] Go shopping \t",   "- [x] Go shopping" ],     

      // With indentation
      [ "  - [ ] Go shopping", "  - [x] Go shopping" ],
      [ "\t- [ ] Go shopping", "\t- [x] Go shopping" ],

      // Extra and removed spaces
      [ "-[] Go shopping",     "- [x] Go shopping"   ],       

      // Weird cases
      [ "-[] [ ] Go shopping", "- [x] [ ] Go shopping" ],
    ];

    test(theories);
  });

  describe("Should toggle a complete task to incomplete", () => {
    // prettier-ignore
    const theories = [
      // Obvious cases
      [ "- [x] Go shopping",      "- [ ] Go shopping" ],
      [ "- [x] ",                 "- [ ] "            ], 

      // With indentation
      [ "  - [x] Go shopping",      "  - [ ] Go shopping" ],
      [ "\t- [x] ",                 "\t- [ ] "            ], 

      // Extra spaces
      [ "- [ x ]  Go shopping \t",  "- [ ] Go shopping" ],
      [ "- [ x\t]   \t",            "- [ ] "            ],
    ];

    test(theories);
  });

  describe("Should ignore cancelled tasks", () => {
    // prettier-ignore
    const theories = [
      [ "- [ ] ~~Go shopping~~",   "- [ ] ~~Go shopping~~"   ],
      [ "  -[] ~~Go shopping~~\t", "  -[] ~~Go shopping~~\t" ],
    ];

    test(theories);
  });

  describe("Should ignore empty tasks", () => {
    // prettier-ignore
    const theories = [
      [ "- [ ] ",   "- [ ] "   ],
      [ "  - []",   "  - []"   ],
    ];

    test(theories);
  });

  describe("Should ignore non-tasks", () => {
    // prettier-ignore
    const theories = [
      [ "Go shopping",  "Go shopping" ],
      [ "  ",           "  "          ],
    ];

    test(theories);
  });

  it("Should toggle a mixture of incomplete and complete tasks all to completed tasks", () => {
    // Given some incomplete tasks
    // And some complete tasks
    // And some non-tasks
    // And some cancelled tasks
    // prettier-ignore
    const input = 
      "- [ ] Go shopping\n" +
      "- [x] Go Running\n" +
      "Brush teeth\n" +
      "\n" +
      "- [ ] ~~Eat candy~~";

    // When I toggle them
    const actual = todoer.toggleComplete(input);

    // Then all the incomplete tasks turn into complete tasks
    // And the complete tasks stay the same
    // And the non-tasks are ignored
    // And the cancelled tasks are ignored
    // prettier-ignore
    const expected = 
      "- [x] Go shopping\n" +
      "- [x] Go Running\n" +
      "Brush teeth\n" +
      "\n" +
      "- [ ] ~~Eat candy~~";

    expect(actual).to.be.equal(expected);
  });

  it("Should toggle all complete tasks to incomplete tasks", () => {
    // Given some incomplete tasks
    // And some complete tasks
    // And some non-tasks
    // And some cancelled tasks
    // prettier-ignore
    const input = 
      "- [x] Go shopping\n" +
      "- [x] Go Running\n" +
      "Brush teeth\n" +
      "- [x] \n" +
      "- [] ~~Eat candy~~";

    // When I toggle them
    const actual = todoer.toggleComplete(input);

    // Then all the incomplete tasks turn into complete tasks
    // And the complete tasks stay the same
    // And the non-tasks are ignored
    // And the cancelled tasks are ignored
    // prettier-ignore
    const expected = 
      "- [ ] Go shopping\n" +
      "- [ ] Go Running\n" +
      "Brush teeth\n" +
      "- [ ] \n" +
      "- [] ~~Eat candy~~";

    expect(actual).to.be.equal(expected);
  });
});

function test(theories: Array<Array<string>>) {
  for (const [input, expected] of theories) {
    it(`${JSON.stringify(input).padEnd(25, " ")} -> ${JSON.stringify(
      expected
    )}`, () => {
      expect(todoer.toggleComplete(input)).to.be.equal(expected);
    });
  }
}
