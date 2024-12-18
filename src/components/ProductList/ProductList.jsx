import React, { useEffect } from "react";
import "./ProductList.css";
import ProductItem from "../ProductItem/ProductItem";
import { useTelegram } from "../../hooks/useTelegram";
import { useCart } from "../../contexts/CartContext"; // Контекст корзины
import { useNavigate } from "react-router-dom";

const products = [
    { id: "1", title: "Amanda", price: 40, description: "Post Karma: 3214 Comment Karma: 312 Date: 17.02.2021" },
    { id: "2", title: "Julia", price: 40, description: "Post Karma: 3214 Comment Karma: 312 Date: 17.02.2021" },
    { id: "3", title: "Maria", price: 40, description: "Post Karma: 3214 Comment Karma: 312 Date: 17.02.2021" },
    { id: "4", title: "Anna", price: 40, description: "Post Karma: 3214 Comment Karma: 312 Date: 17.02.2021" },
];

const ProductList = () => {
    const { tg } = useTelegram();
    const { cartItems, totalPrice } = useCart();
    const navigate = useNavigate();

    /**
     * Обновление кнопки: показываем, скрываем или изменяем параметры.
     */
    const updateMainButton = () => {
        if (cartItems.length > 0) {
            // Обновляем текст кнопки
            tg.MainButton.setParams({
                text: `Посмотреть заказ (${totalPrice}$)`,
                color: "#29B54D",
            });

            if (!tg.MainButton.isVisible) {
                tg.MainButton.show(); // Показываем кнопку только если она скрыта
            }
        } else {
            // Скрываем кнопку, если в корзине ничего нет
            if (tg.MainButton.isVisible) {
                tg.MainButton.hide();
            }
        }
    };

    useEffect(() => {
        // При монтировании сразу обновляем кнопку
        updateMainButton();

        // Обработка возвращения назад (если пользователь вернулся со страницы)
        const handleBackButton = () => {
            updateMainButton(); // Гарантируем, что кнопка обновится при возврате
        };

        tg.onEvent("navigatorBackButtonClicked", handleBackButton);

        return () => {
            tg.offEvent("navigatorBackButtonClicked", handleBackButton);
        };
    }, [cartItems, totalPrice, tg]);

    const onSendData = () => {
        navigate("/checkout"); // Переход на страницу Checkout
    };

    useEffect(() => {
        // Добавляем обработчик нажатия кнопки
        tg.onEvent("mainButtonClicked", onSendData);

        return () => {
            // Убираем обработчик при размонтировании
            tg.offEvent("mainButtonClicked", onSendData);
        };
    }, [onSendData, tg]);

    return (
        <div className="list">
            {products.map((item) => (
                <ProductItem key={item.id} product={item} />
            ))}
        </div>
    );
};

export default ProductList;