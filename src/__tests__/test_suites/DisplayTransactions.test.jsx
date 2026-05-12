import { describe, test, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../../components/App.jsx";

const mockTransactions = [
  {
    id: 1,
    description: "Groceries",
    amount: 200,
  },
  {
    id: 2,
    description: "Rent",
    amount: 1000,
  },
];

beforeEach(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockTransactions),
    })
  );
});

describe("Display Transactions", () => {
  test("renders transactions on startup", async () => {
    render(<App />);

    const groceries = await screen.findByText(/groceries/i);
    const rent = await screen.findByText(/rent/i);

    expect(groceries).toBeInTheDocument();
    expect(rent).toBeInTheDocument();
  });
});