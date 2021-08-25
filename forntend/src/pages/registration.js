import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import FileBase from 'react-file-base64';

import Auth from "../common/helper/auth";
import styles from '../styles/login.module.scss';
import Loader from "../components/loader";
import { registerationApi } from '../api';

const Registration = (props) => {
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState('');

  useEffect(() => {
    if(Auth.isAuthenticated()) {
      Auth.login(() => {
        props.history.push('/profile');
      })
    }
  },[]);

  const { register, handleSubmit, formState: { errors }} = useForm();
  
  const onSubmit = (values) => {
    setLoading((prevState) => !prevState);
    registerationApi({ ...values,  selectedFile: profileImage})
    .then((response) => {
      setLoading((prevState) => !prevState);
      Auth.login(() => {
        props.history.push('/profile');
      },response.data.token)
    })
    .catch((err) => {
      setLoading((prevState) => !prevState);
    })
  }

    return (
      <div className={styles.loginFormContainer}>
      <form onSubmit={handleSubmit(onSubmit)}>
          <div >
          <label htmlFor="selectedFile">Select profile image:</label>
          <div className={styles.fileUpload}><FileBase id="selectedFile" type="file" multiple={false} name='selectedFile' onDone={({ base64 }) => { setProfileImage(base64); }} /></div>
          {profileImage && <img src={profileImage}/> }
          </div>
          <div >
          <input className="todo-input" type='text' name='userName' {...register("userName", { required: true })} placeholder="Name" />
          {errors.userName && <p>'Required'</p>}
          </div>
          <div >
          <input className="todo-input" type='text' name='age' {...register("age", { required: true })} placeholder="Age" />
          {errors.age && <p>'Required'</p>}
          </div>
          <div >
          <input className="todo-input" type='text' name='place' {...register("place", { required: true })} placeholder="State" />
          {errors.place && <p>'Required'</p>}
          </div>
          <div >
          <input className="todo-input" type='text' name='email' {...register("email", { required: true })} placeholder="E-mail" />
          {errors.email && <p>'Required'</p>}
          </div>
          <div>
          <input className="todo-input" type='password' name='password' {...register("password", {minLength:6,validate:value=>!(value.split('').every((char)=>isNaN(char))) &&  (value.includes('!')|| value.includes('@') || value.includes('#') || value.includes('$'))})} placeholder="password" />
          {errors.password && <p>'password should be minimum of 6 charecter, atleast a special charecter and a number'</p>}
          </div>
          <button className="todo-btn" type='submit'>Registration</button>
          </form>
        <span>You already have an account?<Link to="/login"> Login In</Link></span>
        { loading ? <Loader /> : null }
      </div>
    );
  }
  
  export default Registration;
  