import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const localData = localStorage.getItem('vansugandh_cart');
    return localData ? JSON.parse(localData) : [];
  });
  
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('vansugandh_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item._id === product._id && item.weight === product.weight);
      if (existingItem) {
        return prevCart.map((item) =>
          (item._id === product._id && item.weight === product.weight)
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId, weight) => {
    setCart((prevCart) => prevCart.filter((item) => !(item._id === productId && item.weight === weight)));
  };

  const updateQuantity = (productId, weight, delta) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        (item._id === productId && item.weight === weight)
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const price = typeof item.price === 'number' ? item.price : parseFloat(String(item.price).replace(/[^0-9.]/g, ''));
      return total + (isNaN(price) ? 0 : price) * item.quantity;
    }, 0);
  };

  const getCartCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      getCartTotal, 
      getCartCount, 
      isCartOpen, 
      setIsCartOpen,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};
