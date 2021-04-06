import React, { useEffect, useCallback, useRef, FormEvent } from 'react';
import styled from '@emotion/styled';
// @ts-ignore babel alias error
import fetcher from '@utils/fetcher';
// @ts-ignore babel alias error
import emailValidator from '@utils/emailValidator';

import { useCookies } from 'react-cookie';
import Router from 'next/router';

/**
 * 로그인 페이지
 * */
const Login = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);

    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const rememberMeRef = useRef(null);
    useEffect(() => {
        if (cookies.rememberMe) {
            if (emailRef) {
                emailRef.current.value = cookies.rememberMe;
            }
            if (rememberMeRef) {
                rememberMeRef.current.checked = cookies.rememberMe ? true : false;
            }
        }
    }, [cookies.rememberMe, emailRef, rememberMeRef]);

    const toResetPassword = useCallback(() => {
        Router.push('/');
    }, []);

    const tryLogin = useCallback(async (e: FormEvent): Promise<any> => {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const rememberMe = rememberMeRef.current.checked;
        if (!emailValidator(email) || !email.length) {
            return alert('올바르지 않은 이메일입니다.');
        } else if (!password.length) {
            return alert('비밀번호를 입력해주세요');
        }
        try {
            const { accessToken } = await fetcher({
                url: '/api/login',
                method: 'POST',
                body: {
                    email,
                    password,
                },
            });
            const cookieOptions = {
                secure: true,
                // 로컬 호스트가 아니라면 httpOnly 옵션을 키고 쓰는것이 보안에서 유리
                // httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24, // 계속 로그인 유지 할 경우 이와 같은 방식으로
                // 만약 세션으로 유지하려면 unset
            };
            if (rememberMe) {
                setCookie('rememberMe', email, cookieOptions);
            } else {
                removeCookie('rememberMe');
            }
            setCookie('Authorization', `Bearer ${accessToken}`, cookieOptions);

            await alert('로그인 완료');
            Router.push('/userinfo');
        } catch (err) {
            alert(err.message || '알수 없는 에러');
        }
    }, []);

    return (
        <div>
            <h1>로그인</h1>
            <form onSubmit={tryLogin}>
                <input ref={emailRef} type="text" placeholder="이메일을 입력해 주세요" />
                <input ref={passwordRef} type="password" placeholder="비밀번호를 입력해 주세요" />
                <div className="row">
                    <SubMenuCell htmlFor={'rememberMe'}>
                        <input id="rememberMe" ref={rememberMeRef} type="checkbox" />
                        <p>아이디 저장</p>
                    </SubMenuCell>
                    <SubMenuCell>
                        <a onClick={toResetPassword}>비밀번호 재설정</a>
                    </SubMenuCell>
                </div>
                <input type="submit" value="로그인" />
            </form>
        </div>
    );
};

const SubMenuCell = styled.label`
    display: flex;
    a {
        cursor: pointer;
        margin: auto 5px;
    }
    p {
        margin: auto 5px;
    }
`;
export default Login;
