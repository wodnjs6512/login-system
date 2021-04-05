import React, { useEffect } from 'react';

// @ts-ignore babel alias error
import fetcher from '@utils/fetcher';
// @ts-ignore babel alias error
import cookieParser from '@utils/cookieParser';

/**
 * 회원 정보 조회
 * 페이지 1로 사용합니다.
 * */
const UserInfo = ({ data }) => {
    return <div>회원 정보 조회{JSON.stringify(data)}</div>;
};

export const getServerSideProps = async (ctx) => {
    const { req } = ctx;
    const Cookie = cookieParser(req);
    const result = await fetcher({
        url: '/api/user',
        method: 'GET',
        additionalHeaders: { Authorization: Cookie.Authorization },
    });
    console.log(result);
    return { props: { data: result } };
};
export default UserInfo;
