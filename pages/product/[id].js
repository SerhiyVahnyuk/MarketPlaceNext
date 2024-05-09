import Image from "next/image";
import React, { useState } from 'react';
import { useRouter } from 'next/router'

export default function Home() {
  const [prod, setProd] = useState()
  const router = useRouter()
  const query = Number(router.query.id)
  const [message, setMessage] = useState()

  if (query < 0 || `${query}` == 'NaN'){
    return (
      <div>
        <h1>NOT FOUND 404</h1>
      </div>
    )
  }

  function fetchProd(){
    fetch(`https://markerplace.onrender.com/product/${query}`, {method : "GET"})
      .then((response)=>{
          return response.json()
      }).then((data)=>{
          console.log(data)
          setProd(data.product)
          if(data.status!=200){
            setMessage(data.message)
          }
      })
  }
  if(!prod){
    new Promise(async (resolve,reject)=>{
        await fetchProd()
    }).then(()=>{
        if (!prod){
            <div>
                <h1>NOT FOUND 404</h1>
            </div>
        } else {
            console.log(prod)
        }
    })
    
  }
  
  return (
    <main>
        {message}
        { prod &&
            <div>
                <Image loader={()=>`https://markerplace.onrender.com/public/${prod.prodImage}`} src={`https://markerplace.onrender.com/public/${prod.prodImage}`} width={500} height={500}  />
                <p>{prod.name}</p>
                <p>{prod.price}</p>
                <p>{prod.description}</p>
            </div>
        }
    </main>
  )
}
