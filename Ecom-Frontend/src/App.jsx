import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import AddProducts from './Components/AddProducts';
import Cart from './Components/Cart';
import EditProduct from './Components/EditProduct';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import Product from './Components/Product';

const App = () => {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('storefront-theme') === 'dark' ? 'dark' : 'light';
    } catch (error) {
      console.error('Unable to load saved theme', error);
      return 'light';
    }
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = JSON.parse(localStorage.getItem('shopping-cart') || '[]');
      return Array.isArray(savedCart) ? savedCart : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('shopping-cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.setAttribute('data-bs-theme', theme);
    try {
      localStorage.setItem('storefront-theme', theme);
    } catch (error) {
      console.error('Unable to save theme preference', error);
    }
  }, [theme]);

  const addToCart = (product) => {
    setCart((currentCart) => {
      const existingProduct = currentCart.find(
        (item) => String(item.id) === String(product.id)
      );

      if (existingProduct) {
        return currentCart.map((item) =>
          String(item.id) === String(product.id)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((currentCart) =>
      currentCart.filter((item) => String(item.id) !== String(productId))
    );
  };

  const cartCount = cart.reduce((total, item) => total + (item.quantity || 0), 0);

  return (
    <BrowserRouter>
    <Navbar
      cartCount={cartCount}
      theme={theme}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      onToggleTheme={() => setTheme((currentTheme) => currentTheme === 'light' ? 'dark' : 'light')}
    />
      <Routes>
        <Route path="/" element={<Home onAddToCart={addToCart} searchQuery={searchQuery}/>}/>
        <Route path="/category/:category" element={<Home onAddToCart={addToCart} searchQuery={searchQuery}/>}/>
        <Route path="/addProduct" element={<AddProducts/>}/>
        <Route path="/product/:id" element={<Product onAddToCart={addToCart} onDeleteProduct={removeFromCart}/>}/>
        <Route path="/product/:id/edit" element={<EditProduct/>}/>
        <Route path="/cart" element={<Cart cart={cart} onRemove={removeFromCart}/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
