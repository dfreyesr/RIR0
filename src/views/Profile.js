import React, { useState, useEffect } from 'react';
import profileImage from './static/i.png';
import Menu from '../components/menu';
import './styles/profile.scss';

function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  const [userInfo, setUserInfo] = useState({
    username: 'lionelmessi10',
    name: 'Lionel Messi',
    bio: 'Es increíble pero no se me da',
    height: '1.70 mts',
    weight: '75 kgs',
  });

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


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
            <tr><br></br></tr>
            <tr>
              <td className="profile-label">Name:</td>
            </tr>
            <tr>
              <td className="profile-info">
                {isEditing ? (
                  <input
                    type="text"
                    value={userInfo.name}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, name: e.target.value })
                    }
                  />
                ) : (
                  userInfo.name
                )}
              </td>
            </tr>
            <tr>
              <td className="profile-label">Bio:</td>
            </tr>
            <tr>
              <td className="profile-info">
                {isEditing ? (
                  <input
                    type="text"
                    value={userInfo.bio}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, bio: e.target.value })
                    }
                  />
                ) : (
                  userInfo.bio
                )}
              </td>
            </tr>
            <tr>
              <td className="profile-label">Height:</td>
            </tr>
            <tr>
              <td className="profile-info">
                {isEditing ? (
                  <input
                    type="text"
                    value={userInfo.height}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, height: e.target.value })
                    }
                  />
                ) : (
                  userInfo.height
                )}
              </td>
            </tr>
            <tr>
              <td className="profile-label">Weight:</td>
            </tr>
            <tr>
              <td className="profile-info">
                {isEditing ? (
                  <input
                    type="text"
                    value={userInfo.weight}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, weight: e.target.value })
                    }
                  />
                ) : (
                  userInfo.weight
                )}
              </td>
            </tr>
            <tr>
              <td colSpan="2" className="edit-button-container">
                <button
                  className="edit-button"
                  onClick={toggleEditing}
                  style={{
                    backgroundColor: '#424242', // Set the background color to #424242
                    color: '#CAFF5A',
                    borderRadius: '5px',
                    marginTop: '20px',
                    width: '100%', // Make the button as wide as the table
                  }}
                >
                  {isEditing ? 'Save' : 'Edit'}
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
