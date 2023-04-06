import React, { useState, useEffect } from "react";
import ProductRow from "./productRow";
import axios from 'axios';
import Link from 'next/link';


function ProductList(props) {
  const [selectedProducts, setSelectedProducts] = useState([]);
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

  const handleCheckboxChange = (event) => {
    const { id, checked } = event.target;
    if (checked) {
      setSelectedProducts([...selectedProducts, id]);
    } else {
      setSelectedProducts(selectedProducts.filter((productId) => productId !== id));
    }
  };

  const handleMassDelete = (event) => {
    event.preventDefault();

    axios.delete('products.php', { data: selectedProducts,
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        console.log(response.data);
        // Update your UI to reflect the deleted products
        setProducts(products.filter((product) => !selectedProducts.includes(product.id)));
        setSelectedProducts([]);
      })
      .catch(error => {
        console.error(error);
      })
  };

  return (
    <div>
      <div className="productListHeader">
        <h3>Product list</h3>
        <div className="productListButton">
          <Link href="add-product"><button>ADD</button></Link>
          <button className="delete-product-btn" onClick={handleMassDelete}>MASS DELETE</button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>SKU</th>
            <th>Name</th>
            <th>Price</th>
            <th>Dimension</th>
            <th>Select</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <ProductRow
              key={product.id}
              product={product}
              handleCheckboxChange={handleCheckboxChange}
              isChecked={selectedProducts.includes(product.id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;