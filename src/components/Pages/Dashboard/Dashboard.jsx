// Dashboard.js
import React from "react";
import UserBalance from "../../UserBalance/UserBalance";
import BackedUp from "../../Backedup/Backedup";
import UsersInfo from "../../UsersInfo/UsersInfo";

function Dashboard() {
  return (
    <div>
      <UsersInfo />
      <UserBalance />
      <BackedUp/>
    </div>
  );
}

export default Dashboard;
