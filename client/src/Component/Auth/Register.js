/** @format */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });
  const { name, email, password, password2 } = formData;
  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (password !== password2) {
      console.log('Password2 does not match');
    } else {
      // const newUser = {
      //  name,email,password
      // };
      // try {
      //   const config = {
      //     headers: {
      //       'Content-type':'application/json'
      //     }
      //   }
      //   const body = JSON.stringify(newUser)
      //   const res = await Axios.post('/api/users', body, config)
      //   console.log(res.data);
        
      // } catch (error) {
      //   console.log(error.response.data.data.error);
      // }
      console.log(formData);
    }
  };
  return (
    <>
      <h1 className='large text-primary'>Sign Up</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Create Your Account
      </p>
      <form className='form' onSubmit={onSubmitHandler}>
        <div className='form-group'>
          <input type='text' placeholder='Name' name='name' required value={name} onChange={onChangeHandler} />
        </div>
        <div className='form-group'>
          <input type='email' placeholder='Email Address' name='email' value={email} onChange={onChangeHandler} />
          <small className='form-text'>
            This site uses Gravatar so if you want a profile image, use a Gravatar email
          </small>
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            minLength='6'
            value={password}
            onChange={onChangeHandler}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirm Password'
            name='password2'
            minLength='6'
            value={password2}
            onChange={onChangeHandler}
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Register' />
      </form>
      <p className='my-1'>
        Already have an account? <Link to='/login'>Sign In</Link>
      </p>
    </>
  );
};

export default Register;
