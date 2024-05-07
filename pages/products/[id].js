import Image from "next/image";
import React, { useState } from 'react';
import { useRouter } from 'next/router'

export default function Home() {
  const [prod, setProd] = useState([])
  const router = useRouter()
  const query = Number(router.query.id)

  if (query < 0 || `${query}` == 'NaN'){
    return (
      <div>
        <h1>NOT FOUND 404</h1>
      </div>
    )
  }

  function fetchProd(){
    fetch(`http://localhost:3000/products/${query}`, {method : "GET"})
      .then((response)=>{
          return response.json()
      }).then((data)=>{
          console.log(data)
          setProd(data.products)
      })
  }
  if(!prod){
    return(
        <div>
            <h1>NOT FOUND 404</h1>
        </div>
    )
  }
  if (prod.length < 1){
    fetchProd()
  }
  
  return (
      <main>
          { prod.length > 0 && 
            prod.map((product, idx) => {
                return (
                  <div key={idx}>
                    <Image loader={()=>`http://localhost:3000/public/${product.prodImage}`} src={`http://localhost:3000/public/${product.prodImage}`} width={500} height={500}  />
                    <h1>{product.name}</h1>
                  </div>
                ) 
            })
          }
      </main>
  )
}