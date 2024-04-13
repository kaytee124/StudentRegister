import React from 'react';

const Profile = () => {
  const userName = () => {
    return localStorage.getItem('s');
  };

  return (
    <div className='header'>
      <p>Welcome {userName()}</p>
    </div>
  );
};

export default Profile;
