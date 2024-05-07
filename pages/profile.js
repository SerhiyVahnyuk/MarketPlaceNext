import Image from "next/image";
import React, { useState } from 'react';
import Cookies from "js-cookie";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Profile() {
    const [message, setMessage] = useState()
    const token = Cookies.get('token')
    const [prod,setProd] = useState()
    const [info,setInfo] = useState()
    const { push } = useRouter();
    
    useEffect(() => {
        if (!token){
            console.log(token)
            push("profile/")
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
                    fetch("http://localhost:3000/user/products/",{
                        method:"GET",
                        headers:{
                            key:token
                        }
                    }).then((productsDb)=>{
                        return productsDb.json()
                    }).then((products)=>{
                        if(products.status > 200){
                            setMessage(products.message)
                        } else {
                            setProd(products.products)
                            console.log(products)
                        }
                    })
                })
            }
        }
    }, [])

    function deleteProduct(e){
        fetch(`http://localhost:3000/product/${e.target.value}`,{
            method:"DELETE",
            headers:{
                key:token
            }
        }).then(()=>{
            push("products/")
        })
    }

    return (
        <main>
            { message }
            {info && 
                <div>
                    <p>Name: {info.name}</p>
                    <p>City: {info.city}</p>
                </div>
            }
            {prod && 
                <div>
                    {prod.map((product, idx) => {
                        return (
                            <div key={idx}>
                                <Image loader={()=>`http://localhost:3000/public/${product.prodImage}`} src={`http://localhost:3000/public/${product.prodImage}`} width={500} height={500}  />
                                <h1>{product.name}</h1>
                                <button type="button" onClick={deleteProduct} value={product.id}>DELETE</button>
                            </div>
                        ) 
                    })}
                </div>
            }
        </main>
    );
}