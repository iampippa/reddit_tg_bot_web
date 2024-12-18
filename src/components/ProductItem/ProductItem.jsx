import React, { useMemo } from "react";
import './ProductItem.css';
import { useCart } from '../../contexts/CartContext'; // Контекст корзины

const ProductItem = ({ product }) => {
    const { cartItems, addToCart } = useCart(); // Контекст корзины

    // Определяем, находится ли товар в корзине
    const isInCart = useMemo(() => {
        return cartItems.some((item) => item.id === product.id);
    }, [cartItems, product.id]);

    const handleAddOrRemove = () => {
        addToCart(product); // Управляем добавлением/удалением товара
    };

    console.log(`Product ${product.id} is in cart: ${isInCart}`); // для отладки

    return (
        <div className="product">
            <div className="img"></div>
            <h3>{product.title}</h3>
            <p className="description">{product.description}</p>
            <span>{product.price}$</span>
            <button
                className={`add-btn ${isInCart ? 'in-cart' : ''}`} // Динамический класс
                onClick={handleAddOrRemove}
            >
                {isInCart ? "Удалить" : "Добавить"} {/* Изменение текста кнопки */}
            </button>
        </div>
    );
};

export default ProductItem;