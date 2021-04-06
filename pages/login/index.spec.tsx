import React, { useReducer } from 'react';
import { render, screen } from '@testing-library/react';
import ChangePw from './index';

describe('AppTest', () => {
    it('changepw 페이지 렌더 테스트', () => {
        render(<ChangePw />);
        const emailInput = screen.getByPlaceholderText('이메일을 입력해 주세요');
        const pwInput = screen.getByPlaceholderText('비밀번호를 입력해 주세요');
        const rememberMe = screen.getByText('아이디 저장');
        const rememberCheckBox = screen.getByTestId('checkbox');
        const resetPw = screen.getByText('비밀번호 재설정');
        const submit = screen.getByTestId('loginButton');

        expect(emailInput).toBeInTheDocument();
        expect(pwInput).toBeInTheDocument();
        expect(rememberMe).toBeInTheDocument();
        expect(rememberCheckBox).toBeInTheDocument();
        expect(resetPw).toBeInTheDocument();
        expect(submit).toBeInTheDocument();
    });
});
