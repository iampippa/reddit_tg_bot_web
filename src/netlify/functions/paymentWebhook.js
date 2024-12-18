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
        // Получаем данные из запроса
        const { status, order_id } = JSON.parse(event.body);

        if (status === "paid") {
            // Логика при подтверждении платежа
            console.log(`Заказ ${order_id} был оплачен.`);

            // Отправка файла через Telegram
            const chatId = getChatIdByOrder(order_id); // Ваша логика получения chat_id
            const filePath = getFilePathByOrder(order_id); // Логика получения файла

            await axios.post(
                `https://api.telegram.org/bot<YOUR_TELEGRAM_BOT_TOKEN>/sendDocument`,
                {
                    chat_id: chatId,
                    document: filePath,
                    caption: "Спасибо за покупку! Вот ваш файл.",
                }
            );
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Webhook обработан успешно." }),
        };
    } catch (error) {
        console.error("Ошибка обработки webhook:", error);

        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Ошибка обработки webhook." }),
        };
    }
};

// Заглушки для получения chat_id и файлов
const getChatIdByOrder = (orderId) => {
    return "123456789"; // Пример chat_id Telegram
};

const getFilePathByOrder = (orderId) => {
    return "https://<ваш-сайт>/files/example.pdf"; // Путь к файлу
};