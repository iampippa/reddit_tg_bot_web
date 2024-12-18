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

    // Следим за состоянием корзины и кнопки
    useEffect(() => {
        // Проверяем, нужно ли что-то менять с кнопкой
        if (cartItems.length > 0) {
            // Если кнопка уже видна, обновляем только текст
            if (tg.MainButton.isVisible) {
                tg.MainButton.setParams({
                    text: `Посмотреть заказ (${totalPrice}$)`,
                });
            } else {
                // Если кнопка НЕ видна, показываем её с новым текстом
                tg.MainButton.setParams({
                    text: `Посмотреть заказ (${totalPrice}$)`,
                    color: "#29B54D",
                });
                tg.MainButton.show();
            }
        } else {
            // Если товаров в корзине нет, скрываем кнопку (только если она была видна)
            if (tg.MainButton.isVisible) {
                tg.MainButton.hide();
            }
        }
    }, [cartItems, totalPrice, tg]);

    const onSendData = () => {
        navigate('/checkout'); // Переход на страницу Checkout
    };

    useEffect(() => {
        // Добавляем обработчик клика
        tg.onEvent('mainButtonClicked', onSendData);

        return () => {
            // Удаляем обработчик при размонтировании
            tg.offEvent('mainButtonClicked', onSendData);
        };
    }, [onSendData, tg]);

    return (
        <div className="list">
            {products.map((item) => (
                <ProductItem
                    key={item.id}
                    product={item} // Передача данных о продукте
                />
            ))}
        </div>
    );
};

export default ProductList;