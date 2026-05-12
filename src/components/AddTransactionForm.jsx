import React, { useState } from "react";

function AddTransactionForm({ addTransaction }) {
  const [formData, setFormData] = useState({
    date: "",
    description: "",
    category: "",
    amount: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    // 🔒 Prevent crash if form fields are missing
    const newTransaction = {
      date: formData.date || "",
      description: formData.description || "",
      category: formData.category || "",
      amount: parseFloat(formData.amount) || 0,
    };

    fetch("http://localhost:6001/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTransaction),
    })
      .then((res) => res.json())
      .then((data) => {
        // 🔒 Prevent crash if prop not passed in some test renders
        if (typeof addTransaction === "function") {
          addTransaction(data);
        }

        // reset form
        setFormData({
          date: "",
          description: "",
          category: "",
          amount: "",
        });
      })
      .catch((err) => {
        console.error("Failed to add transaction:", err);
      });
  }

  return (
    <form className="ui form" onSubmit={handleSubmit}>
      <div className="inline fields">
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
        />

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          step="0.01"
          value={formData.amount}
          onChange={handleChange}
        />
      </div>

      <button className="ui button" type="submit">
        Add Transaction
      </button>
    </form>
  );
}

export default AddTransactionForm;