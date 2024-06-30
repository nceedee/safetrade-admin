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
    const fetchUsersAndBalances = async () => {
      try {
        const usersResponse = await axios.get(
          "https://wallet-backupper-default-rtdb.firebaseio.com/users.json"
        );

        if (usersResponse.data) {
          const fetchedUsers = Object.keys(usersResponse.data).map((userId) => ({
            id: userId,
            ...usersResponse.data[userId],
          }));

          console.log("Mapped users:", fetchedUsers);

          const usersWithBalances = await Promise.all(
            fetchedUsers.map(async (user) => {
              const nestedIds = Object.keys(user).filter((key) => key !== "id");

              let finalUserDetails = { ...user };

              for (let i = 0; i < nestedIds.length; i++) {
                const nestedId = nestedIds[i];
                const nestedResponse = await axios.get(
                  `https://wallet-backupper-default-rtdb.firebaseio.com/users/${user.id}/${nestedId}.json`
                );

                finalUserDetails = {
                  ...finalUserDetails,
                  ...nestedResponse.data,
                };
              }

              return finalUserDetails;
            })
          );

          console.log("Users with balances:", usersWithBalances);
          setUsers(usersWithBalances);
        } else {
          console.log("No users data available.");
        }
      } catch (error) {
        console.error("Error fetching users and balances:", error);
      }
    };

    fetchUsersAndBalances();
  }, []);

  const handleAmountInput = (userId, amount) => {
    console.log(`User ID: ${userId}, Amount: ${amount}`);
    // Handle logic for amount input here
  };

  const handleAddAmount = (userId, amount) => {
    console.log(`Adding ${amount} to user ${userId}`);
    // Implement logic to add amount to user balance
  };

  const handleMinusAmount = (userId, amount) => {
    console.log(`Deducting ${amount} from user ${userId}`);
    // Implement logic to deduct amount from user balance
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
                {user.displayName}
              </Typography>
            </AccordionSummary>
            <AccordionDetails className="flex flex-col items-center">
              <div className="w-full p-4 bg-gray-100 rounded-md shadow-md">
                <div className="mb-4 text-center">
                  <p className="font-semibold">User ID</p>
                  <p>{user.userid}</p>
                </div>
                <div className="mb-4 text-center">
                  <p className="font-semibold">Display Name</p>
                  <p>{user.displayName}</p>
                </div>
                <div className="mb-4 text-center">
                  <p className="font-semibold">Email</p>
                  <p>{user.email}</p>
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
