import React, { useEffect, useState, useContext } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Card, Image, Typography, Badge, Button, Rate, message } from 'antd';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { CartContext } from './CartContext'; 
import './Carousel1.css';

const { Meta } = Card;

const AddToCartButton = ({ item }) => {
    const { setCartItems } = useContext(CartContext);
    const [loading, setLoading] = useState(false);

    const addProductToCart = () => {
        setLoading(true);
        // Simulate API call with a timeout
        setTimeout(() => {
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
        }, 1000); // Simulate a delay
    };

    return (
        <Button type="link" onClick={addProductToCart} loading={loading}>
            Add To Cart
        </Button>
    );
};

const Carousel1 = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await fetch('https://dummyjson.com/products');
            const data = await res.json();
            setProducts(data.products.slice(0, 6)); // Use first 6 products
        };
        fetchProducts();
    }, []);

    const [products1, setProducts1] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await fetch('https://dummyjson.com/products');
            const data = await res.json();
            setProducts1(data.products.slice(7,13 )); // Use first 6 products
        };
        fetchProducts();
    }, []);

    

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <>
        <h1 className='h1'>Trending Products</h1>
        <Slider {...settings}>
            {products.map((product, index) => (
                <div  key={index} className="carousel-item">
                    <Badge.Ribbon text={`${product.discountPercentage}% Off`} color="black">
                        <Card
                            hoverable
                            cover={<Image alt={product.title} src={product.thumbnail} className="carousel-image" />}
                            actions={[<AddToCartButton item={product} />]}
                        >
                            <Meta
                                title={product.title}
                                description={
                                    <>
                                        <Typography.Paragraph>{product.description}</Typography.Paragraph>
                                        <Typography.Paragraph>
                                            Price: ${product.price} <Typography.Text delete>${(product.price * 1.10).toFixed(2)}</Typography.Text>
                                        </Typography.Paragraph>
                                    </>
                                }
                            />
                            <Rate allowHalf disabled value={product.rating} />
                        </Card>
                    </Badge.Ribbon>
                </div>
            ))}
        </Slider>

        <h1 className='h1'>Most Selling</h1>
        <Slider {...settings}>
            {products1.map((product, index) => (
                <div  key={index} className="carousel-item">
                    <Badge.Ribbon text={`${product.discountPercentage}% Off`} color="black">
                        <Card
                            hoverable
                            cover={<Image alt={product.title} src={product.thumbnail} className="carousel-image" />}
                            actions={[<AddToCartButton item={product} />]}
                        >
                            <Meta
                                title={product.title}
                                description={
                                    <>
                                        <Typography.Paragraph>{product.description}</Typography.Paragraph>
                                        <Typography.Paragraph>
                                            Price: ${product.price} <Typography.Text delete>${(product.price * 1.10).toFixed(2)}</Typography.Text>
                                        </Typography.Paragraph>
                                    </>
                                }
                            />
                            <Rate allowHalf disabled value={product.rating} />
                        </Card>
                    </Badge.Ribbon>
                </div>
            ))}
        </Slider>    
        

        </>
    );
};

const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div className={className} style={{ ...style, display: 'block', right: 10 }} onClick={onClick}>
            <FaChevronRight />
        </div>
    );
};

const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div className={className} style={{ ...style, display: 'block', left: 10 }} onClick={onClick}>
            <FaChevronLeft />
        </div>
    );
};

export default Carousel1;
