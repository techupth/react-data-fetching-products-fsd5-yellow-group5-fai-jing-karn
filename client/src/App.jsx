import "./App.css";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
//1) หา api ที่จะใช้
//Get: localhost:4000/posts
//2) สร้าง request ไปหา server (axios)
// ติดตั้ง axios
// - execute axios (useEffect, useState, async, ...)
//3)นำข้อมูลจาก Response มา Render
function App() {
  const [productInfo, setProductInfo] = useState([]); //useState ต้องเป็น array เพราะจะทำให้สามารถใช้ array.map ได้
  //2 สร้างฟังก์ชั่น getBlogPost/getProduct เพื่อเอาไว้สร้าง request
  //const getBlogPost = async () => {
  //const result = await axios.get("https//localhoxst:4000/posts")
  //console.log(result)}

  // execute ให้ useEffect สร้างrequestครังเดียวเท่านั้นตอนเปิดเวป component render
  //useEffect(()->{
  //   getBlogPost()
  // },[]);ดูจาก array dependency

  useEffect(() => {
    getProduct();
  }, []);
  const getProduct = async () => {
    const result = await axios.get("http://localhost:4001/products");
    setProductInfo(result.data.data);
    console.log(result);
    // console.log(result.data.data); ถ้าอยากได้ข้อมูลจาก server เราต้อง result.data.data
  };
  const deleteProduct = async (id) => {
    await axios.delete(`http://localhost:4001/products/${id}`);
    const newProductInfo = productInfo.filter((item) => {
      return item.id !== id;
    });
    setProductInfo(newProductInfo);
  };

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      <div className="product-list">
        {/* //นำจ้อมูลจาก response มา render
        blogPost = [{},{},{}] */}
        {productInfo.map((item, index) => {
          return (
            <div className="product" key={item.id}>
              <div className="product-preview">
                <img
                  src={item.image}
                  alt="some product"
                  width="350"
                  height="350"
                />
              </div>
              <div className="product-detail">
                <h1>Product name: {item.name}</h1>
                <h2>Product price: {item.price} Baht</h2>
                <p>Product description: {item.description}</p>
              </div>

              <button
                className="delete-button"
                key={item.id}
                onClick={() => deleteProduct(item.id, index)}
              >
                x
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
