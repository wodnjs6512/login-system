import React, { useReducer } from 'react';
import { render, screen } from '@testing-library/react';
import UserInfo from './index';

describe('AppTest', () => {
    it('userinfo 페이지 렌더 테스트', () => {
        render(
            <UserInfo
                data={{
                    email: 'testemail@test.com',
                    profileImage: 'https://loremflickr.com/400/400',
                    name: 'testname',
                    lastConnectedAt: new Date(),
                }}
            />
        );
        const title = screen.getByText('회원 정보 조회');
        const email = screen.getByTestId('useremail');
        const name = screen.getByTestId('username');
        const profileImageWrapper = screen.getByTestId('profileImage');
        const profileImage = screen.getByAltText('alt_testname');
        const logoutBtn = screen.getByText('로그아웃');

        expect(title).toBeInTheDocument();
        expect(email).toBeInTheDocument();
        expect(name).toBeInTheDocument();
        expect(profileImageWrapper).toBeInTheDocument();
        expect(profileImage).toBeInTheDocument();
        expect(logoutBtn).toBeInTheDocument();
    });
});
