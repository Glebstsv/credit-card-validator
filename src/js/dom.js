import { formatCardNumber, luhnCheck } from './validator.js';
import { detectPaymentSystem, getAllPaymentSystems } from './paymentSystems.js';

export class CardValidatorUI {
    constructor() {
        this.cardInput = document.getElementById('cardNumber');
        this.paymentSystemsContainer = document.getElementById('paymentSystems');
        this.validationResult = document.getElementById('validationResult');
        this.resultText = document.getElementById('resultText');
        this.resultIcon = this.validationResult.querySelector('.result-icon');
        
        this.init();
    }
    
    init() {
        this.renderPaymentSystemLogos();
        this.setupEventListeners();
    }
    
    renderPaymentSystemLogos() {
        const systems = getAllPaymentSystems();
        
        systems.forEach(system => {
            const logoDiv = document.createElement('div');
            logoDiv.className = 'payment-system';
            logoDiv.id = `logo-${system.name}`;
            logoDiv.title = system.displayName;
            
            this.paymentSystemsContainer.append(logoDiv);
        });
    }
    
    setupEventListeners() {
        this.cardInput.addEventListener('input', this.handleCardInput.bind(this));
        this.cardInput.addEventListener('keypress', this.handleKeyPress.bind(this));
        this.cardInput.addEventListener('paste', this.handlePaste.bind(this));
    }
    
    handleCardInput(event) {
        let value = event.target.value;
        const cursorPosition = event.target.selectionStart;
        
        const formatted = formatCardNumber(value);
        this.cardInput.value = formatted;
        
        setTimeout(() => {
            const newCursorPosition = this.calculateNewCursorPosition(value, formatted, cursorPosition);
            this.cardInput.setSelectionRange(newCursorPosition, newCursorPosition);
        }, 0);
        
        this.validateCard(formatted);
    }
    
    handleKeyPress(event) {
        const char = String.fromCharCode(event.keyCode || event.which);
        if (!/[\d\b\t\n]/.test(char) && event.keyCode !== 8 && event.keyCode !== 46) {
            event.preventDefault();
        }
    }
    
    handlePaste(event) {
        event.preventDefault();
        const pastedText = (event.clipboardData || window.clipboardData).getData('text');
        const digitsOnly = pastedText.replace(/\D/g, '');
        const formatted = formatCardNumber(digitsOnly);
        
        this.cardInput.value = formatted;
        this.validateCard(formatted);
    }
    
    calculateNewCursorPosition(oldValue, newValue, oldCursorPosition) {
        const digitsBeforeCursor = oldValue.substring(0, oldCursorPosition).replace(/\D/g, '').length;
        let newPosition = 0;
        let digitCount = 0;
        
        for (let i = 0; i < newValue.length; i++) {
            if (/\d/.test(newValue[i])) {
                digitCount++;
            }
            if (digitCount === digitsBeforeCursor) {
                newPosition = i + 1;
                break;
            }
        }
        
        return newPosition;
    }
    
    validateCard(cardNumber) {
        this.clearResults();
        
        if (!cardNumber || cardNumber.trim() === '') {
            return;
        }
        
        const cleanedNumber = cardNumber.replace(/\s/g, '');
        const paymentSystem = detectPaymentSystem(cleanedNumber);
        const isValid = luhnCheck(cleanedNumber);
        
        this.highlightPaymentSystem(paymentSystem);
        this.showValidationResult(cleanedNumber, isValid, paymentSystem);
    }
    
    clearResults() {
        const logos = this.paymentSystemsContainer.querySelectorAll('.payment-system');
        logos.forEach(logo => {
            logo.classList.remove('active');
        });
        
        this.validationResult.className = 'result';
        this.cardInput.classList.remove('valid', 'error');
    }
    
    highlightPaymentSystem(paymentSystem) {
        if (!paymentSystem) return;
        
        const logo = document.getElementById(`logo-${paymentSystem.name}`);
        if (logo) {
            logo.classList.add('active');
        }
    }
    
    showValidationResult(cardNumber, isValid, paymentSystem) {
        if (isValid && paymentSystem) {
            this.validationResult.className = 'result valid';
            this.resultIcon.className = 'fas fa-check-circle result-icon';
            this.resultText.textContent = `Карта ${paymentSystem.displayName} валидна`;
            this.cardInput.classList.add('valid');
        } else if (!isValid && paymentSystem) {
            this.validationResult.className = 'result invalid';
            this.resultIcon.className = 'fas fa-times-circle result-icon';
            this.resultText.textContent = `Неверный номер карты ${paymentSystem.displayName}`;
            this.cardInput.classList.add('error');
        } else if (!paymentSystem) {
            this.validationResult.className = 'result invalid';
            this.resultIcon.className = 'fas fa-question-circle result-icon';
            this.resultText.textContent = 'Неизвестная платежная система';
            this.cardInput.classList.add('error');
        }
    }
}