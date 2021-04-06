import React, { useEffect, useCallback } from 'react';
import styled from '@emotion/styled';
import { useCookies } from 'react-cookie';
import type { AppProps } from 'next/app';

import fetcher from '../../utils/fetcher';
import cookieParser from '../../utils/cookieParser';

/**
 * 회원 정보 조회
 * 페이지 1로 사용합니다.
 * */
const UserInfo = ({ data }) => {
    useEffect(() => {
        if (!data && confirm('로그인해주세요')) {
            location.href = '/';
        }
    }, []);

    return (
        <div>
            <h1>회원 정보 조회</h1>
            <Container>
                <CardItem profileData={data}></CardItem>
            </Container>
        </div>
    );
};

const CardItem = (props: { profileData: IProfileData }) => {
    const { email, name, profileImage, lastConnectedAt } = props?.profileData || {};
    const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);

    const logout = useCallback(async () => {
        // ably452@dummy.com
        try {
            const result = await fetcher({
                url: '/api/logout',
                method: 'POST',
                additionalHeaders: { Authorization: cookies.Authorization },
            });
        } catch (err) {
            alert('로그아웃에 실패했습니다');
        }

        removeCookie('Authorization');
        location.href = '/';
    }, []);

    return (
        <CardItemWrapper>
            <div id="profileImage" data-testid="profileImage">
                <img src={profileImage} alt={`alt_${name}`} />
            </div>
            <h3 data-testid="username">
                <p>닉네임 : {name}</p>
            </h3>
            <h3 data-testid="useremail">
                <p>이메일 : {email}</p>
            </h3>
            <button onClick={logout}>로그아웃</button>
        </CardItemWrapper>
    );
};

const Container = styled.div`
    display: flex;
    margin: 0 auto;
`;

const CardItemWrapper = styled.div`
    display: flex;
    width: 300px;
    height: 400px;
    flex-direction: column;
    background-color: aliceblue;
    border-radius: 10px;
    #profileImage {
        display: flex;
        flex-direction: column;
        width: 200px;
        height: 200px;
        margin: 30px auto;
        img {
            border-radius: 50%;
        }
    }
    p {
        margin: 0;
        text-align: center;
    }
    button {
        height: 50px;
        margin: 20px;
    }
`;

export const getServerSideProps = async (ctx) => {
    const { req, res } = ctx;
    const Cookie = cookieParser(req);
    try {
        const result = await fetcher({
            url: '/api/user',
            method: 'GET',
            additionalHeaders: { Authorization: Cookie.Authorization },
        });
        return { props: { data: result } };
    } catch (err) {
        return { props: {} };
    }
};
export default UserInfo;
