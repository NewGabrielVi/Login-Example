import React, { useEffect, useContext, useState } from "react";
import { AuthContext } from "../contexts/auth";
import { getUsers } from "../services/api"
import './Profile.css';
const Profile = () => {

    const { authenticated, logout, user } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
    }
    return (
        <>

            <header>
                <div className="Button-Top">
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </header>
            <div className="Profile">
                <div className="Profile-page">

                    <h1>Profile picture</h1>

                    <img className="Image-Profile" src={user.avatar.image_medium_url} />
                        <p id="Nothing">Your Name</p>
                        <p className="userName">{user.name} {user.last_name}</p>
                        <p id="Nothing">Your Email</p>
                        <p className="userEmail">{user.email}</p>
                </div>


            </div>
        </>
    );
};

export default Profile;