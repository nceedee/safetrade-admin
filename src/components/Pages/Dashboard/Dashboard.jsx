// Dashboard.js
import React from "react";
import UserBalance from "../../UserBalance/UserBalance";
import UsersInfo from "../../UsersInfo/UsersInfo";

function Dashboard() {
  return (
    <div>
      <UsersInfo />
      <UserBalance />
    </div>
  );
}

export default Dashboard;
