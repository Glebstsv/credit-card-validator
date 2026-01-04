import { detectPaymentSystem, getAllPaymentSystems } from '../../src/js/paymentSystems.js';

describe('Payment System Detection', () => {
    describe('detectPaymentSystem', () => {
        test('should detect Visa cards', () => {
            const visa = detectPaymentSystem('4111111111111111');
            expect(visa).not.toBeNull();
            expect(visa.name).toBe('visa');
            
            const visa2 = detectPaymentSystem('4012888888881881');
            expect(visa2.name).toBe('visa');
        });
        
        test('should detect MasterCard cards', () => {
            const mc = detectPaymentSystem('5555555555554444');
            expect(mc.name).toBe('mastercard');
            
            const mc2 = detectPaymentSystem('5105105105105100');
            expect(mc2.name).toBe('mastercard');
        });
        
        test('should detect Mir cards', () => {
            const mir = detectPaymentSystem('2200000000000004');
            expect(mir.name).toBe('mir');
            
            const mir2 = detectPaymentSystem('2201382000000013');
            expect(mir2.name).toBe('mir');
        });
        
        test('should detect American Express cards', () => {
            const amex = detectPaymentSystem('371449635398431');
            expect(amex.name).toBe('amex');
            
            const amex2 = detectPaymentSystem('378734493671000');
            expect(amex2.name).toBe('amex');
        });
        
        test('should detect Discover cards', () => {
            const discover = detectPaymentSystem('6011111111111117');
            expect(discover.name).toBe('discover');
        });
        
        test('should return null for unknown cards', () => {
            expect(detectPaymentSystem('1234567812345678')).toBeNull();
            expect(detectPaymentSystem('')).toBeNull();
            expect(detectPaymentSystem(null)).toBeNull();
        });
    });
    
    describe('getAllPaymentSystems', () => {
        test('should return all payment systems', () => {
            const systems = getAllPaymentSystems();
            expect(Array.isArray(systems)).toBe(true);
            expect(systems.length).toBe(7);
            
            const systemNames = systems.map(s => s.name);
            expect(systemNames).toContain('visa');
            expect(systemNames).toContain('mastercard');
            expect(systemNames).toContain('mir');
        });
        
        test('each system should have required properties', () => {
            const systems = getAllPaymentSystems();
            
            systems.forEach(system => {
                expect(system).toHaveProperty('name');
                expect(system).toHaveProperty('displayName');
                expect(system).toHaveProperty('pattern');
                expect(system).toHaveProperty('lengths');
                expect(system).toHaveProperty('image');
            });
        });
    });
});