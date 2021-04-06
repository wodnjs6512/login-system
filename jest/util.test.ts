import passwordStrengthChecker from '../utils/passwordStrengthChecker';
import emailValidator from '../utils/emailValidator';

// { fetcher, cookieParser, emailValidator, passwordStrengthChecker }

const testEmail1 = 'asdfasdfasdf';
const testEmail2 = 'asdfasdfas@';
const testEmail3 = 'asdfasdfas@asdfasdfasdf';
const testEmail4 = 'asdfasdfas@as.com';
const testEmail5 = 'asdfasdfas@as.co.kr';
const testEmail6 = '!1!@#!asdfasdfas@as.co.kr';
const testEmail7 = 'asdf';

test('emailValidator test', () => {
    expect(emailValidator(testEmail1)).toBe(false);
    expect(emailValidator(testEmail2)).toBe(false);
    expect(emailValidator(testEmail3)).toBe(false);
    expect(emailValidator(testEmail4)).toBe(true);
    expect(emailValidator(testEmail5)).toBe(true);
    expect(emailValidator(testEmail6)).toBe(false);
    expect(emailValidator(testEmail7)).toBe(false);
});

const passwordWeak1 = '11111111';
const passwordWeak2 = '12341234';
const passwordMedium1 = 'Ably!@#123';
const passwordMedium2 = 'Ably!@#123asf';
const passwordStrong1 = 'Ably!@#123asfq!!#!';
const passwordStrong2 = 'Ably!@#123asfq!@FGaF';

test('passwordStrengthChecker test', () => {
    expect(passwordStrengthChecker('')).toBe(0);
    expect(passwordStrengthChecker(passwordWeak1)).toBe(1);
    expect(passwordStrengthChecker(passwordWeak2)).toBe(1);
    expect(passwordStrengthChecker(passwordMedium1)).toBe(2);
    expect(passwordStrengthChecker(passwordMedium2)).toBe(2);
    expect(passwordStrengthChecker(passwordStrong1)).toBe(3);
    expect(passwordStrengthChecker(passwordStrong2)).toBe(3);
});
