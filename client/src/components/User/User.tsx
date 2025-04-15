import React from "react";
import { useAuth } from "@context/AuthContext";
import Profile from "@components/Profile/Profile";

function User() {
  const { userStatus } = useAuth();

  return (
    <div>
      {userStatus ? (
        <div>
          <Profile />
        </div>
      ) : (
        <div>NOT FOUND !!</div>
      )}
    </div>
  );
}

export default User;
