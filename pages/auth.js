import Image from "next/image";
import React, { useState } from 'react';
import Cookies from "js-cookie";
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '@/static/auth.css';

export default function Auth() {
  const { push } = useRouter();

  const [errText,setErrText] = useState("")
  const [formData, setFormData] = useState({
    email: '',
    password: ''
   });

  const LoginButton = async () => {
    console.log(formData)
    const response = await fetch("http://localhost:3000/userCheck", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        email:formData.email,
        password:formData.password
      }
    });
    const data = await response.json();
    if(data.status == 404){
      console.log(errText) 
      setErrText(data.message)
    } else {
      Cookies.set("token",data.user.sshKey)
      console.log(data)
    } 
  }
  useEffect(() => {
    let token = Cookies.get('token')
    if (token){
      push("/products")
    }
  }, []);

  const handleChange = (e) => {
    const inputName = e.target.name
    const inputValue = e.target.value
    setFormData(prevValue => ({
        ...prevValue,
        [inputName]: inputValue
    }))
  }

  return (

    <form method="POST" className="authForm"> 
    <Image src={`https://i.ibb.co/qrzZwwB/Logo.png`} width={274} height={274}  />
      <h1 style={{fontSize: 50}}>Привіт!</h1> 
      <div className="fields">
        <div className="field">
          
          <input type="email" id="email" placeholder="Email" onChange={handleChange} name = "email" required/>
        </div>
        <div className="passField">
          <div className="field">
           
            <input type="password" id="passInput" placeholder="Пароль" onChange={handleChange} name="password" required/>
          </div>
        </div>
      </div>
        <button type="button" onClick={LoginButton} className="submitButton">
            Увійти
           
        </button>
        <div className="redirectButton">
            <span>Немає аккаунту?</span>
            <a href="http://localhost:3001/reg/">Створи</a>
        </div>
    </form>
  );
}