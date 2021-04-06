import React, { useCallback, useRef, useContext, FormEvent } from 'react';
import styled from '@emotion/styled';
import Router from 'next/router';
import { Context, UPDATE_STATE } from '../../reducers';

import fetcher from '../../utils/fetcher';
import emailValidator from '../../utils/emailValidator';
/**
 * 인증코드 발급 페이지
 * */
const Index = () => {
    const emailRef = useRef(null);
    const { dispatch } = useContext(Context);

    const sendEmail = useCallback(async (e: FormEvent): Promise<any> => {
        try {
            e.preventDefault();
            const email = emailRef.current.value;
            if (!emailValidator(email)) {
                return alert('올바르지 않은 이메일입니다.');
            }
            const result = await fetcher({
                url: `/api/reset-password?email=${email}`,
                method: 'GET',
            });

            const { issueToken, remainMillisecond } = result;
            dispatch({
                type: UPDATE_STATE,
                payload: {
                    email,
                    remainMillisecond,
                },
            });
            console.log(issueToken);
            Router.push('/checkcode');
        } catch (err) {
            alert(err.message || '알수 없는 에러');
        }
    }, []);

    return (
        <div>
            <h1>이메일 입력</h1>
            <form onSubmit={sendEmail}>
                <input ref={emailRef} type="text" placeholder="이메일을 입력해 주세요" />
                <input type="submit" value="제출" />
            </form>
            <div>
                <TokenNotification>
                    ** issueToken은 개발자 콘솔에 나오도록 하였습니다
                </TokenNotification>
            </div>
        </div>
    );
};

const TokenNotification = styled.p`
    position: absolute;
    right: 5px;
    bottom: 5px;
    color: gray;
    margin: 0;
`;
export default Index;
