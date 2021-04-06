const passwordStrengthChecker = (newPassword: string): number => {
    const strongRegex = new RegExp('^(?=.{14,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$', 'g');
    // 대문자 소문자 특수문자 합쳐 14자 이상
    const mediumRegex = new RegExp(
        '^(?=.{10,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$',
        'g'
    ); // 대문자 소문자 특수문자 합쳐 10자 ~ 14자
    const enoughRegex = new RegExp('(?=.{8,}).*', 'g');
    // 그냥 8자 정도
    if (newPassword.length == 0) {
        return 0;
    } else if (strongRegex.test(newPassword)) {
        return 3;
    } else if (mediumRegex.test(newPassword)) {
        return 2;
    } else if (enoughRegex.test(newPassword)) {
        return 1;
    } else {
        return 0;
    }
};

export default passwordStrengthChecker;
