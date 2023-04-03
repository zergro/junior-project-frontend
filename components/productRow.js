import React from "react";

function ProductRow(props) {
  const { product, handleCheckboxChange, isChecked } = props;

  return (
    <tr>
      <td>{product.sku}</td>
      <td>{product.name}</td>
      <td>{product.price}$</td>
      <td>{product.dimension}</td>
      <td>
        <input type="checkbox" className="delete-checkbox" id={product.id} onChange={handleCheckboxChange} checked={isChecked} />
      </td>
    </tr>
  );
}

export default ProductRow;