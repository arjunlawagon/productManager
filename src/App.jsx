import React, {useEffect, useState} from 'react';
import Container from 'react-bootstrap/Container';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import AlertMsg from './components/AlertMsg.jsx';
import { Navbar } from 'react-bootstrap';

function App() {
    const [products, setProducts] = useState([]);
    const [alertVariant, setAlertVariant] = useState('success');
    const [alertMessage, setAlertMessage] = useState('');
    const [highlight, setHighlight] = useState({product:'',type:''});

    const initialProducts = [
        { name: 'Apple', quantity: 6 },
        { name: 'Banana', quantity: 5 },
        { name: 'Grapes', quantity: 0 },
    ];

    // load sample product on load
    useEffect(() => {
        setProducts(initialProducts);
    }, [])

    //if alert is shown remove after 3 seco
    useEffect(() => {
        if (alertMessage) {
            setTimeout(() => setAlertMessage(''), 3000);
        }
    } , [alertMessage])


    function addOrUpdateProduct(newProduct) {
        const existingProduct = products.find(function (product) {
            return product.name.toLowerCase() === newProduct.name.toLowerCase();
        });

        if (existingProduct) {
            const updatedProducts = products.map(function (product) {
                if (product.name.toLowerCase() === newProduct.name.toLowerCase()) {
                    setAlertVariant('success');
                    setAlertMessage(newProduct.name + ' updated successfully');
                    setHighlight({product:product.name,type:'update'});
                    setTimeout(() => setHighlight({product:'',type:''}), 2000);

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
            setHighlight({product:newProduct.name,type:'add'});
            setTimeout(() => setHighlight({product:'',type:''}), 2000);
        }
    }

    function changeQuantity(productName, changeAmount) {
        let updatedProducts = products.map(function (product) {
            if (product.name.toLowerCase() === productName.toLowerCase()) {
                const newQuantity = product.quantity + changeAmount;

                setHighlight({product:productName,type:changeAmount > 0 ? 'increase' : 'decrease'});
                setTimeout(() => setHighlight({product:'',type:''}), 2000);
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
        <div>
            <nav className="navbar">
                <div className="container-fluid">
                    <span className="navbar-brand mb-0 h1">Product Manager</span>
                </div>
            </nav>
            <Container className="mt-5">

                <ProductForm onSubmit={addOrUpdateProduct}/>
                <div>
                    {alertMessage && (
                        <AlertMsg
                            alertVariant={alertVariant}
                            alertMessage={alertMessage}
                            onDismiss={() => setAlertMessage('')}
                        />

                    )}
                </div>
                <ProductList products={products} onQuantityChange={changeQuantity} onDelete={deleteProduct} highlight={highlight}/>
            </Container>
        </div>
    );
}

export default App;
