import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ProductList from '../../components/productList';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('products.php')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="homePage">
      <h1>Hello world!</h1>
      <br></br>
      <div className="container">
        {products ? (
          <ProductList />
        ) : (
          <>
            null
          </>
        )}
      </div>
    </div>
  );
}

export default App;