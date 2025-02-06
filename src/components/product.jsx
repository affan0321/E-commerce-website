import React, { useState, useEffect, useContext } from 'react';
import { Badge, Button, Card, List, message, Rate, Typography, Row, Col } from 'antd';
import { Image } from 'antd';
import './product.css';
import { useParams, useLocation } from 'react-router-dom'; 
import { addToCart, getProductByCategory, getSingleProduct, getAnotherProduct } from './Api/API';
import { CartContext } from './CartContext';
import CarouselApp from './Carousel'; 
import AOS from 'aos';
import 'aos/dist/aos.css';
import Carousel1 from './Carousels1'; 

const Products = () => {
    const { cartItems, setCartItems } = useContext(CartContext);
    const [items, setItems] = useState([]);
    const param = useParams();
    const location = useLocation();
    const [product1, setProduct1] = useState(null);  
    const [product2, setProduct2] = useState(null);  

    
    useEffect(() => {
        getSingleProduct().then(data => {
            setProduct1(data);
        });
        getAnotherProduct().then(data => {
            setProduct2(data);
        });
    }, []);

    
    useEffect(() => {
        if (param?.categoryId) {
            
            getProductByCategory(param.categoryId).then((res) => {
                if (res && res.products) {
                    setItems(res.products); 
                } else {
                    console.warn("No products data found for the specified category.");
                }
            });
        } else {
            
            const fetchAllProducts = async () => {
                try {
                    const res = await fetch('https://dummyjson.com/products');
                    const data = await res.json();
                    setItems(data.products.slice(0, 6)); 
                } catch (error) {
                    console.error("Error fetching products:", error);
                }
            };
            fetchAllProducts();
        }
    }, [param]); 

    
    useEffect(() => { AOS.init(); }, []);

        const AddToCartButton = ({ item }) => {
        const [loading, setLoading] = useState(false);

        const addProductToCart = () => {
            setLoading(true);
            addToCart(item.id).then(() => {
                setCartItems(prevItems => {
                    const existingItem = prevItems.find(cartItem => cartItem.id === item.id);
                    if (existingItem) {
                        return prevItems.map(cartItem =>
                            cartItem.id === item.id
                                ? { ...cartItem, quantity: cartItem.quantity + 1, total: (cartItem.price * (cartItem.quantity + 1)).toFixed(2) }
                                : cartItem
                        );
                    } else {
                        return [...prevItems, { ...item, quantity: 1, total: item.price.toFixed(2) }];
                    }
                });
                message.success(`${item.title} has been added to cart`);
                setLoading(false);
            });
        };

        return (
            <Button type="link" onClick={addProductToCart} loading={loading}>
                Add To Cart
            </Button>
        );
    };

    return (
        <div>
            
            {location.pathname === '/' && (
                <>
                    <CarouselApp />
                    <div>
                        <h1 data-aos="fade-up" className="h1">Latest Products</h1>
                        
                        {product1 && (
                            <Row className="single-product-container" justify="center" gutter={[16, 16]}>
                                <Col xs={24} sm={24} md={12} lg={10} xl={10}>
                                    <div data-aos="fade-right" data-aos-offset="300" data-aos-easing="ease-in-sine" className="product-image">
                                        <img src={product1.thumbnail} alt={product1.title} />
                                    </div>
                                </Col>
                                <Col xs={24} sm={24} md={12} lg={10} xl={10}>
                                    <div data-aos="fade-left" data-aos-offset="500" data-aos-duration="500" className="product-info">
                                        <h2>{product1.title}</h2>
                                        <p>{product1.description}</p>
                                        <p><strong>Price:</strong> ${product1.price}</p>
                                        <AddToCartButton item={product1} />
                                    </div>
                                </Col>
                            </Row>
                        )}
                        {product2 && (
                            <Row className="single-product-container" justify="center" gutter={[16, 16]}>
                                <Col xs={24} sm={24} md={12} lg={10} xl={10}>
                                    <div data-aos="fade-right" data-aos-offset="300" data-aos-easing="ease-in-sine" className="product-image">
                                        <img src={product2.thumbnail} alt={product2.title} />
                                    </div>
                                </Col>
                                <Col xs={24} sm={24} md={12} lg={10} xl={10}>
                                    <div data-aos="fade-left" data-aos-offset="500" data-aos-duration="500" className="product-info">
                                        <h2>{product2.title}</h2>
                                        <p>{product2.description}</p>
                                        <p><strong>Price:</strong> ${product2.price}</p>
                                        <AddToCartButton item={product2} />
                                    </div>
                                </Col>
                            </Row>
                        )}
                    </div>
                    <Carousel1 className='m-3' /> 
                </>
            )}

            
            {location.pathname !== '/' && (
                <List
                    data-aos="fade-up"
                    data-aos-duration="3000"
                    grid={{
                        gutter: 16,
                        xs: 1,
                        sm: 2,
                        md: 2,
                        lg: 2,
                        xl: 3,
                    }}
                    dataSource={items}
                    renderItem={(product, index) => (
                        <Badge.Ribbon className="ribbon" text={`${product.discountPercentage}% Off`} color="black">
                            <Card className="card" title={product.title} key={index}>
                                {product.thumbnail && (
                                    <Image className="itemImageCover" width={350} src={product.thumbnail} alt={product.title} />
                                )}
                                <Card.Meta
                                    title={
                                        <Typography.Paragraph>
                                            Price: ${product.price} {'  '}
                                            <Typography.Text delete type="danger">
                                                ${parseFloat(product.price + product.price * product.discountPercentage / 100).toFixed(2)}
                                            </Typography.Text>
                                        </Typography.Paragraph>
                                    }
                                    description={
                                        <Typography.Paragraph ellipsis={{ rows: 2, expandable: true, symbol: "more" }}>
                                            {product.description}
                                        </Typography.Paragraph>
                                    }
                                />
                                <Rate allowHalf disabled value={product.rating} />
                                <AddToCartButton item={product} />
                            </Card>
                        </Badge.Ribbon>
                    )}
                />
            )}
        </div>
    );
}

export default Products;
