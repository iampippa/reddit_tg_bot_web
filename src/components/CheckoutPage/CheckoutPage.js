import React, { useEffect } from 'react';
import './CheckoutPage.css';
import { useTelegram } from '../../hooks/useTelegram';
import { useNavigate } from 'react-router-dom'; // Для перехода между страницами
import { useCart } from '../../contexts/CartContext';

const CheckoutPage = () => {
    const { tg } = useTelegram();
    const navigate = useNavigate(); // Хук для переходов
    const { cartItems, totalPrice } = useCart(); // Получаем товары и сумму из контекста

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
            text: `Заплатить ${totalPrice}$`,
            color: '#29B54D',
        });
        tg.MainButton.show();

        return () => {
            tg.MainButton.hide();
        };
    }, [tg, totalPrice]);

    return (
        <div className="checkout-page">
            <h1>Завершение покупки</h1>
            {cartItems.length > 0 ? (
                <div>
                    <h2>Ваши товары:</h2>
                    <ul>
                        {cartItems.map((product) => (
                            <li key={product.id}>
                                {product.title} — {product.price}$
                            </li>
                        ))}
                    </ul>
                    <h3>Итоговая сумма: {totalPrice}$</h3>
                    <p>Для завершения покупки нажмите на кнопку "Заплатить".</p>
                </div>
            ) : (
                <p>Ваша корзина пуста.</p>
            )}
        </div>
    );
};

export default CheckoutPage;