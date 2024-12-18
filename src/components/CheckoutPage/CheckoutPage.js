import React, { useState, useEffect } from 'react';
import './CheckoutPage.css';
import { useTelegram } from '../../hooks/useTelegram';
import { useNavigate } from 'react-router-dom'; // Для перехода между страницами
import { useCart } from '../../contexts/CartContext';

const CheckoutPage = () => {
    const { tg } = useTelegram();
    const navigate = useNavigate(); // Хук для переходов
    const { cartItems, totalPrice } = useCart(); // Получаем товары и сумму из контекста
    const [paymentMethod, setPaymentMethod] = useState(''); // Храним выбранный способ оплаты

    useEffect(() => {
        // Показываем кнопку "Назад" на этой странице
        tg.BackButton.show();

        // Обрабатываем событие нажатия на кнопку "Назад"
        const handleBackButtonClick = () => {
            navigate(-1); // Возвращаемся на предыдущую страницу
        };

        tg.BackButton.onClick(handleBackButtonClick);

        return () => {
            // Скрываем кнопку "Назад", когда покидаем страницу
            tg.BackButton.hide();
            tg.BackButton.offClick(handleBackButtonClick);
        };
    }, [tg, navigate]);

    useEffect(() => {
        // Показываем основную кнопку с текстом оплаты
        tg.MainButton.setParams({
            text: `Заплатить $${totalPrice}`,
            color: '#29B54D',
        });
        tg.MainButton.show();

        // Добавляем обработчик нажатия на "Заплатить"
        const handlePaymentClick = async () => {
            if (cartItems.length === 0) {
                alert('Ваша корзина пуста.');
                return;
            }

            if (!paymentMethod) {
                alert('Выберите способ оплаты перед продолжением.');
                return;
            }

            // Формируем заказ
            const orderData = {
                items: cartItems, // Список товаров
                totalPrice, // Итоговая сумма
                orderId: `order_${Date.now()}`, // Уникальный ID заказа
                paymentMethod, // Выбранный способ оплаты
            };

            try {
                // Отправка запроса к серверной функции
                const response = await fetch('/.netlify/functions/createPayment', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(orderData),
                });

                const { paymentUrl } = await response.json();

                if (paymentUrl) {
                    // Перенаправляем пользователя на страницу оплаты
                    window.location.href = paymentUrl;
                } else {
                    alert('Ошибка: не удалось создать платеж.');
                }
            } catch (error) {
                console.error('Ошибка при создании платежа:', error);
                alert('Произошла ошибка. Попробуйте снова.');
            }
        };

        tg.onEvent('mainButtonClicked', handlePaymentClick);

        return () => {
            tg.MainButton.hide();
            tg.offEvent('mainButtonClicked', handlePaymentClick);
        };
    }, [tg, cartItems, totalPrice, paymentMethod]);

    return (
        <div className="checkout-page">
            <h1>Завершение покупки</h1>
            {cartItems.length > 0 ? (
                <div>
                    <h2>Ваши товары:</h2>
                    <ul>
                        {cartItems.map((product) => (
                            <li key={product.id}>
                                {product.title} — {product.price}$ x {product.quantity || 1}
                            </li>
                        ))}
                    </ul>
                    <h3>Итоговая сумма: {totalPrice}$</h3>

                    {/* Выбор способа оплаты */}
                    <div className="payment-method">
                        <label htmlFor="paymentSelect">Выберите способ оплаты:</label>
                        <select
                            id="paymentSelect"
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >
                            <option value="">Выберите способ оплаты</option>
                            <option value="crypto">Криптовалюта</option>
                            <option value="binance">Binance Pay</option>
                            <option value="paypal">Paypal</option>
                        </select>
                    </div>

                    <p>Для завершения покупки нажмите на кнопку "Заплатить".</p>
                    {/* Добавляем кнопку "Изменить" */}
                    <p
                        className="change-button"
                        onClick={() => navigate('/')} // Переход на главную страницу
                    >
                        Изменить
                    </p>
                </div>
            ) : (
                <p>Ваша корзина пуста.</p>
            )}
        </div>
    );
};

export default CheckoutPage;