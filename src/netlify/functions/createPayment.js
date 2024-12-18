const axios = require("axios");

exports.handler = async (event) => {
    // Проверяем, что это POST запрос
    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: "Method Not Allowed" }),
        };
    }

    try {
        // Получаем данные из запроса (React отправит их)
        const { method, orderId, amount } = JSON.parse(event.body);

        let paymentUrl = "";

        if (method === "crypto") {
            // Создание платежного запроса для Cryptomus
            const response = await axios.post(
                "https://api.cryptomus.com/v1/payment",
                {
                    amount: amount,
                    currency: "USDT",
                    order_id: orderId,
                    webhook_url: "https://startling-dusk-3db558.netlify.app/.netlify/functions/paymentWebhook",
                    url_return: "https://startling-dusk-3db558.netlify.app/success",
                },
                {
                    headers: {
                        Authorization: "Bearer YOUR_CRYPTOMUS_API_KEY", // Замените на ваш API ключ
                    },
                }
            );

            // Получаем платежную ссылку
            paymentUrl = response.data.result.url;
        } else if (method === "paypal") {
            // Логика запросов PayPal (пока заглушка)
            paymentUrl = "https://paypal.com/example-payment";
        } else if (method === "binance") {
            // Логика для Binance Pay (пока заглушка)
            paymentUrl = "https://binancepay.example";
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ paymentUrl }),
        };
    } catch (error) {
        console.error("Ошибка создания платежа:", error);

        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Ошибка при создании платежа." }),
        };
    }
};