"use client"

import Image from "next/image";
import styles from "./page.module.css";
import React, { useState } from 'react';
import Cookies from "js-cookie";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
    const [message, setMessage] = useState()
    const [info,setInfo] = useState()
    const { push } = useRouter();
    const token = Cookies.get('token')

    useEffect(() => {
    if (!token){
      console.log(token)
      push("auth/")
    } else {
        if(message){
            return (
                <div>
                    <h1>{ message }</h1>
                </div>
            )
        } else {
            fetch("http://localhost:3000/user/",{
                method:"GET",
                headers:{
                    key:token
                }
            }).then((userDb)=>{
                return userDb.json()
            }).then((user)=>{
                if(user.status != 200){
                  setMessage(user.message)
                } else {
                  setInfo(user.user)
                }
            })
        }
    }
  }, [])
    
    return (
        <main>
          {info && 
            <form action="http://localhost:3000/product" method='POST' encType="multipart/form-data">
              <input name="key" value={info.sshKey} hidden/>
                <div>
                    <input type="text" name="name"/>
                </div>
                <div>
                    <input type="number" name="price"/>
                </div>
                <div>
                    <input type="text" name="description"/>
                </div>
                <div>
                    <input type="number" name="categoryId"/>
                </div>
                <div>
                    <input type="file" name="file"/>
                </div>
               
                <button method="submit">Send</button>
            </form>
            }
        </main>
    )
    

}
