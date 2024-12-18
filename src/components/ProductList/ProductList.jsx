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

    // Логика для инициализации кнопки
    const setupMainButton = () => {
        if (cartItems.length > 0) {
            // Если в корзине есть товары, показываем кнопку
            tg.MainButton.setParams({
                text: `Посмотреть заказ (${totalPrice}$)`,
                color: "#29B54D",
            });
            tg.MainButton.show();
        } else {
            // Скрываем кнопку, если корзина пуста
            tg.MainButton.hide();
        }
    };

    useEffect(() => {
        // При загрузке/рендере страницы устанавливаем MainButton
        setupMainButton();

        // Подписываемся на нажатие кнопки
        tg.onEvent("mainButtonClicked", () => navigate("/checkout"));

        return () => {
            // Удаляем обработчики при размонтировании
            tg.offEvent("mainButtonClicked", () => navigate("/checkout"));
        };
    }, [cartItems, totalPrice, tg, navigate]);

    return (
        <div className="list">
            {products.map((item) => (
                <ProductItem key={item.id} product={item} />
            ))}
        </div>
    );
};

export default ProductList;