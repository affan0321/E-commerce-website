import React from 'react';
import { Routes, Route } from "react-router-dom";
import Category from '../Category/Category';
import Products from '../product';

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Category />} />
            <Route path="/:categoryId" element={<Category />} />
            <Route path="/products" element={<Products />} />
        </Routes>
    );
}

export default AppRoutes;
