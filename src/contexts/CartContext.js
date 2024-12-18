import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const addToCart = (product) => {
        const alreadyAdded = cartItems.find((item) => item.id === product.id);
        let updatedCart;

        if (alreadyAdded) {
            // Удаляем товар из корзины
            updatedCart = cartItems.filter((item) => item.id !== product.id);
        } else {
            // Добавляем товар в корзину
            updatedCart = [...cartItems, product];
        }

        setCartItems(updatedCart);
        setTotalPrice(updatedCart.reduce((acc, item) => acc + item.price, 0));
    };

    return (
        <CartContext.Provider value={{ cartItems, totalPrice, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);