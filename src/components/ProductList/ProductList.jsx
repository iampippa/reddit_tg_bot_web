import React, { useEffect } from 'react';
import './ProductList.css';
import ProductItem from "../ProductItem/ProductItem";
import { useTelegram } from "../../hooks/useTelegram";
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';

const products = [
    { id: '1', title: 'Amanda', price: 40, description: 'Post Karma: 3214 Comment Karma: 312 Date: 17.02.2021' },
    { id: '2', title: 'Julia', price: 40, description: 'Post Karma: 3214 Comment Karma: 312 Date: 17.02.2021' },
    { id: '3', title: 'Maria', price: 40, description: 'Post Karma: 3214 Comment Karma: 312 Date: 17.02.2021' },
    // ... остальные товары
];

const ProductList = () => {
    const { tg } = useTelegram();
    const navigate = useNavigate();
    const { cartItems, totalPrice, addToCart } = useCart(); // Получаем данные из контекста

    useEffect(() => {
        if (cartItems.length === 0) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: `Посмотреть заказ (${totalPrice}$)`,
                color: "#29B54D",
            });
        }
    }, [cartItems, totalPrice, tg]);

    const onSendData = () => {
        navigate('/checkout'); // Переход на страницу завершения покупки
    };

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData);
        return () => tg.offEvent('mainButtonClicked', onSendData);
    }, [onSendData, tg]);

    return (
        <div className="list">
            {products.map((item) => (
                <ProductItem
                    key={item.id}
                    product={item}
                    onAdd={addToCart} // Используем метод контекста
                    className="item"
                />
            ))}
        </div>
    );
};

export default ProductList;