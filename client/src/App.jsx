import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [productData, setProductData] = useState([]);
  const [stateFetch, setStateFetch] = useState("Loading...")

  const getProductData = async () => {
    try{
      const response = await axios.get("http://localhost:4001/products");
      setProductData(response.data.data);
      setStateFetch("")
    }catch (error) {
      setStateFetch("Fetching Error...")
    }
  };

  const deleteProductData = async (id) => {
    try{
      await axios.delete(`http://localhost:4001/products/${id}`)
      const newProductData = productData.filter((item) => {
        return item.id !== id;
      })
      setProductData(newProductData);
    }catch (error) {
      setStateFetch("Fetching Error...")
    }
  }

  useEffect(() => {
    getProductData();
  }, []);

  if(stateFetch === "Loading..."){
    return (
      <h1>{stateFetch}</h1>
    )
  }else if(stateFetch === ""){
    return (
      <>
      <div className="App">
        <div className="app-wrapper">
          <h1 className="app-title">Products</h1>
        </div>
        {productData.map((item) => {
          return (
            <div className="product-list" key={item.id}>
              <div className="product">
                <div className="product-preview">
                  <img
                    src={item.image}
                    alt={item.name}
                    width="350"
                    height="350"
                  />
                </div>
                <div className="product-detail">
                  <h1>Product name: {item.name}</h1>
                  <h2>Product price: {item.price}</h2>
                  <p>Product description: {item.description}</p>
                </div>
  
                <button className="delete-button" onClick={() => deleteProductData(item.id)}>x</button>
              </div>
            </div>
          );
        })}
      </div>
      </>   
    );
  }else if(stateFetch === "Fetching Error..."){
    return (
      <h1>{stateFetch}</h1>
    )
  }
  
}

export default App;
