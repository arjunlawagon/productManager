import React, {useEffect, useState} from 'react';
import Container from 'react-bootstrap/Container';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import AlertMsg from './components/AlertMsg.jsx';

function App() {
    const [products, setProducts] = useState([]);
    const [alertVariant, setAlertVariant] = useState('success');
    const [alertMessage, setAlertMessage] = useState('');

    const initialProducts = [
        { name: 'Apple', quantity: 6 },
        { name: 'Banana', quantity: 5 },
        { name: 'Grapes', quantity: 0 },
    ];

    // load sample product on load
    useEffect(() => {
        setProducts(initialProducts);
    }, [])

    function addOrUpdateProduct(newProduct) {
        const existingProduct = products.find(function (product) {
            return product.name.toLowerCase() === newProduct.name.toLowerCase();
        });

        if (existingProduct) {
            const updatedProducts = products.map(function (product) {
                if (product.name.toLowerCase() === newProduct.name.toLowerCase()) {
                    setAlertVariant('success');
                    setAlertMessage(newProduct.name + ' updated successfully');

                    // changed, update the quantity and return
                    return {
                        name: product.name,
                        quantity: product.quantity + newProduct.quantity
                    };
                } else {
                    // no change, return the product so it will not be removed from list
                    return product;
                }
            });

            //update the list in the state
            setProducts(updatedProducts);
        } else {
            //add new product to the list
            setProducts([...products, newProduct]);
            setAlertVariant('success');
            setAlertMessage(newProduct.name + ' added successfully');
        }
    }

    function changeQuantity(productName, changeAmount) {
        let updatedProducts = products.map(function (product) {
            if (product.name.toLowerCase() === productName.toLowerCase()) {
                const newQuantity = product.quantity + changeAmount;


                return {
                    name: product.name,
                    quantity: newQuantity < 0 ? 0 : newQuantity,
                };
            } else {
                return product;
            }
        });

        setProducts(updatedProducts);
    }

    function deleteProduct(productName) {
        const updatedProducts = products.filter(function (product) {
            return product.name.toLowerCase() !== productName.toLowerCase();
        });

        setProducts(updatedProducts);
        setAlertVariant('danger');
        setAlertMessage(productName +' deleted successfully');
    }


    return (
        <Container className="mt-4">
            <h2>Product Manager</h2>
            <ProductForm onSubmit={addOrUpdateProduct} />
            <div>
                {alertMessage && (
                   <AlertMsg
                    alertVariant={alertVariant}
                    alertMessage={alertMessage}
                    />
                )}
            </div>
            <ProductList products={products} onQuantityChange={changeQuantity} onDelete={deleteProduct} />
        </Container>
    );
}

export default App;
