import { useEffect } from "react"
import { useState } from "react"
import './assets/app.css'


function App() {

  const [products, setProducts] = useState([]);
  const [input, setInput] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await fetch(
          'https://api.vendoo.ge/api/beta/catalog?url=technics%2Ftelefonebi%2Fmobiluri-telefonebi&sort=popular&sortDir=desc&page=1&limit=20'
        );
        const dataJson = await response.json();
        setProducts(dataJson.products);
      } catch(err) {
      console.log(err.message);
    }  
  }

    // Calling fetchData to get API
    fetchData();

  }, []);


  const getProducts = () => {
    return(
      <div className="products">
        {products?.map((product) => {
          // Get Products with Discount
          if(product.original_price !== product.final_price){

            // Filtering Products By Name
            if(product.name.toLowerCase().includes(input.toLowerCase())){
              return(
                // Showing Products 
                showProducts(product)
              )
            }
          }
        })}
      </div>
    )
}
  

  const showProducts = (product) => {
    return(
      <div key={product.id} className="product">
        <img className="product-image" src={product.thumb_img.files.file}/>
        <div className="product-price">
          <div className="product-final-price">{`${product.final_price}₾`}</div>
          <div className="product-original-price">{`${product.original_price}₾`}</div>
          <div className="product-price-persentage">{
            `-
            ${Math.ceil(100 - (product.final_price * 100 / product.original_price))}
            %`}
          </div>
        </div>
        <div className="product-name">{product.name}</div>
      </div>
    )
    
  }


  return (
    <>
      <form>
        <label>
          <input className="mobile-filter" placeholder="Search Mobile" onChange={(e) => setInput(e.target.value)}></input>
        </label>
      </form>
      {getProducts()}  
    </>
  )
}

export default App
