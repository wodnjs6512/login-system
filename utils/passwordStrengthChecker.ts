const passwordStrengthChekcer = (newPassword: string): number => {
    const strongRegex = new RegExp('^(?=.{14,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$', 'g');
    const mediumRegex = new RegExp(
        '^(?=.{10,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$',
        'g'
    );
    const enoughRegex = new RegExp('(?=.{8,}).*', 'g');

    if (strongRegex.test(newPassword)) {
        return 3;
    } else if (mediumRegex.test(newPassword)) {
        return 2;
    } else if (enoughRegex.test(newPassword)) {
        return 1;
    } else {
        return 0;
    }
};

export default passwordStrengthChekcer;
