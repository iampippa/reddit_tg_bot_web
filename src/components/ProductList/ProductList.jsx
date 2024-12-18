import React, { useEffect } from 'react';
import './ProductList.css';
import ProductItem from "../ProductItem/ProductItem";
import { useTelegram } from "../../hooks/useTelegram";
import { useCart } from '../../contexts/CartContext'; // Контекст корзины
import { useNavigate } from 'react-router-dom';

const products = [
    { id: '1', title: 'Amanda', price: 40, description: 'Post Karma: 3214 Comment Karma: 312 Date: 17.02.2021' },
    { id: '2', title: 'Julia', price: 40, description: 'Post Karma: 3214 Comment Karma: 312 Date: 17.02.2021' },
    { id: '3', title: 'Maria', price: 40, description: 'Post Karma: 3214 Comment Karma: 312 Date: 17.02.2021' },
    { id: '4', title: 'Anna', price: 40, description: 'Post Karma: 3214 Comment Karma: 312 Date: 17.02.2021' },
];

const ProductList = () => {
    const { tg } = useTelegram();
    const { cartItems, totalPrice } = useCart(); // Получаем список товаров в корзине и итоговую сумму
    const navigate = useNavigate();

    useEffect(() => {
        // Обновляем текст и параметры кнопки при изменении корзины
        tg.MainButton.setParams({
            text: cartItems.length > 0 ? `Посмотреть заказ (${totalPrice}$)` : "Корзина пустая",
            color: "#29B54D",
        });

        // Показываем кнопку, если её ещё нет
        if (!tg.MainButton.isVisible) {
            tg.MainButton.show();
        }

    }, [cartItems, totalPrice, tg]);

    const onSendData = () => {
        navigate('/checkout'); // Переход к странице завершения покупки
    };

    useEffect(() => {
        // Обработка клика на MainButton
        tg.onEvent('mainButtonClicked', onSendData);

        return () => {
            tg.offEvent('mainButtonClicked', onSendData); // Очищаем обработчик при размонтировании
        };
    }, [onSendData, tg]);

    return (
        <div className="list">
            {products.map((item) => (
                <ProductItem
                    key={item.id}
                    product={item} // Передача данных о каждом продукте
                />
            ))}
        </div>
    );
};

export default ProductList;