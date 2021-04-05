import React, { useEffect, useContext } from 'react';
// @ts-ignore babel alias error
import { Context, RESET_STATE, VERIFIED } from '@reducers';
// @ts-ignore babel alias error
import fetcher from '@utils/fetcher';

/**
 * 비밀번호 변경 페이지
 * */
const Index = () => {
    const { store, dispatch } = useContext(Context);

    return (
        <div>
            비밀번호 변경 페이지
            {JSON.stringify(store)}
        </div>
    );
};
export default Index;
