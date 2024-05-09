import Image from "next/image";
import React, { useState } from 'react';

export default function Home() {
  const [prod, setProd] = useState([])

  function fetchProd(){
    fetch("https://markerplace.onrender.com/products", {method : "GET"})
      .then((response)=>{
          return response.json()
      }).then((data)=>{
          console.log(data)
          setProd(data.products)
      })
  }

  if (prod.length < 1){
    fetchProd()
  }
  
  return (
      <main>
          {prod.length > 0 &&
            <div>
              {prod.map((product, idx) => {
                return (
                  <div key={idx}>
                    <Image loader={()=>`https://markerplace.onrender.com/public/${product.prodImage}`} src={`https://markerplace.onrender.com/public/${product.prodImage}`} width={500} height={500}  />
                    <h1>{product.name}</h1>
                  </div>
                ) 
              })}
            </div>
          }
      </main>
  )
}
