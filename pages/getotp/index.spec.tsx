import { render, screen } from '@testing-library/react';
import Getotp from './index';

describe('AppTest', () => {
    it('Getotp 페이지 렌더 테스트', () => {
        render(<Getotp />);
    });
});
