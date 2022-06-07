import { expect } from "chai";
import * as todoer from "../../src/core/todoer";

describe("Toggling a Task", () => {
  // prettier-ignore
  const expectations = [
    
    // Single line
    [ "Go shopping",           "- [ ] Go shopping"     ],
    [ " Go shopping ",         "- [ ]  Go shopping "   ],
    [ "\tGo shopping\t",       "- [ ] \tGo shopping\t" ],
    [ "[] Go shopping",        "- [ ] [] Go shopping"  ],
    [ "",                      "- [ ] "                ],
    [ "\t",                    "- [ ] \t"              ],
    [ " ",                     "- [ ]  "               ],
    [ "- [ ] Go shopping",     "Go shopping"           ],
    [ "- [ ]  Go shopping ",   " Go shopping "         ],
    [ "- [ ] \tGo shopping\t", "\tGo shopping\t"       ],
    [ "- [ ] [] Go shopping",  "[] Go shopping"        ],
    [ "- [ ] ",                ""                      ],
    [ "- [ ] \t",              "\t"                    ],
    [ "- [ ]  ",               " "                     ],

    // Multiline
    [
      "Go shopping\n" + 
      "Go running\n" + 
      "Do homework",

      "- [ ] Go shopping\n" + 
      "- [ ] Go running\n" + 
      "- [ ] Do homework",
    ],
    [
      "- [ ] Go shopping\n" + 
      "- [ ] Go running\n" + 
      "- [ ] Do homework",

      "Go shopping\n" + 
      "Go running\n" + 
      "Do homework",
    ],
    [
      "Go shopping\n" + 
      "Go running\n" + 
      "- [ ] Do homework",

      "- [ ] Go shopping\n" + 
      "- [ ] Go running\n" + 
      "- [ ] Do homework",
    ],       
  ];

  for (const [input, expected] of expectations) {
    it(`Should toggle ${JSON.stringify(input)}`, () => {
      const actual = todoer.toggleTasks(input);
      expect(actual).to.be.equal(expected);
    });
  }
});
