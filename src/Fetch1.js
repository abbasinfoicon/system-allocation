import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const authService = require('../src/authService');

// const BASE_URL = 'http://localhost:3001/api/';
const BASE_URL = 'https://cooperative-erin-slacks.cyclic.app/api/';


export const get = async(url,headers) => {
  //const navigate = useNavigate();
    try {
        const response = await fetch(BASE_URL+url, headers);
        
        const data =  await response.json();
        if(data.token_status){
          authService.logout();
          //navigate('/login');
          window.location.href = "/login";
        }else{
          return data;
        }
        
    }catch(e){
        return JSON.stringify(e);
    }
}

export const post = async(url,headers) => {
    try {
        const response = await fetch(BASE_URL+url,headers); 
        const data =  await response.json();
        if(data.token_status){
          authService.logout();
          //navigate('/login');
          window.location.href = "/login";
        }else{
          return data;
        }      
    }catch(e){
        return JSON.stringify(e);
    }
}

export const put = async(url,headers) => {
    try {
        const response = await fetch(BASE_URL+url, headers);
        const data =  await response.json();
        if(data.token_status){
          authService.logout();
          //navigate('/login');
          window.location.href = "/login";
        }else{
          return data;
        }
    }catch(e){
        return JSON.stringify(e);
    }
}