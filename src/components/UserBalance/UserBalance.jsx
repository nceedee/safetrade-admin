import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios for HTTP requests

const UserBalance = () => {
  const [uid, setUid] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [currentBalance, setCurrentBalance] = useState(null); // State for current balance

  // Function to fetch the current balance for a specific UID
  const fetchCurrentBalance = async (uid) => {
    try {
      const response = await axios.get(
        `https://qfsworldsecurityledger-default-rtdb.firebaseio.com/userbalance/${uid}.json`
      );

      if (response.data) {
        // Assuming the latest transaction has the latest balance
        const transactions = Object.values(response.data);
        const latestTransaction = transactions[transactions.length - 1];
        setCurrentBalance(latestTransaction.amount || 0);
      } else {
        setCurrentBalance(0); // Set balance to 0 if no data found
      }
    } catch (error) {
      console.error("Error fetching balance:", error);
      setCurrentBalance(null); // Handle error state if necessary
    }
  };

  // Fetch the current balance whenever the UID changes
  useEffect(() => {
    if (uid) {
      fetchCurrentBalance(uid);
    } else {
      setCurrentBalance(null); // Reset balance if UID is cleared
    }
  }, [uid]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation, assuming amount is numeric
    if (!uid || !amount || isNaN(amount)) {
      alert("Please enter valid UID and numeric amount.");
      return;
    }

    setLoading(true);

    // Convert amount to number
    const numericAmount = parseFloat(amount);

    try {
      // Perform HTTP POST request to update balance
      const response = await axios.post(
        `https://qfsworldsecurityledger-default-rtdb.firebaseio.com/userbalance/${uid}.json`,
        {
          // Use the new balance directly
          amount: numericAmount,
        }
      );

      // Handle success response
      if (response.status === 200) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 1000);

        // Update current balance after successful update
        fetchCurrentBalance(uid);

        // Clear form inputs after successful update
        setAmount("");
      }
    } catch (error) {
      console.error("Error updating balance:", error);
      // Handle error state if necessary
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            User UID:
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="User UID"
              value={uid}
              onChange={(e) => setUid(e.target.value)}
              required
            />
          </label>
        </div>
        {currentBalance !== null && (
          <p className="text-gray-700 text-sm mb-4">
            Current Balance: {currentBalance}
          </p>
        )}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Amount:
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="flex items-center justify-between">
          <button
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            type="submit"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Balance"}
          </button>
          {success && (
            <p className="text-green-500 text-sm">
              Balance updated successfully!
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default UserBalance;
