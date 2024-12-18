import React, { useState, useCallback, useEffect } from 'react';
import './ProductList.css';
import ProductItem from "../ProductItem/ProductItem";
import { useTelegram } from "../../hooks/useTelegram";
import { useNavigate } from 'react-router-dom'; // Хук для навигации

const products = [
    { id: '1', title: 'Amanda', price: 40, description: 'Post Karma: 3214 Comment Karma: 312 Date: 17.02.2021' },
    { id: '2', title: 'Julia', price: 40, description: 'Post Karma: 3214 Comment Karma: 312 Date: 17.02.2021' },
    { id: '3', title: 'Maria', price: 40, description: 'Post Karma: 3214 Comment Karma: 312 Date: 17.02.2021' },
    { id: '4', title: 'Anna', price: 40, description: 'Post Karma: 3214 Comment Karma: 312 Date: 17.02.2021' },
    { id: '5', title: 'Julia', price: 40, description: 'Post Karma: 3214 Comment Karma: 312 Date: 17.02.2021' },
    { id: '6', title: 'Куртка 7', price: 40, description: 'Post Karma: 3214 Comment Karma: 312 Date: 17.02.2021' },
    { id: '7', title: 'Джинсы 4', price: 40, description: 'Post Karma: 3214 Comment Karma: 312 Date: 17.02.2021' },
    { id: '8', title: 'Куртка 5', price: 40, description: 'Post Karma: 3214 Comment Karma: 312 Date: 17.02.2021' },
];

const getTotalPrice = (items = []) => {
    return items.reduce((acc, item) => acc + item.price, 0);
};

const ProductList = () => {
    const [addedItems, setAddedItems] = useState([]);
    const { tg } = useTelegram();
    const navigate = useNavigate(); // Используем хук навигации

    const onSendData = useCallback(() => {
        // Перенаправление на страницу завершения покупки
        navigate('/checkout', {
            state: {
                products: addedItems,
                totalPrice: getTotalPrice(addedItems),
            },
        });
    }, [addedItems, navigate]);

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData);
        return () => {
            tg.offEvent('mainButtonClicked', onSendData);
        };
    }, [onSendData, tg]);

    const onAdd = (product) => {
        const alreadyAdded = addedItems.find((item) => item.id === product.id);
        let newItems = [];

        if (alreadyAdded) {
            newItems = addedItems.filter((item) => item.id !== product.id);
        } else {
            newItems = [...addedItems, product];
        }

        setAddedItems(newItems);

        if (newItems.length === 0) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
            tg.MainButton.hasShineEffect = true;
            tg.MainButton.setParams({
                color: "#29B54D",
                text: `Посмотреть заказ`,
            });
        }
    };

    return (
        <div className="list">
            {products.map((item) => (
                <ProductItem product={item} onAdd={onAdd} className="item" />
            ))}
        </div>
    );
};

export default ProductList;