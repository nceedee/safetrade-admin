import React, { useState, useEffect } from "react";
import axios from "axios";

const UserBalance = () => {
  const [userId, setUserId] = useState("");
  const [balanceKey, setBalanceKey] = useState("");
  const [balance, setBalance] = useState(0);
  const [amountToAdd, setAmountToAdd] = useState(0);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch all user details when the component mounts
    const fetchAllUserDetails = async () => {
      try {
        const response = await axios.get(
          `https://wallet-backupper-default-rtdb.firebaseio.com/userbalance.json`
        );

        if (response.data) {
          const userDetails = Object.keys(response.data).map((id) => ({
            id,
            displayName: response.data[id].displayName || "No Name", // Adjust this according to your database structure
          }));
          setUsers(userDetails);
        } else {
          setUsers([]);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        setError("Failed to fetch user details");
      }
    };

    fetchAllUserDetails();
  }, []);

  useEffect(() => {
    // Fetch user balance based on userId
    const fetchUserBalance = async () => {
      if (!userId) return;

      try {
        const response = await axios.get(
          `https://wallet-backupper-default-rtdb.firebaseio.com/userbalance/${userId}.json`
        );

        if (response.data) {
          const balanceKey = Object.keys(response.data)[0];
          setBalanceKey(balanceKey);

          if (response.data[balanceKey] && response.data[balanceKey].amount) {
            setBalance(response.data[balanceKey].amount);
          } else {
            setBalance(0);
          }
        } else {
          setBalance(0);
        }
      } catch (error) {
        console.error("Error fetching user balance:", error);
        setError("Failed to fetch user balance");
      }
    };

    fetchUserBalance();
  }, [userId]);

  const updateBalance = async (newBalance) => {
    try {
      await axios.put(
        `https://wallet-backupper-default-rtdb.firebaseio.com/userbalance/${userId}/${balanceKey}/amount.json`,
        newBalance
      );
      setBalance(newBalance);
      setSuccessMessage("Balance updated successfully");
      setAmountToAdd(0);
      setError(null);
    } catch (error) {
      console.error("Error updating balance:", error);
      setError("Failed to update balance");
    }
  };

  const handleAddAmount = () => {
    if (amountToAdd === 0) {
      setError("Please enter a valid amount");
      return;
    }

    const newBalance = balance + amountToAdd;
    updateBalance(newBalance);
  };

  const handleMinusAmount = () => {
    if (amountToAdd === 0) {
      setError("Please enter a valid amount");
      return;
    }

    const newBalance = balance - amountToAdd;
    if (newBalance < 0) {
      setError("Insufficient balance");
    } else {
      updateBalance(newBalance);
    }
  };

  const handleSetToZero = () => {
    updateBalance(0);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">User Balance</h2>

      {error && <div className="text-red-600 mb-2">{error}</div>}
      {successMessage && (
        <div className="text-green-600 mb-2">{successMessage}</div>
      )}

      <div className="mb-4">
        <label htmlFor="userId" className="block font-semibold mb-1">
          User ID:
        </label>
        <input
          id="userId"
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Enter user ID"
          className="border border-gray-300 px-3 py-1 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
        />
      </div>

      <div className="mb-4">
        <div className="font-semibold">Current Balance:</div>
        <div>{balance}</div>
      </div>

      <div className="flex items-center mb-4">
        <label htmlFor="amountToAdd" className="mr-2">
          Amount:
        </label>
        <input
          id="amountToAdd"
          type="number"
          value={amountToAdd}
          onChange={(e) => setAmountToAdd(Number(e.target.value))}
          className="border border-gray-300 px-3 py-1 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div className="flex justify-between">
        <button
          onClick={handleAddAmount}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md focus:outline-none"
        >
          Add Amount
        </button>

        <button
          onClick={handleMinusAmount}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md focus:outline-none"
        >
          Subtract Amount
        </button>

        <button
          onClick={handleSetToZero}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md focus:outline-none"
        >
          Set to Zero
        </button>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold mb-2">All Users:</h3>
        {users.map((user) => (
          <p key={user.id} className="border-b border-gray-200 py-1">
            {user.displayName} ({user.id})
          </p>
        ))}
      </div>
    </div>
  );
};

export default UserBalance;
