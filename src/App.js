import './App.css';
import { useEffect } from "react";
import { useTelegram } from "./hooks/useTelegram";
import Header from "./components/Header/Header";
import { Route, Routes } from 'react-router-dom';
import ProductList from "./components/ProductList/ProductList";
import Form from "./components/Form/Form";
import CheckoutPage from "./components/CheckoutPage/CheckoutPage"; // Импорт новой страницы

function App() {
    const { onToggleButton, tg } = useTelegram();

    useEffect(() => {
        tg.ready();
    }, []);

    return (
        <div className="App">
            <Header />
            <Routes>
                <Route index element={<ProductList />} />
                <Route path={'form'} element={<Form />} />
                {/* Добавляем новый маршрут для завершения покупки */}
                <Route path={'checkout'} element={<CheckoutPage />} />
            </Routes>
        </div>
    );
}

export default App;