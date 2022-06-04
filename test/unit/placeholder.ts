import { expect } from "chai";

describe("Hello World", () => {
  it("Should be the correct greeting", () => {
    const greeting = "Hello, World!";
    expect(greeting).to.equal("Hello, World!");
  });
});
