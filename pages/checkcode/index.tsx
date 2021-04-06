import React, { useCallback, useRef, useContext, useEffect, useState, FormEvent } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { Context, RESET_STATE, UPDATE_STATE } from '../../reducers';
import fetcher from '../../utils/fetcher';

/**
 * 인증 코드 검증 페이지
 * */

const CheckCode = () => {
    const codeRef = useRef(null);
    const { store, dispatch = () => {} } = useContext(Context);
    const [timeLeft, setTimeLeft] = useState({ minute: 0, second: 0 });
    const [timer, setTimer] = useState(null);
    const router = useRouter();
    const { remainMillisecond, email } = store || {};
    useEffect(() => {
        if (!remainMillisecond || !email) {
            dispatch({
                type: RESET_STATE,
            });
            if (router) {
                router.push('/');
            } else {
                location.href = '/';
            }
        }
        updateTime();
    }, []);

    useEffect(() => {
        const timeid = setInterval(updateTime, 1000);
        setTimer(timeid);
        return () => {
            clearInterval(timeid);
        };
    }, []);

    const updateTime = useCallback(async (): Promise<any> => {
        const currentTime = new Date().getTime();
        const expireTime = new Date(remainMillisecond).getTime();
        const currentTimeLeft = Math.floor((expireTime - currentTime) / 1000);
        if (currentTimeLeft < 0) {
            dispatch({
                type: RESET_STATE,
            });
            if (router) {
                router.push('/');
            } else {
                location.href = '/';
            }

            return;
        } else {
            setTimeLeft({
                minute: Math.floor(currentTimeLeft / 60),
                second: currentTimeLeft % 60,
            });
        }
    }, [remainMillisecond]);

    const verifyCode = useCallback(async (e: FormEvent): Promise<any> => {
        e.preventDefault();
        try {
            const issueToken = codeRef.current.value;
            const result = await fetcher({
                url: `/api/reset-password`,
                method: 'POST',
                body: {
                    email,
                    issueToken,
                    authCode: '171009',
                },
            });
            const { confirmToken } = result;

            await dispatch({
                type: UPDATE_STATE,
                payload: {
                    confirmToken,
                },
            });
            await alert(`인증 완료 되었습니다.`);
            router.push('/changepw');
        } catch (err) {
            alert(err.message || '알수 없는 에러');
        }
    }, []);

    return (
        <div>
            <h1>인증 코드 검증 페이지</h1>
            <form onSubmit={verifyCode}>
                <div className="row">
                    <input ref={codeRef} type="text" placeholder="인증코드 입력" />
                    <Timer>
                        {timeLeft.minute}:{timeLeft.second}
                    </Timer>
                </div>

                <input type="submit" value="제출" />
            </form>
            <br />
        </div>
    );
};

const Timer = styled.p`
    width: 100px;
    text-align: center;
`;

export default CheckCode;
