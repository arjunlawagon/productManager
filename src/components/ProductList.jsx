import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import ProductItem from './ProductItem';

function ProductList({products, onQuantityChange, onDelete, highlight,}) {

  return (
      <div>
          <table className="table table-striped" >
              <thead>
              <tr>
                  <th style={{ width: '50%' }}>Product Name</th>
                  <th style={{ width: '15%' }}>Quantity</th>
                  <th style={{ width: '35%' }}>Actions</th>
              </tr>
              </thead>
              <tbody>
              {products.length === 0 ? (
                  <tr>
                      <td colSpan="3" className="text-center">No product in the list</td>
                  </tr>
              ) : (
                  products.map((product) => (
                      <ProductItem
                          key={product.name}
                          product={product}
                          onQuantityChange={onQuantityChange}
                          onDelete={onDelete}
                          highlight={highlight}
                      />
                  ))
              )}
              </tbody>
          </table>
      </div>

  );
}

export default ProductList;
