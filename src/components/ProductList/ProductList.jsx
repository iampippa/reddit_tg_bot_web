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
    const { cartItems, totalPrice } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        const handleBackButton = () => {
            // Обновляем состояние кнопки до полного рендера компонента
            if (cartItems.length > 0) {
                tg.MainButton.setParams({
                    text: `Посмотреть заказ (${totalPrice}$)`,
                    color: "#29B54D"
                });
                tg.MainButton.show();
            } else {
                tg.MainButton.hide();
            }
        };

        // Подписка на событие возврата назад
        tg.onEvent('navigatorBackButtonClicked', handleBackButton);

        // Убедимся, что при монтировании обновляется состояние кнопки сразу
        if (cartItems.length > 0) {
            tg.MainButton.setParams({
                text: `Посмотреть заказ (${totalPrice}$)`,
                color: "#29B54D"
            });
            tg.MainButton.show();
        } else {
            tg.MainButton.hide();
        }

        return () => {
            tg.offEvent('navigatorBackButtonClicked', handleBackButton); // Убираем обработчик при размонтировании
        };
    }, [cartItems, totalPrice, tg]);

    const onSendData = () => {
        navigate('/checkout'); // Переход на страницу Checkout
    };

    useEffect(() => {
        // Обработка клика по MainButton
        tg.onEvent('mainButtonClicked', onSendData);
        return () => {
            // Убираем обработчик клика
            tg.offEvent('mainButtonClicked', onSendData);
        };
    }, [onSendData, tg]);

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