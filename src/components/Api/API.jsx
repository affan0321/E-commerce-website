export const getSingleProduct = ()=>{
    return fetch('https://dummyjson.com/products/50')
    .then(res => res.json())
}

export const getAnotherProduct = () => { 
    return fetch('https://dummyjson.com/products/51') 
    .then(res => res.json()); };



export const getProductByCategory = (Category)=>{
    return fetch(`https://dummyjson.com/products/category/${Category}`)
    .then(res => res.json())
    
}

export const addToCart =  (id)=>{
   return fetch('https://dummyjson.com/carts/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            userId: 1,
            products: [
                {
                    id: id,
                    quantity: 4,
                },
            ]
        })
    });
     
      
}
