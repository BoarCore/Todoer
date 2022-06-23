import { expect } from "chai";
import * as todoer from "../../src/core/todoer";

describe("Cancelling a task", () => {
  describe("Should be able to cancel an incomplete task", () => {
    // prettier-ignore
    const theories = [
      [ "- [ ] Go shopping", "- [ ] ~~Go shopping~~" ],
      // With indentation
      [ "  - [ ] Go shopping", "  - [ ] ~~Go shopping~~" ], 
    ];
    test(theories);
  });

  describe("Should be able to un-cancel a cancelled task", () => {
    // prettier-ignore
    const theories = [
      [ "- [ ] ~~Go shopping~~", "- [ ] Go shopping" ],         
      [ "- [ ] ~~~~",            "- [ ] "            ], 
      
      // With indentation
      [ "  - [ ] ~~Go shopping~~", "  - [ ] Go shopping" ],         
    ];
    test(theories);
  });

  describe("Should ignore completed tasks", () => {
    // prettier-ignore
    const theories = [
      [ "- [x] Go shopping", "- [x] Go shopping" ],         
    ];

    test(theories);
  });

  describe("Should ignore empty tasks", () => {
    // prettier-ignore
    const theories = [
      [ "- [ ] ",   "- [ ] "   ], 
      [ "  - [ ] ", "  - [ ] " ],           
    ];

    test(theories);
  });

  describe("Should ignore non-tasks", () => {
    // prettier-ignore
    const theories = [
      [ "Go shopping",     "Go shopping"     ],         
      [ "~~Go shopping~~", "~~Go shopping~~" ],  
      [ "",                ""                ],  
    ];

    test(theories);
  });

  it("Should cancel all tasks when there is a mix of cancelled and non-cancelled tasks", () => {
    // prettier-ignore
    const input = 
      "- [ ] Go shopping\n" +
      "- [ ] ~~Go running~~";

    const actual = todoer.toggleCancel(input);

    // prettier-ignore
    const expected = 
      "- [ ] ~~Go shopping~~\n" +
      "- [ ] ~~Go running~~";

    expect(actual).to.be.equal(expected);
  });

  it("Should un-cancel all tasks when all tasks are already canceled", () => {
    // prettier-ignore
    const input = 
      "- [ ] ~~Go shopping~~\n" +
      "- [ ] ~~Go running~~";

    const actual = todoer.toggleCancel(input);

    // prettier-ignore
    const expected = 
      "- [ ] Go shopping\n" +
      "- [ ] Go running";

    expect(actual).to.be.equal(expected);
  });
});

function test(theories: Array<Array<string>>) {
  for (const [input, expected] of theories) {
    it(`${JSON.stringify(input).padEnd(25, " ")} -> ${JSON.stringify(
      expected
    )}`, () => {
      expect(todoer.toggleCancel(input)).to.be.equal(expected);
    });
  }
}
