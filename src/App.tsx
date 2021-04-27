import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from './config/firbase.config';
import log from './Util/Logger';
import { Switch } from 'react-router-dom'
import Header from './components/Header'

const App : FC = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      if(user){
        log('logged in')
      }else{
       log('logger out');
      }
    })
    return () => unsubscribeFromAuth();
  }, [])  ;
  
  return (
    <Header/>
  );
}

export default App;
