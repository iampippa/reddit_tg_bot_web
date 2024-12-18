import React, { useEffect, useCallback } from "react";
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

    const setupMainButton = useCallback(() => {
        if (cartItems.length > 0) {
            tg.MainButton.setParams({
                text: `Посмотреть заказ (${totalPrice}$)`,
                color: "#29B54D",
            });
            tg.MainButton.show();
        } else {
            tg.MainButton.hide();
        }
    }, [cartItems.length, totalPrice, tg.MainButton]);

    useEffect(() => {
        // Устанавливаем MainButton при монтировании и обновлении корзины
        setupMainButton();

        tg.onEvent("mainButtonClicked", () => navigate("/checkout"));

        return () => {
            tg.offEvent("mainButtonClicked", () => navigate("/checkout"));
        };
    }, [setupMainButton, tg, navigate]);

    return (
        <div className="list">
            {products.map((item) => (
                <ProductItem key={item.id} product={item} />
            ))}
        </div>
    );
};

export default ProductList;