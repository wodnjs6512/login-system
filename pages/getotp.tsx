import React, { useCallback, useRef, useContext } from 'react';
import styled from '@emotion/styled';
import Router from 'next/router';
// @ts-ignore babel alias error
import fetcher from '@utils/fetcher';
// @ts-ignore babel alias error
import { Context, UPDATE_STATE } from '@reducers';

const PageWrapper = styled.div``;

/**
 * 인증코드 발급 페이지
 * */
const Index = () => {
    const inputEl = useRef(null);
    const { dispatch } = useContext(Context);
    const isEmailValid = useCallback((email) => {
        if (email.length < 5) {
            return false;
        }
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(email);
    }, []);
    const sendEmail = useCallback(
        async (e) => {
            try {
                const emailUsed = inputEl.current.value;
                if (!isEmailValid(emailUsed)) {
                    return alert('올바르지 않은 이메일입니다.');
                }
                const result = await fetcher({
                    url: `/api/reset-password?email=${emailUsed}`,
                });
                if (result?.error) {
                    throw new Error(result?.error?.message);
                }

                const { issueToken, remainMillisecond } = result;
                await dispatch({
                    type: UPDATE_STATE,
                    payload: {
                        emailUsed,
                        remainMillisecond,
                    },
                });
                await alert(`개발용 노티 : ${issueToken}`);
                Router.push('/checkcode');
            } catch (err) {
                alert(err.message || '서버 에러입니다.');
            }
        },
        [inputEl]
    );

    return (
        <PageWrapper>
            <div>이메일 입력</div>
            <input ref={inputEl} type="text" />
            <button onClick={sendEmail}>이메일 전송</button>
        </PageWrapper>
    );
};
export default Index;