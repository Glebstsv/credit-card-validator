/**
 * Проверка номера карты по алгоритму Луна
 * @param {string} cardNumber - Номер карты (без пробелов)
 * @returns {boolean} - Валидность номера карты
 */
export function luhnCheck(cardNumber) {
    if (!cardNumber || typeof cardNumber !== 'string') {
        return false;
    }
    
    const cleaned = cardNumber.replace(/\D/g, '');
    
    if (!/^\d{13,19}$/.test(cleaned)) {
        return false;
    }
    
    let sum = 0;
    let isEven = false;

        // Идем с конца номера
    for (let i = cleaned.length - 1; i >= 0; i--) {
        let digit = parseInt(cleaned.charAt(i), 10);
        
        if (isEven) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }
        
        sum += digit;
        isEven = !isEven;
    }
    
    return sum % 10 === 0;
}

/**
 * Форматирование номера карты (добавление пробелов через каждые 4 цифры)
 * @param {string} cardNumber - Номер карты
 * @returns {string} - Отформатированный номер карты
 */
export function formatCardNumber(cardNumber) {
    if (!cardNumber) return '';
    
    const cleaned = cardNumber.replace(/\D/g, '');
    const limited = cleaned.substring(0, 19);
        const parts = [];
    for (let i = 0; i < limited.length; i += 4) {
        parts.push(limited.substring(i, i + 4));
    }
    
    return parts.join(' ').trim();
}

/**
 * Очистка номера карты от нецифровых символов
 * @param {string} cardNumber - Номер карты
 * @returns {string} - Очищенный номер карты
 */
export function cleanCardNumber(cardNumber) {
    if (!cardNumber) return '';
    return cardNumber.replace(/\D/g, '');
}