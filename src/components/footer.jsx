import React from 'react';
import { Row, Col } from 'antd';
import './footer.css';

const Footer = () => {
    return (
        <div className="footer">
            <Row justify="center" align="middle" gutter={[16, 16]}>
            
                <Col xs={24} sm={24} md={12} lg={12}>
                    <p className="footer-text">© 2024 Ecommerce Store. All rights reserved.</p>
                </Col>

                
                <Col xs={24} sm={24} md={12} lg={12}>
                    <div className="footer-links">
                        <a href="/about">About Us</a>
                        <a href="/contact">Contact</a>
                        <a href="/privacy">Privacy Policy</a>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default Footer;
