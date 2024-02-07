import React, { useState, useEffect } from 'react';
import profileImage from './static/i.png';
import Menu from '../components/menu';
import Loader from '../components/loader';
import './styles/profile.scss';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const navigate = useNavigate();
  const [authChecked, setAuthChecked] = useState(false);

  const [userInfo] = useState({
    username: localStorage.getItem("email"),
  });


  const [isMobileView] = useState(window.innerWidth <= 768);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem('email');
    localStorage.removeItem('userId');
    alert("Log out was successful.");
    navigate("/");
    return;
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You are not authenticated. Please log in.");
      navigate("/log-in");
      return;
    }

    const fetchUserData = async () => {
      // Replace with the actual endpoint to fetch user data
      const API_BASE_URL_USER_DATA = `${process.env.REACT_APP_API_URL}api/users/${localStorage.getItem("userId")}`;

      try {
        const response = await fetch(API_BASE_URL_USER_DATA, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 401) {
          // Token is expired or invalid
          localStorage.removeItem("token");
          localStorage.removeItem('email');
          localStorage.removeItem('userId');
          alert("Your session has expired. Please log in again.");
          navigate("/log-in");
          return;
        }

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log(data); // Process and set the user data as needed
        setAuthChecked(true); 
      } catch (error) {
        console.error("There was an error fetching user data:", error);
      }
      finally {
        setAuthChecked(true); 
      }
    };

    fetchUserData();
  }, [navigate]);

  if (!authChecked) {
    return <Loader></Loader>;
  }

  return (
    <div className="profile-page-container">
    {!isMobileView && <Menu active="profile" />}
    <div className="profile-container">
        <table className="profile-table">
          <tbody>
            <tr>
              <td className="profile-picture">
                <img src={profileImage} alt="Profile" className="profile-picture-border" />
              </td>
            </tr>
            <tr>
              <td className="profile-username">
                <span className="username-label">
                  {userInfo.username}
                </span>
              </td>
            </tr>
            <tr></tr>
            <tr>
              <td className="profile-label">Name:</td>
            </tr>
            <tr>
              <td className="profile-info">
              {userInfo.username}
              </td>
            </tr>
            <tr>
              <td colSpan="2" className="edit-button-container">
                <button
                  className="edit-button"
                  onClick={handleLogout}
                  style={{
                    backgroundColor: '#424242', // Set the background color to #424242
                    color: '#CAFF5A',
                    borderRadius: '5px',
                    marginTop: '20px',
                    width: '100%', // Make the button as wide as the table
                  }}
                >
                  {'Log out'}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Profile;
