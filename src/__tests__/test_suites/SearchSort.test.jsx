import { describe, test, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

describe("Search Transactions", () => {
  test("filters transactions based on search input", async () => {
    render(<App />);

    const searchInput =
      screen.getByPlaceholderText(/search/i);

    await userEvent.type(searchInput, "Rent");

    const rentTransaction =
      await screen.findByText(/rent/i);

    expect(rentTransaction).toBeInTheDocument();

    expect(
      screen.queryByText(/groceries/i)
    ).not.toBeInTheDocument();
  });
});