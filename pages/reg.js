"use client"

import Image from "next/image";
import { useState } from "react";
import Cookies from "js-cookie";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Reg() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    city: '',
    password: '',  
    confirmPassword:''
   });
  const { push } = useRouter();


   useEffect(() => {
    let token = Cookies.get('token')
    if (token){
      push("/")
    }
  }, []);

  const RegisterButton = async () => {
    console.log(formData)
    if (formData.password == formData.confirmPassword){
      const response = await fetch("https://markerplace.onrender.com/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.username,
          email: formData.email,
          phone: formData.phone,
          city: formData.city,
          password: formData.password,
        }),
      });
      const data = await response.json();
      console.log(data)
      Cookies.set("token",data.key)
    }
  }

  const handleChange = (e) => {
    const inputName = e.target.name
    const inputValue = e.target.value
    setFormData(prevValue => ({
        ...prevValue,
        [inputName]: inputValue
    }))
  }

  console.log(formData)
  return (
    <form method="POST" className="registerForm"> 
      <h1 style={{fontSize: 50}}>Створити акаунт</h1> 
      <div className="fields">
        <div className="field">
          
          <input type="text" id="username" placeholder="Ім'я користувача" onChange={handleChange} name = "username" required/>
        </div>
        <div className="emailField">
          <div className="field">
           
            <input type="email" id="emailInput" placeholder="Електронна адреса" onChange={handleChange} name="email" required/>
          </div>
        </div>
        <div className="phoneField">
          <div className="field">
           
            <input type="number" id="phoneInput" placeholder="Номер телефону" onChange={handleChange} name="phone" required/>
          </div>
        </div>
        <div className="cityField">
          <div className="field">
           
            <input type="text" id="cityInput" placeholder="Місто проживання" onChange={handleChange} name="city" required/>
          </div>
        </div>
        <div className="passField">
          <div className="field">
           
            <input type="password" id="passInput" placeholder="Пароль" onChange={handleChange} name="password" required/>
          </div>
        </div>
        <div className="passField">
          <div className="field">
    
            <input type="password" id="pconfPassInput" placeholder="Підтвердіть пароль" onChange={handleChange} name="confirmPassword" required/>
          </div>
        </div>
      </div>
        <button type="button" onClick={RegisterButton} className="submitButton">
            Зареэструватись
        </button>
        <div className="redirectButton">
            <span>Вже є акаунт?</span>
            <a href="/auth">Увійди</a>
        </div>
    </form>
    
     
  );
}
