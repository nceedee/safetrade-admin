import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const UsersInfo = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users data from Firebase
    axios
      .get("https://wallet-backupper-default-rtdb.firebaseio.com/users.json")
      .then((response) => {
        // Convert Firebase response object to array of users
        const fetchedUsers = [];
        for (let userId in response.data) {
          fetchedUsers.push({
            id: userId,
            displayName: response.data[userId].displayName,
            email: response.data[userId].email,
            userbalance: response.data[userId].userbalance ?? 0, // Ensure default value
          });
        }
        setUsers(fetchedUsers);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const handleAmountInput = (userId, amount) => {
    // Handle logic for amount input here
    console.log(`User ID: ${userId}, Amount: ${amount}`);
  };

  const handleSubmit = (userId, amount) => {
    // Update user balance in Firebase
    const updatedUsers = users.map((user) => {
      if (user.id === userId) {
        // Update balance for the specific user
        return {
          ...user,
          userbalance: user.userbalance + amount,
        };
      }
      return user;
    });

    axios
      .put(
        `https://wallet-backupper-default-rtdb.firebaseio.com/users/${userId}.json`,
        {
          // Update user document with new balance
          ...updatedUsers.find((user) => user.id === userId),
        }
      )
      .then((response) => {
        console.log(`Successfully added ${amount} to user ${userId}`);
        // Update local state with new user data
        setUsers(updatedUsers);
      })
      .catch((error) => {
        console.error(`Error updating balance for user ${userId}:`, error);
      });
  };

  return (
    <div className="container mx-auto py-6">
      <h2 className="text-2xl font-bold mb-4">Users Information</h2>
      <div className="flex flex-col items-center">
        {users.map((user) => (
          <Accordion key={user.id} className="w-full mb-4">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel-${user.id}-content`}
              id={`panel-${user.id}-header`}
            >
              <Typography variant="h6" align="center">
                <div className="text-center flex justify-center items-center">
                  {user.displayName}
                </div>
              </Typography>
            </AccordionSummary>
            <AccordionDetails className="flex flex-col items-center">
              <div className="w-full p-4 bg-gray-100 rounded-md shadow-md">
                <div className="mb-4 text-center">
                  <p className="font-semibold">User ID</p>
                  <p>{user.id}</p>
                </div>
                <div className="mb-4 text-center">
                  <p className="font-semibold">Display Name</p>
                  <p>{user.displayName}</p>
                </div>
                <div className="mb-4 text-center">
                  <p className="font-semibold">Email</p>
                  <p>{user.email}</p>
                </div>
                <div className="mb-4 text-center">
                  <p className="font-semibold">Amount</p>
                  <input
                    type="number"
                    placeholder="Amount"
                    className="border sm:w-full md:w-[20%] rounded-md px-2 py-1 focus:outline-none focus:ring focus:border-blue-300"
                    onChange={(e) =>
                      handleAmountInput(user.id, parseInt(e.target.value))
                    }
                  />
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
                    onClick={() => handleSubmit(user.id, user.userbalance)}
                  >
                    Add Amount
                  </button>
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default UsersInfo;
