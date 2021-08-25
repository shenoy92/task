import React, { useState, useEffect } from 'react';

import styles from '../styles/profile.module.scss';
import Auth from "../common/helper/auth";
import Loader from "../components/loader";
import { profileDataApi } from '../api';

const Profile = (props) => {
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getUserDetails();
    },[]);

    const getUserDetails = () => {
        setLoading((prevState) => !prevState);
        profileDataApi()
        .then((response) => {
          setLoading((prevState) => !prevState);
          setProfileData(response.data)
        })
        .catch((err) => {
          setLoading((prevState) => !prevState);
        })
      }

    const logout = () => {
        Auth.logout(() => {
            props.history.push('/');
        })
    }

    return (
        <div className={styles.profileContainer}>
            { profileData && <>
                <img src={profileData.selectedFile}/>
                <h2>{ profileData.userName }</h2>
                <p>Email: { profileData.email }</p>
                <p>Age: { profileData.age }</p>
                <p>Place: { profileData.place }</p>
                <button onClick={logout}>Logout</button>
            </> }
            { loading ? <Loader /> : null }
        </div> 
    )
}

export default Profile
