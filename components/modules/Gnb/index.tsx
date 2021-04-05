import styled from '@emotion/styled';
import Router from 'next/router';
import { useCallback } from 'react';
import Link from 'next/link';

const HeaderContainer = styled.div`
    position: relative;
    height: 80px;
    z-index: 100;
    background-color: aliceblue;
    line-height: 30px;
    padding: 10px;
    display: flex;
`;

const Logo = styled.div`
    line-height: 40px;
    font-size: 20px;
    background-color: rgba(100, 100, 100, 0.5);
    padding: 10px;
`;

const NavItem = styled.div`
    display: flex;
    flex: 1;
    align-items: center;
    text-align: center;
    a {
        flex: 1;
    }
`;
const NavContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`;

const NavRow = styled.div`
    display: flex;
    flex-direction: row;
`;

const Gnb = () => {
    const handleNavClick = useCallback((target: string) => {
        Router.push(target);
    }, []);
    return (
        <HeaderContainer>
            <Logo>로그인 시스템 더미</Logo>
            <NavContainer>
                <NavRow>
                    <NavItem>
                        <Link href="/getotp">인증 코드 발급 요청</Link>
                    </NavItem>
                    <NavItem>
                        <Link href="/checkcode">인증 코드 검증</Link>
                    </NavItem>
                    <NavItem>
                        <Link href="/changepw">비밀번호 변경 페이지</Link>
                    </NavItem>
                </NavRow>
                <NavRow>
                    <NavItem>
                        <Link href="/login">로그인</Link>
                    </NavItem>
                    <NavItem>
                        <Link href="/useringo">회원 정보 조회</Link>
                    </NavItem>
                </NavRow>
            </NavContainer>
        </HeaderContainer>
    );
};

export default Gnb;
