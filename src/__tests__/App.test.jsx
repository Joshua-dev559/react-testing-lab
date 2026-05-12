import { describe, test, expect } from "vitest";

describe("App Smoke Test", () => {
  test("renders basic test", () => {
    expect(2 + 2).toBe(4);
  });
});