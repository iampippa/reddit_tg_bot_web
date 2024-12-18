import React, { useEffect } from 'react';
import './CheckoutPage.css';
import { useTelegram } from '../../hooks/useTelegram';
import { useCart } from '../../contexts/CartContext'; // Используем контекст корзины

const CheckoutPage = () => {
    const { tg } = useTelegram();
    const { cartItems, totalPrice } = useCart(); // Достаем товары и сумму из контекста

    useEffect(() => {
        // Показываем кнопку "Заплатить" с суммой, когда пользователь находится на странице Checkout
        tg.MainButton.setParams({
            text: `Заплатить ${totalPrice}$`,
            color: '#29B54D', // Зеленый цвет кнопки
        });
        tg.MainButton.show();

        // Убираем кнопку, если пользователь уходит со страницы
        return () => {
            tg.MainButton.hide();
        };
    }, [tg, totalPrice]);

    return (
        <div className="checkout-page">
            <h1>Завершение покупки</h1>
            {cartItems.length > 0 ? ( // Проверяем товары в корзине (из контекста)
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