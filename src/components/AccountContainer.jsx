import React, { useState, useEffect } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";
import Sort from "./Sort";

function AccountContainer() {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");

  // GET transactions
  useEffect(() => {
    fetch("http://localhost:6001/transactions")
      .then((r) => r.json())
      .then((data) => setTransactions(data));
  }, []);

  // POST transaction (FIXED STATE UPDATE BUG)
  function postTransaction(newTransaction) {
    fetch("http://localhost:6001/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTransaction),
    })
      .then((r) => r.json())
      .then((data) => {
        setTransactions((prev) => [...prev, data]);
      });
  }

  // SORT FUNCTION (IMPLEMENTED)
  function onSort(type) {
    setSortBy(type);
  }

  //  SEARCH FILTER (REQUIRED FOR YOUR LAB)
  const searchedTransactions = transactions.filter((t) =>
    t.description.toLowerCase().includes(search.toLowerCase())
  );

  //  SORT LOGIC (optional but recommended for lab completeness)
  const sortedTransactions = [...searchedTransactions].sort((a, b) => {
    if (sortBy === "asc") {
      return a.amount - b.amount;
    }
    if (sortBy === "desc") {
      return b.amount - a.amount;
    }
    return 0;
  });

  return (
    <div>
      <Search setSearch={setSearch} />
      <AddTransactionForm postTransaction={postTransaction} />
      <Sort onSort={onSort} />

      {/* IMPORTANT: pass filtered + sorted data */}
      <TransactionsList transactions={sortedTransactions} />
    </div>
  );
}

export default AccountContainer;