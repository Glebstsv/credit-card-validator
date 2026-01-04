export const paymentSystems = [
    {
        name: 'visa',
        displayName: 'Visa',
        pattern: /^4/,
        lengths: [13, 16, 19],
        image: 'visa.png'
    },
    {
        name: 'mir',
        displayName: 'Mir',
        pattern: /^220[0-4]/,
        lengths: [16, 17, 18, 19],
        image: 'mir.png'
    },
    {
        name: 'mastercard',
        displayName: 'MasterCard',
        // Упрощаем паттерн MasterCard: 51-55, 2221-2720
        pattern: /^(5[1-5]|2(22[1-9]|2[3-9]|[3-6]|7[0-1]|720))/,
        lengths: [16],
        image: 'mastercard.png'
    },
    {
        name: 'amex',
        displayName: 'American Express',
        pattern: /^3[47]/,
        lengths: [15],
        image: 'amex.png'
    },
    {
        name: 'discover',
        displayName: 'Discover',
        pattern: /^(6011|64[4-9]|65)/,
        lengths: [16, 19],
        image: 'discover.png'
    },
    {
        name: 'jcb',
        displayName: 'JCB',
        pattern: /^(352[8-9]|35[3-8][0-9])/,
        lengths: [16, 17, 18, 19],
        image: 'jcb.png'
    },
    {
        name: 'diners',
        displayName: 'Diners Club',
        pattern: /^(30[0-5]|309|36|3[8-9])/,
        lengths: [14, 15, 16, 17, 18, 19],
        image: 'diners.png'
    }
];

/**
 * Определение платежной системы по номеру карты
 * @param {string} cardNumber - Номер карты
 * @returns {Object|null} - Информация о платежной системе или null
 */
export function detectPaymentSystem(cardNumber) {
    if (!cardNumber || typeof cardNumber !== 'string') {
        return null;
    }
    
    const cleaned = cardNumber.replace(/\D/g, '');
    
    // Сначала проверяем Mir (2200-2204)
    if (/^220[0-4]/.test(cleaned) && [16, 17, 18, 19].includes(cleaned.length)) {
        return paymentSystems.find(s => s.name === 'mir');
    }
    
    // Затем проверяем остальные системы
    for (const system of paymentSystems) {
        // Пропускаем Mir, так как уже проверили
        if (system.name === 'mir') continue;
        
        if (system.pattern.test(cleaned)) {
            if (system.lengths.includes(cleaned.length)) {
                return system;
            }
        }
    }
    
    return null;
}

/**
 * @returns {Array} - Массив платежных систем
 */
export function getAllPaymentSystems() {
    return paymentSystems;
}