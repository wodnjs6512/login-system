import React, { useReducer } from 'react';
import { render, screen } from '@testing-library/react';
import Changepw from './index';

describe('AppTest', () => {
    it('CheckCode 페이지 렌더 테스트', () => {
        render(<Changepw />);
        const title = screen.getByText('인증 코드 검증 페이지');
        const codeInput = screen.getByPlaceholderText('인증코드 입력');
        const submit = screen.getByText('제출');

        expect(title).toBeInTheDocument();
        expect(codeInput).toBeInTheDocument();
        expect(submit).toBeInTheDocument();
    });
});
