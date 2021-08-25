import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useForm } from "react-hook-form";
import Auth from "../common/helper/auth";
import Loader from "../components/loader";
import styles from '../styles/login.module.scss';
import { loginApi } from '../api';

const Login = (props) => {
  const [loading, setLoading] = useState(false);

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
    loginApi({      
      email: values.email,
      password: values.password
    })
    .then((response) => {
      setLoading((prevState) => !prevState);
      Auth.login(() => {
        props.history.push('/profile');            
      }, response.data.token)
    })
    .catch((err) => {
      setLoading((prevState) => !prevState);
    })
  }

    return (
        <div className={styles.loginFormContainer}>
          <form onSubmit={handleSubmit(onSubmit)}>
          <div >
          <input className="todo-input" type='email' name='email' {...register("email", { required: true })} placeholder="E-mail" />
          {errors.email && <p>'Required'</p>}
          </div>
          <div>
          <input className="todo-input" type='password' name='password' {...register("password", {minLength:6,validate:value=>!(value.split('').every((char)=>isNaN(char))) &&  (value.includes('!')|| value.includes('@') || value.includes('#') || value.includes('$'))})} placeholder="password" />
          {errors.password && <p>'password should be minimum of 6 charecter, atleast a special charecter and a number'</p>}
          </div>
          <button className="todo-btn" type='submit'>LOGIN</button>
          </form>
          <span>Don't have an account?<Link to="/registration"> Sign up</Link></span>
          { loading && <Loader /> }
        </div>
    );
  }
  
  export default Login;
  