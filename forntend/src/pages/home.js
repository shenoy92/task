import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import styles from '../styles/home.module.scss';
import Auth from "../common/helper/auth";

const Home = (props) => {
    useEffect(() => {
        if(Auth.isAuthenticated()) {
          Auth.login(() => {
            props.history.push('/profile');
          })
        }
      },[]);
    
    return (
        <div className={styles.homeContainer}>
            <div className={styles.homeWrapper}>
                <h1>Welcome to home page</h1>
                <div className={styles.linksContainer}>
                    <Link to="/login"> Login </Link>
                    <Link to="/registration"> Registration </Link>
                </div>
            </div>
        </div>
    )
}

export default Home
