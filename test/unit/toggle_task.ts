import { expect } from "chai";
import * as todoer from "../../src/core/todoer";

describe("Creating a task", () => {
  describe("Should toggle non-tasks into incomplete tasks", () => {
    // prettier-ignore
    const theories = [
        //  Obvious case       
        [ "Go shopping", "- [ ] Go shopping" ],
        [ "",            "- [ ] "            ],

        // Already has a "-" or a "[]"
        [ "-Go shopping   ", "- [ ] Go shopping" ],
        [ "- Go shopping",   "- [ ] Go shopping" ],
        [ "-",               "- [ ] "            ],
        [ "[]Go shopping\t", "- [ ] Go shopping" ],
        [ "[]\t\t ",         "- [ ] "            ],
        [ "[ ]Go shopping",  "- [ ] Go shopping" ],
        [ "[ ] Go shopping", "- [ ] Go shopping" ],       

        // Existing indentation
        [ "  Go shopping",   "  - [ ] Go shopping" ],
        [ "\t-Go shopping",  "\t- [ ] Go shopping" ],
        [ "  ",              "  - [ ] "            ],
        [ "\t[ ]",           "\t- [ ] "            ],
        
        //  Weird cases   
        [ "- - Go shopping",       "- [ ] - Go shopping"     ],
        [ "[ ] []Go shopping",     "- [ ] []Go shopping"     ],
      ];
    test(theories);
  });

  describe("Should toggle an incomplete task into a non-task", () => {
    // prettier-ignore
    const theories = [
      // Obvious cases
      [ "- [ ] Go shopping",      "Go shopping" ],
      [ "- [ ] ",                 ""            ],

      // With indentation
      [ "  - [ ] Go shopping", "  Go shopping" ],
      [ "\t- [ ] Go shopping", "\tGo shopping" ],
      [ "  - [ ] ",            "  "            ],
      [ "\t- [ ] ",            "\t"            ],      

      // Poorly formatted
      [ "-[]Go shopping",   "Go shopping" ],
      [ "- [] Go shopping", "Go shopping" ],
      [ "-[]",              ""            ],
      [ "- [] \t",          ""            ],       

      //  Weird cases
      [ "-[] - [ ] Go shopping", "- [ ] Go shopping" ],      
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

  describe("Should ignore completed tasks", () => {
    // prettier-ignore
    const theories = [
      [ "- [x] Go shopping",     "- [x] Go shopping"     ],
      [ "-[ x ]  Go shopping\t", "-[ x ]  Go shopping\t" ],      
    ];

    test(theories);
  });

  it("Should toggle a mixture of non-tasks and incomplete tasks all to incomplete tasks", () => {
    // Given some non-tasks
    // And some incomplete tasks
    // And some cancelled tasks
    // And some complete tasks
    // prettier-ignore
    const input = 
      "Go shopping\n" +
      "- [ ] Go Running\n" +
      "-[] Go to school\n" +
      "- [ ] ~~Eat candy~~\n" +
      "- [x] Brush teeth\n" +
      "";

    // When I toggle them
    const actual = todoer.toggleTask(input);

    // Then all the non-tasks turn into incomplete tasks
    // And the incomplete tasks stay as incomplete tasks
    // And the cancelled tasks are ignored
    // And the completed tasks are ignored
    // prettier-ignore
    const expected = 
      "- [ ] Go shopping\n" +
      "- [ ] Go Running\n" +
      "-[] Go to school\n" +
      "- [ ] ~~Eat candy~~\n" +
      "- [x] Brush teeth\n" +
      "- [ ] ";

    expect(actual).to.be.equal(expected);
  });

  it("Should toggle a a mixture of incomplete tasks back to non-tasks", () => {
    // Given some incomplete tasks
    // And some cancelled tasks
    // And some complete tasks
    // prettier-ignore
    const input = 
      "- [ ] Go shopping\n" +
      "-[] Wake up\n" +
      "- [ ] ~~Eat candy~~\n" +
      "- [x] Brush teeth\n" +
      "- [ ] ";

    // When I toggle them
    const actual = todoer.toggleTask(input);

    // Then all the incomplete tasks turn into non-tasks
    // And the cancelled tasks are ignored
    // And the completed tasks are ignored
    // prettier-ignore
    const expected = 
      "Go shopping\n" +
      "Wake up\n" +
      "- [ ] ~~Eat candy~~\n" +
      "- [x] Brush teeth\n" +
      "";

    expect(actual).to.be.equal(expected);
  });
});

function test(theories: Array<Array<string>>) {
  for (const [input, expected] of theories) {
    it(`${JSON.stringify(input).padEnd(25, " ")} -> ${JSON.stringify(expected)}`, () => {
      expect(todoer.toggleTask(input)).to.be.equal(expected);
    });
  }
}
