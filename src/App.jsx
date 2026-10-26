import { useState } from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CartProvider from './pages/contex/CartContext/CartProvider';
import Cart from './pages/Cart/Cart';
import Navbar from './components/layout/Navbar/Navbar';
import Footer from './components/layout/Footer/Footer';
import HomePage from './pages/Home/Home';
import CheckoutPage from './pages/Checkout/CheckoutPage';
import PaymentPage from './pages/Payment/PaymentPage';
import CesiaStore from './themes/CesiaStore/Cesia';
import EfrainStore from './themes/EfrainStore/Efrain';
import ElizabethStore from './themes/ElizabethStore.jsx/Elizabeth';
import ThankYou from './pages/ThankYouPage//ThankYou';
import './App.css'

function App() {
   const [isCartOpen, setIsCartOpen] = useState(false);


  return (
    <CartProvider>
        <BrowserRouter>
           <div className="app">
        <Navbar onCartOpen={() => setIsCartOpen(true)} />
        <main className="app__content">
      <Routes>
 <Route path="/" element={<HomePage />} />
        <Route path="/cesia-store" element={<CesiaStore />} />
 <Route path="/efrain-store" element={<EfrainStore />} />
  <Route path="/elizabeth-store" element={<ElizabethStore />} />
 <Route path="/checkout" element={<CheckoutPage />} />
 <Route path="/payment" element={<PaymentPage />} />
 <Route path="/thank-you" element={<ThankYou />} />
    </Routes>
        </main>
    <Footer />
        <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
        </BrowserRouter>
    </CartProvider>
  )
}

export default App
