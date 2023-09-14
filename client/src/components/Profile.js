import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (!userString) {
      console.error("User data not found in localStorage.");
      navigate("/login");
    } else {
      try {
        const user = JSON.parse(userString);
        console.log("User data retrieved from localStorage:", user);
        setUserInfo(user);
      } catch (error) {
        console.error("Error parsing user data:", error);
        navigate("/login");
      }
    }
  }, [navigate]);

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div>
      <h2>User Profile</h2>
      <p>Username: {userInfo.username}</p>
      <p>First Name: {userInfo.first_name}</p>
      <p>Last Name: {userInfo.last_name}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;
