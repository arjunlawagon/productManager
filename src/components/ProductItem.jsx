import React, {useState} from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';

function ProductItem(props) {
    const [showIndicator, setShowIndicator] = useState("");

  function increaseQuantity() {
      setShowIndicator("+1");
      props.onQuantityChange(props.product.name, 1);
      setTimeout(() => setShowIndicator(""), 1000);
  }

  function decreaseQuantity() {
      props.onQuantityChange(props.product.name, -1);
      if (props.product.quantity > 0) {
          setShowIndicator("-1");
          setTimeout(() => setShowIndicator(""), 1000);
      }

  }

  function deleteProduct() {
      if (window.confirm('Are you sure you want to delete this product?')) {
          props.onDelete(props.product.name)
      }

  }

  return (
          <tr key={props.product.name}
              className={props.highlight.product === props.product.name ? `highlight-row-${props.highlight.type}` : ''}>
              <td>{props.product.name}</td>
              <td>
                  <div className="d-flex align-items-center position-relative">
                    {props.product.quantity.toLocaleString()}
                      {showIndicator && <span className="quantity-indicator">{showIndicator}</span>}
                  </div>
              </td>
              <td>
                  <ButtonGroup>
                      <Button variant="warning" onClick={decreaseQuantity} >
                          <i className="bi bi-dash-circle "></i>
                      </Button>

                      <Button variant="success" onClick={increaseQuantity}><i
                          className="bi bi-plus-circle "></i>
                      </Button>
                  </ButtonGroup>

                  {props.product.quantity < 1 && (
                      <button type="button" className="btn btn-danger ms-3" onClick={deleteProduct}>
                          <i className="bi bi-trash3"></i>
                      </button>
                  )}

              </td>
          </tr>
  );
}

export default ProductItem;
