import './App.css';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

function App() {
  const onSuccess = (response) => {
    const token = response.credential;

    axios.post(`http://localhost:3132/login/google/${token}`)
      .then(resp => {
        console.log(resp);
      })
  };

  const onError = (error) => {
      console.log(error);
  };

  return (
    <div className="App">
      <div>
          <h2>React Google Login</h2>
          <br />
          <br />
          <GoogleLogin onSuccess={onSuccess} onError={onError} text="continue_with" />
      </div>
    </div>
  );
}

export default App;
