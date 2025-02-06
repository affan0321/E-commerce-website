import React, { useState, useContext } from 'react';
import { Menu, Badge, Drawer, Table, InputNumber, Button, Form, Input, Checkbox, message, Typography, Row, Col } from "antd";
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import './header.css';
import { CartContext } from './CartContext';

function Header() {
    const { cartItems, setCartItems } = useContext(CartContext);
    const navigate = useNavigate();
    const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
    const [checkoutDrawerOpen, setCheckoutDrawerOpen] = useState(false);

    const onMenuClick = (item) => {
        navigate(`/${item.key}`);
    }

    const onConfirmOrder = (values) => {
        console.log({ values });
        setCartDrawerOpen(false);
        setCheckoutDrawerOpen(false);
        message.success("Your order has been placed successfully.");
    }

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title'
        },
        {
            title: 'Price',
            dataIndex: 'price',
            render: (value) => <span>${value}</span>
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            render: (value, record) => (
                <InputNumber 
                    min={0} 
                    defaultValue={value} 
                    onChange={(value) => {
                        setCartItems(prevItems => prevItems.map(cart => {
                            if (record.id === cart.id) {
                                cart.quantity = value;
                                cart.total = (cart.price * value).toFixed(2);
                            }
                            return cart;
                        }));
                    }} 
                />
            )
        },
        {
            title: 'Total',
            dataIndex: 'total',
            render: (value) => <span>${Number(value).toFixed(2)}</span>
        }
    ];

    const summary = (data) => {
        const total = data.reduce((prev, current) => prev + Number(current.total), 0);
        return <span>Total: ${total.toFixed(2)}</span>;
    }

    return (
        <div 
            data-aos="fade-down" 
            data-aos-easing="linear"
            data-aos-duration="1500"
            className="header"
        >
            <Row justify="space-between" align="middle" className="menu-row">
                <Col xs={14} sm={4} md={4} lg={4} xl={4}>
                    <div className="title"><h1>Ecommerce</h1></div>
                </Col>
                <Col xs={16} sm={16} md={16} lg={16} xl={16}>
                    <Menu
                        onClick={onMenuClick}
                        mode="horizontal"
                        theme="light"
                        className="nav-menu"
                        items={[
                            { label: "Home", key: "" },
                            {
                                label: "Men",
                                key: "men",
                                children: [
                                    { label: "Men's Shirts", key: "mens-shirts" },
                                    { label: "Men's Shoes", key: "mens-shoes" },
                                    { label: "Men's Watches", key: "mens-watches" },
                                ],
                            },
                            {
                                label: "Women",
                                key: "women",
                                children: [
                                    { label: "Women's Dresses", key: "womens-dresses" },
                                    { label: "Women's Shoes", key: "womens-shoes" },
                                    { label: "Women's Watches", key: "womens-watches" },
                                    { label: "Women's Bags", key: "womens-bags" },
                                    { label: "Women's Jewellery", key: "womens-jewellery" },
                                ],
                            },
                            { label: "Fragrances", key: "fragrances" },
                        ]}
                    />
                </Col>
                <Col xs={4} sm={4} md={4} lg={4} xl={4} style={{ textAlign: 'right' }}>
                    <Badge onClick={() => setCartDrawerOpen(true)} className="shopping-cart" count={cartItems?.length || 0}>
                        <ShoppingCartOutlined className="shopping-cart" />
                    </Badge>
                </Col>
            </Row>
            <Drawer 
                open={cartDrawerOpen} 
                onClose={() => setCartDrawerOpen(false)} 
                title="Your Cart" 
                className="drawer" 
                width={600}
            >
                <Table 
                    pagination={false} 
                    columns={columns} 
                    dataSource={cartItems} 
                    summary={() => summary(cartItems)} 
                />
                <Button type="primary" onClick={() => setCheckoutDrawerOpen(true)}>
                    Checkout
                </Button>
            </Drawer>
            <Drawer 
                open={checkoutDrawerOpen} 
                onClose={() => setCheckoutDrawerOpen(false)} 
                title="Confirm Order"
            >
                <Form onFinish={onConfirmOrder}>
                    <Form.Item 
                        label="Full Name" 
                        name="full_name"
                        rules={[{
                            required: true,
                            message: 'Please enter your full name'
                        }]}
                    >
                        <Input placeholder="Enter your full name" />
                    </Form.Item>
                    <Form.Item 
                        label="Email" 
                        name="your_email"
                        rules={[{
                            required: true,
                            message: 'Please enter your valid email',
                            type: 'email'
                        }]}
                    >
                        <Input placeholder="Enter your email" />
                    </Form.Item>
                    <Form.Item 
                        label="Address" 
                        name="your_address"
                        rules={[{
                            required: true,
                            message: 'Please enter your address'
                        }]}
                    >
                        <Input placeholder="Enter your address" />
                    </Form.Item>
                    <Form.Item>
                        <Checkbox defaultChecked disabled>Cash on delivery</Checkbox>
                    </Form.Item>
                    <Button type="primary" htmlType="submit">
                        Confirm Order
                    </Button>
                </Form>
            </Drawer>
        </div>
    );
}

export default Header;
