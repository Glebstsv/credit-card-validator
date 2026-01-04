import '../styles/main.css';
import { CardValidatorUI } from './dom.js';

document.addEventListener('DOMContentLoaded', () => {
    const app = new CardValidatorUI();
    console.log('Credit Card Validator запущен');
});

function addPaymentSystemStyles() {
    const style = document.createElement('style');
    style.textContent = `
        #logo-visa { background-image: url('https://img.icons8.com/color/96/000000/visa.png'); }
        #logo-mastercard { background-image: url('https://img.icons8.com/color/96/000000/mastercard.png'); }
        #logo-mir { background-image: url('https://img.icons8.com/color/96/000000/mir.png'); }
        #logo-amex { background-image: url('https://img.icons8.com/?size=100&id=13607&format=png&color=000000'); }
        #logo-discover { background-image: url('https://img.icons8.com/color/96/000000/discover.png'); }
        #logo-jcb { background-image: url('https://img.icons8.com/color/96/000000/jcb.png'); }
        #logo-diners { background-image: url('https://img.icons8.com/color/96/000000/diners-club.png'); }
    `;
    document.head.append(style);
}

setTimeout(addPaymentSystemStyles, 100);