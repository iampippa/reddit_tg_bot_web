import React, { useState } from 'react';
import Button from "../Button/Button";
import './ProductItem.css';

const ProductItem = ({ product, className, onAdd }) => {
    const [isInCart, setIsInCart] = useState(false); // Локальное состояние кнопки

    const onAddHandler = () => {
        setIsInCart(!isInCart); // Переключение состояния кнопки
        onAdd(product); // Вызов переданного метода "onAdd"
    }

    return (
        <div className={'product ' + className}>
            <div className={'img'} />
            <div className={'title'}>{product.title}</div>
            <div className={'description'}>{product.description}</div>
            <div className={'price'}>
                <span>Цена: <b>{product.price}$</b></span>
            </div>
            <Button
                className={`add-btn ${isInCart ? 'in-cart' : ''}`} // Динамическое добавление класса кнопке
                onClick={onAddHandler}
            >
                {isInCart ? 'Удалить' : 'Добавить'} {/* Динамический текст кнопки */}
            </Button>
        </div>
    );
};

export default ProductItem;
