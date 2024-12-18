import React, { createContext, useContext, useReducer } from 'react';

// Инициализация контекста
const CartContext = createContext();

// Начальное состояние корзины
const initialState = {
    cartItems: [], // Список товаров
    totalPrice: 0  // Итоговая сумма
};

// Редьюсер для управления состоянием корзины
const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_OR_REMOVE':
            const alreadyAdded = state.cartItems.find((item) => item.id === action.product.id);
            let updatedCart;

            if (alreadyAdded) {
                // Если товар уже в корзине — удаляем
                updatedCart = state.cartItems.filter((item) => item.id !== action.product.id);
            } else {
                // Если товара нет в корзине — добавляем
                updatedCart = [...state.cartItems, action.product];
            }

            // Пересчитываем итоговую стоимость
            const updatedTotalPrice = updatedCart.reduce((acc, item) => acc + item.price, 0);

            return {
                ...state,
                cartItems: updatedCart,
                totalPrice: updatedTotalPrice
            };

        default:
            return state;
    }
};

// Провайдер корзины
export const CartProvider = ({ children }) => {
    // Перенос логики в useReducer
    const [state, dispatch] = useReducer(cartReducer, initialState);

    // Обёртка для добавления/удаления товаров
    const addToCart = (product) => {
        dispatch({ type: 'ADD_OR_REMOVE', product });
    };

    return (
        <CartContext.Provider value={{ cartItems: state.cartItems, totalPrice: state.totalPrice, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};

// Хук для использования контекста корзины
export const useCart = () => useContext(CartContext);