import React, { useEffect, useContext, useRef, useCallback } from 'react';
// @ts-ignore babel alias error
import { Context, RESET_STATE, VERIFIED } from '@reducers';
// @ts-ignore babel alias error
import fetcher from '@utils/fetcher';
import Router from 'next/router';

/**
 * 비밀번호 변경 페이지
 * */
const Index = () => {
    const { store, dispatch } = useContext(Context);
    const { email, confirmToken } = store;
    const password = useRef(null);
    const passwordConfirm = useRef(null);

    const changePw = useCallback(async () => {
        const newPassword = password.current.value;
        const newPasswordConfirm = passwordConfirm.current.value;
        if (!email || !confirmToken) {
            return alert('세션 만료 되었습니다.');
        }
        if (!newPassword) {
            return alert('새로운 비밀번호를 입력하여주세요');
        }
        if (newPassword !== newPasswordConfirm) {
            return alert('새로운 비밀번호가 일치하지 않습니다.');
        }
        try {
            const result = await fetcher({
                url: '/api/reset-password',
                method: 'PATCH',
                body: {
                    email,
                    confirmToken,
                    newPassword,
                    newPasswordConfirm,
                    authCode: '171009',
                },
            });
            alert('비밀번호 변경이 완료 되었습니다.');

            await dispatch({
                type: RESET_STATE,
            });
            Router.push('/');
        } catch (err) {
            console.log(err);
            alert(err.message || '알수 없는 에러');
        }
    }, []);

    return (
        <div>
            비밀번호 변경 페이지
            <div>
                비밀번호 입력 : <input ref={password} type="password" />
            </div>
            <div>
                비밀번호 확인 : <input ref={passwordConfirm} type="password" />
            </div>
            <button onClick={changePw}>비밀번호 변경</button>
        </div>
    );
};
export default Index;
