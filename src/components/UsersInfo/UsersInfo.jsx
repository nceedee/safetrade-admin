import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { db } from "../../config/firebase"; // Adjust the path as per your project structure

const UsersInfo = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, "users");
        const usersSnapshot = await getDocs(usersCollection);
        const fetchedUsers = usersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(), // Spread other fields from user document
        }));

        console.log("Fetched users:", fetchedUsers);
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array ensures useEffect runs only once on component mount

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
                  <p>{user.userId}</p>
                </div>
                <div className="mb-4 text-center">
                  <p className="font-semibold">Display Name</p>
                  <p>{user.displayName}</p>
                </div>
                <div className="mb-4 text-center">
                  <p className="font-semibold">Email</p>
                  <p>{user.email}</p>
                </div>
                {/* Add other user details as needed */}
              </div>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default UsersInfo;
