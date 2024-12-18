import React, { useEffect, useState } from "react";
import './ProductItem.css';
import { useCart } from '../../contexts/CartContext'; // Используем контекст корзины

const ProductItem = ({ product }) => {
    const { cartItems, addToCart } = useCart(); // Получаем данные корзины и метод добавления
    const [isInCart, setIsInCart] = useState(false); // Локальное состояние кнопки

    useEffect(() => {
        // Проверяем, если товар находится в корзине, обновляем локальное состояние
        const itemInCart = cartItems.some((item) => item.id === product.id);
        setIsInCart(itemInCart);
    }, [cartItems, product.id]); // Проверка выполняется при изменении корзины или id товара

    const handleAddOrRemove = () => {
        addToCart(product); // Добавляем или удаляем товар из корзины
    };

    return (
        <div className="product-item">
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <span>{product.price}$</span>
            <button onClick={handleAddOrRemove}>
                {isInCart ? "Удалить" : "Добавить"} {/* Обновление кнопки */}
            </button>
        </div>
    );
};

export default ProductItem;