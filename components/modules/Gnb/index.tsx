import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Gnb = () => {
    const hamburgerRef = useRef();
    const router = useRouter();
    const [show, setShow] = useState(false);
    const handleShow = () => {
        setShow(!show);
    };
    const closeHamburgerMenu = () => {
        setShow(false);
    };

    useEffect(() => {
        router.events.on('routeChangeStart', () => {
            closeHamburgerMenu();
        });
    }, []);

    useMemo(() => {}, []);
    return (
        <HeaderContainer>
            <Link href="/">
                <Logo>로그인 시스템</Logo>
            </Link>

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
                        <Link href="/userinfo">회원 정보 조회</Link>
                    </NavItem>
                </NavRow>
            </NavContainer>
            <SideMenu show={show}>
                <NavItem>
                    <Link href="/getotp">인증 코드 발급 요청</Link>
                </NavItem>
                <NavItem>
                    <Link href="/checkcode">인증 코드 검증</Link>
                </NavItem>
                <NavItem>
                    <Link href="/changepw">비밀번호 변경 페이지</Link>
                </NavItem>
                <NavItem>
                    <Link href="/login">로그인</Link>
                </NavItem>
                <NavItem>
                    <Link href="/userinfo">회원 정보 조회</Link>
                </NavItem>
            </SideMenu>
            <HamburgerIconWrapper>
                <HamburgerContainer onClick={handleShow}>
                    <Bar1 show={show} />
                    <Bar2 show={show} />
                    <Bar3 show={show} />
                </HamburgerContainer>
            </HamburgerIconWrapper>
        </HeaderContainer>
    );
};

const HamburgerIconWrapper = styled.div`
    position: absolute;
    right: 10px;
    top: 10px;
    z-index: 101;
    @media (min-width: 769px) {
        display: none;
    }
`;

const HamburgerContainer = styled.div`
    display: inline-block;
    cursor: pointer;
    z-index: 101;
    > div {
        width: 35px;
        height: 5px;
        background-color: #333;
        margin: 6px 0;
        transition: 0.4s;
    }
`;

const Bar1 = styled.div<CustomHTMLElement>`
    ${(props) =>
        props.show &&
        '-webkit-transform: rotate(-45deg) translate(-9px, 6px);transform: rotate(-45deg) translate(-9px, 6px);'}
`;

const Bar2 = styled.div<CustomHTMLElement>`
    ${(props) => props.show && 'opacity: 0;'}
`;

const Bar3 = styled.div<CustomHTMLElement>`
    ${(props) =>
        props.show &&
        '-webkit-transform: rotate(45deg) translate(-8px, -8px);transform: rotate(45deg) translate(-8px, -8px);'}
`;

const SideMenu = styled.div<CustomHTMLElement>`
    position: fixed;
    z-index: 100;
    height: 100%;
    width: 300px;
    background-color: white;
    right: 0px;
    top: 0px;
    visibility: hidden;
    opacity: 0;
    ${(props) => props.show && 'visibility: visible; opacity: 1;'}
    transition: all 1s;
    padding-top: 80px;
`;

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
    margin: 0 auto;
    text-align: center;
    a {
        flex: 1;
    }
`;
const NavContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    @media (max-width: 768px) {
        display: none;
    }
`;

const NavRow = styled.div`
    display: flex;
    flex-direction: row;
`;

export default Gnb;
