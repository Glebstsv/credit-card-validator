import { luhnCheck, formatCardNumber, cleanCardNumber } from '../../src/js/validator.js';

describe('Validator functions', () => {
    describe('luhnCheck', () => {
        test('should return true for valid Visa card', () => {
            expect(luhnCheck('4111111111111111')).toBe(true);
            expect(luhnCheck('4012888888881881')).toBe(true);
        });
        
        test('should return true for valid MasterCard', () => {
            expect(luhnCheck('5555555555554444')).toBe(true);
            expect(luhnCheck('5105105105105100')).toBe(true);
        });
        
        test('should return true for valid Mir card', () => {
            expect(luhnCheck('2200000000000004')).toBe(true);
        });
        
        test('should return false for invalid card numbers', () => {
            expect(luhnCheck('4111111111111112')).toBe(false);
            expect(luhnCheck('1234567812345678')).toBe(false);
        });
        
        test('should return false for non-numeric input after cleaning', () => {
            expect(luhnCheck('abcd')).toBe(false);
            expect(luhnCheck('4111-1111-1111-1111')).toBe(true);
        });
        
        test('should return false for too short numbers', () => {
            expect(luhnCheck('123456')).toBe(false);
        });
        
        test('should return false for too long numbers', () => {
            expect(luhnCheck('12345678901234567890')).toBe(false);
        });
        
        test('should return false for empty input', () => {
            expect(luhnCheck('')).toBe(false);
            expect(luhnCheck(null)).toBe(false);
            expect(luhnCheck(undefined)).toBe(false);
        });
    });
    
    describe('formatCardNumber', () => {
        test('should format card number with spaces', () => {
            expect(formatCardNumber('4111111111111111')).toBe('4111 1111 1111 1111');
            expect(formatCardNumber('4111 1111 1111 1111')).toBe('4111 1111 1111 1111');
        });
        
        test('should handle partial numbers', () => {
            expect(formatCardNumber('4111')).toBe('4111');
            expect(formatCardNumber('411111')).toBe('4111 11');
        });
        
        test('should remove non-digit characters', () => {
            expect(formatCardNumber('4111-1111-1111-1111')).toBe('4111 1111 1111 1111');
            expect(formatCardNumber('4111 1111 1111 1111')).toBe('4111 1111 1111 1111');
        });
        
        test('should return empty string for empty input', () => {
            expect(formatCardNumber('')).toBe('');
            expect(formatCardNumber(null)).toBe('');
        });
    });
    
    describe('cleanCardNumber', () => {
        test('should remove non-digit characters', () => {
            expect(cleanCardNumber('4111-1111-1111-1111')).toBe('4111111111111111');
            expect(cleanCardNumber('4111 1111 1111 1111')).toBe('4111111111111111');
            expect(cleanCardNumber('abcd')).toBe('');
            expect(cleanCardNumber('4111abcd1111efgh1111')).toBe('411111111111');
        });
        
        test('should return empty string for empty input', () => {
            expect(cleanCardNumber('')).toBe('');
            expect(cleanCardNumber(null)).toBe('');
        });
    });
});