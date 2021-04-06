import React from 'react';
import { render, screen } from '@testing-library/react';
import Getotp from './index';

describe('AppTest', () => {
    it('Getotp 페이지 렌더 테스트', () => {
        render(<Getotp />);
        const title = screen.getByText('이메일 입력');
        const submit = screen.getByText('제출');
        const emailInput = screen.getByPlaceholderText('이메일을 입력해 주세요');

        expect(title).toBeInTheDocument();
        expect(emailInput).toBeInTheDocument();
        expect(submit).toBeInTheDocument();
    });
});
