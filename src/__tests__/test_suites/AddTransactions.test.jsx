import { describe, test, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../../components/App.jsx";

describe("Add Transactions", () => {
  beforeEach(() => {
    global.fetch = vi.fn((url, options) => {
      if (options?.method === "POST") {
        return Promise.resolve({
          ok: true,
          json: async () => ({
            id: 1,
            description: "Coffee",
          }),
        });
      }

      return Promise.resolve({
        ok: true,
        json: async () => [],
      });
    });
  });

  test("adds transaction via POST request", async () => {
    render(<App />);

    const user = userEvent.setup();

    await user.type(
      screen.getByPlaceholderText(/description/i),
      "Coffee"
    );

    await user.click(
      screen.getByText(/add transaction/i)
    );

    expect(fetch).toHaveBeenCalled();
  });
});