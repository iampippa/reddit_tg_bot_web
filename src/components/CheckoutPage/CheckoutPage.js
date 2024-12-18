import React, { useEffect } from 'react';
import { useTelegram } from "../../hooks/useTelegram";
import { useCart } from "../../contexts/CartContext";
import { useNavigate } from "react-router-dom"; // Для навигации
import './Checkout.css'; // Подключаем стили

const Checkout = () => {
    const { tg } = useTelegram();
    const { cartItems, totalPrice } = useCart();
    const navigate = useNavigate(); // Хук для перехода между страницами

    useEffect(() => {
        // Даже на странице Checkout кнопка MainButton остаётся активной
        if (cartItems.length > 0) {
            tg.MainButton.setParams({
                text: `Оформить заказ (${totalPrice}$)`, // Обновляем текст с итоговой стоимостью
            });
            tg.MainButton.show();
        } else {
            tg.MainButton.hide(); // Если корзина пуста, скрываем кнопку
        }
    }, [cartItems, totalPrice, tg]);

    return (
        <div className="checkout-container">
            <h1 className="checkout-title">Оформление заказа</h1>
            <p className="checkout-summary">Ваш заказ на сумму: <strong>{totalPrice}$</strong></p>
            <p className="checkout-items-title">Товары:</p>
            <ul className="checkout-items-list">
                {cartItems.map((item) => (
                    <li key={item.id} className="checkout-item">
                        {item.title} - {item.price}$
                    </li>
                ))}
            </ul>
            {/* Зеленый текст-кнопка */}
            <p
                className="change-button" // Применяем CSS-класс для кнопки
                onClick={() => navigate('/')} // Переход на главную страницу
            >
                Изменить
            </p>
        </div>
    );
};

export default Checkout;