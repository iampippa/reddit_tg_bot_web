import React from 'react';
import './CheckoutPage.css'; // Можно добавить стили для оформления

const CheckoutPage = ({ location }) => {
    const { state } = location || {}; // Получаем переданные данные (из добавленных товаров)
    const { products = [], totalPrice = 0 } = state || {}; // Дефолтные значения на случай перехода без данных

    return (
        <div className="checkout-page">
            <h1>Завершение покупки</h1>
            {products.length > 0 ? (
                <div>
                    <h2>Ваши товары:</h2>
                    <ul>
                        {products.map((product) => (
                            <li key={product.id}>
                                {product.title} — {product.price}$
                            </li>
                        ))}
                    </ul>
                    <h3>Итоговая сумма: {totalPrice}$</h3>
                </div>
            ) : (
                <p>Ваша корзина пуста.</p>
            )}
        </div>
    );
};

export default CheckoutPage;