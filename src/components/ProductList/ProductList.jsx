import React, { useEffect } from 'react';
import './ProductList.css';
import ProductItem from "../ProductItem/ProductItem";
import { useTelegram } from "../../hooks/useTelegram";
import { useCart } from '../../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

const products = [
    { id: '1', title: 'Amanda', price: 40, description: 'Post Karma: 3214 Comment Karma: 312 Date: 17.02.2021' },
    { id: '2', title: 'Julia', price: 40, description: 'Post Karma: 3214 Comment Karma: 312 Date: 17.02.2021' },
    { id: '3', title: 'Maria', price: 40, description: 'Post Karma: 3214 Comment Karma: 312 Date: 17.02.2021' },
    { id: '4', title: 'Anna', price: 40, description: 'Post Karma: 3214 Comment Karma: 312 Date: 17.02.2021' },
];

const ProductList = () => {
    const { tg } = useTelegram();
    const { cartItems, totalPrice } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        // Обновляем MainButton, только если корзина готова (чтобы избежать дребезга)
        const timeout = setTimeout(() => {
            if (cartItems.length > 0) {
                tg.MainButton.setParams({
                    text: `Посмотреть заказ (${totalPrice}$)`,
                    color: "#29B54D",
                });
                tg.MainButton.show();
            } else {
                tg.MainButton.hide();
            }
        }, 50); // Задержка для исключения промежуточных состояний

        return () => clearTimeout(timeout); // Очищаем таймаут при размонтировании
    }, [cartItems, totalPrice, tg]);

    useEffect(() => {
        tg.onEvent('mainButtonClicked', () => navigate('/checkout'));
        return () => {
            tg.offEvent('mainButtonClicked', () => navigate('/checkout'));
        };
    }, [tg, navigate]);

    return (
        <div className="list">
            {products.map((item) => (
                <ProductItem
                    key={item.id}
                    product={item}
                />
            ))}
        </div>
    );
};

export default ProductList;