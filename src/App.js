import './App.css';
import { useEffect } from "react";
import { useTelegram } from "./hooks/useTelegram";
import Header from "./components/Header/Header";
import { Route, Routes } from 'react-router-dom';
import ProductList from "./components/ProductList/ProductList";
import Form from "./components/Form/Form";
import CheckoutPage from "./components/CheckoutPage/CheckoutPage";
import { CartProvider } from './contexts/CartContext'; // Импортируем контекст корзины

function App() {
    const { tg } = useTelegram();

    useEffect(() => {
        tg.ready();
    }, [tg]);

    return (
        <CartProvider> {/* Оборачиваем приложение в CartProvider */}
            <div className="App">
                <Header />
                <Routes>
                    <Route index element={<ProductList />} />
                    <Route path={'form'} element={<Form />} />
                    <Route path={'checkout'} element={<CheckoutPage />} />
                </Routes>
            </div>
        </CartProvider>
    );
}

export default App;