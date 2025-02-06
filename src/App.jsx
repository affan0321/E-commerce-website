import React from 'react';
import Header from './components/header';
import PageContent from './components/pageContent';
import Footer from './components/footer';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './components/CartContext';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <CartProvider>
                    <div className='navbar'>
                        <Header />
                    </div>
                    <PageContent />
                    <Footer />
                </CartProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;
