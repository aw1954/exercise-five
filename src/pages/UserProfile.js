import React from "react";

function UserProfile({ userInformation }) {
    return (
        <div>
            <h1>User Profile</h1>
            <p>EMAIL: {userInformation.email}</p>
            <p>NAME: {userInformation.displayName}</p>
            <p>UID: {userInformation.uid}</p>
        </div>
    );
}

export default UserProfile;