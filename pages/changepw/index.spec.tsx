import React, { useReducer } from 'react';
import { render, screen } from '@testing-library/react';
import ChangePw from './index';

describe('AppTest', () => {
    it('changepw 페이지 렌더 테스트', () => {
        render(<ChangePw />);
        const title = screen.getByText('비밀번호 변경 페이지');
        const pwInput = screen.getByPlaceholderText('비밀번호 입력');
        const pwConfirmInput = screen.getByPlaceholderText('비밀번호 확인');
        const submit = screen.getByText('비밀번호 변경');

        expect(title).toBeInTheDocument();
        expect(pwInput).toBeInTheDocument();
        expect(pwConfirmInput).toBeInTheDocument();
        expect(submit).toBeInTheDocument();
    });
});
