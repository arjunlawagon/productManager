import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function ProductForm(props) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(0);

  function handleSubmit(event) {
    event.preventDefault();

    if (name.trim() === '') {
      return;
    }

    const product = {
      name: name.trim(),
      quantity: Number(quantity)
    };

    props.onSubmit(product);

    setName('');
    setQuantity(0);
  }

  return (
      <Form onSubmit={handleSubmit} className="mb-4 card p-4">
        <Form.Group className="mb-3">
          <Form.Label>Product Name:</Form.Label>
          <Form.Control
              type="text"
              placeholder="Enter product name"
              value={name}
              onChange={function (event) {
                setName(event.target.value);
              }}
              required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Quantity:</Form.Label>
          <Form.Control
              type="number"
              min="0"
              placeholder="0"
              value={quantity}
              onChange={function (event) {
                setQuantity(event.target.value);
              }}
              onFocus={function (event) {
                  if (event.target.value === '0') {
                      event.target.value = ' ';
                  }
              }}
          />
        </Form.Group>

        <Button type="submit" variant="primary" className="save-product-btn">
            <i className="bi bi-floppy"></i> Save Product
        </Button>
      </Form>
  );
}

export default ProductForm;
