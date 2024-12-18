import React, { useEffect, useRef } from 'react'; // Используем useRef для отслеживания состояния
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

    // Ref для отслеживания видимости кнопки
    const isMainButtonInitialized = useRef(false);

    useEffect(() => {
        // Проверяем, нужно ли что-то менять с MainButton
        if (cartItems.length > 0) {
            // Если кнопка ещё не была инициализирована — показываем её
            if (!isMainButtonInitialized.current) {
                tg.MainButton.setParams({
                    text: `Посмотреть заказ (${totalPrice}$)`,
                    color: "#29B54D",
                });
                tg.MainButton.show();
                isMainButtonInitialized.current = true; // Помечаем, что кнопка инициализирована
            } else {
                // Обновляем текст, если кнопка уже видна
                tg.MainButton.setParams({
                    text: `Посмотреть заказ (${totalPrice}$)`
                });
            }
        } else {
            // Скрываем кнопку, только если она была инициализирована
            if (isMainButtonInitialized.current) {
                tg.MainButton.hide();
                isMainButtonInitialized.current = false; // Сбрасываем состояние
            }
        }
    }, [cartItems, totalPrice, tg]);

    const onSendData = () => {
        navigate('/checkout'); // Переход на страницу Checkout
    };

    useEffect(() => {
        // Обработка события нажатия кнопки
        tg.onEvent('mainButtonClicked', onSendData);

        return () => {
            // Удаляем обработчик при размонтировании компонента
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