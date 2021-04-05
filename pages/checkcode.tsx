import React, { useCallback, useRef, useContext, useEffect, useMemo, useState } from 'react';
import Router from 'next/router';

// @ts-ignore babel alias error
import { Context, RESET_STATE, VERIFIED } from '@reducers';

// @ts-ignore babel alias error
import fetcher from '@utils/fetcher';

/**
 * 인증 코드 검증 페이지
 * */
const CheckCode = () => {
    const inputEl = useRef(null);
    const { store, dispatch } = useContext(Context);
    const [timeLeft, setTimeLeft] = useState({ minute: 0, second: 0 });
    const [timer, setTimer] = useState(null);
    const { remainMillisecond, emailUsed } = store;
    useEffect(() => {
        if (!remainMillisecond || !emailUsed) {
            Router.push('/');
        }
    }, []);

    useEffect(() => {
        const timeid = setInterval(updateTime, 1000);
        setTimer(timeid);
        return () => {
            clearInterval(timeid);
        };
    }, []);

    const updateTime = async () => {
        const currentTime = new Date().getTime();
        const expireTime = new Date(remainMillisecond).getTime();
        const currentTimeLeft = Math.floor((expireTime - currentTime) / 1000);
        if (currentTimeLeft < 180) {
            dispatch({
                type: RESET_STATE,
            });
            clearInterval(timer);
            await alert('시간이 지났습니다.');
            location.href = '/';
            return;
        }
        setTimeLeft({ minute: Math.floor(currentTimeLeft / 60), second: currentTimeLeft % 60 });
    };

    const verifyCode = useCallback(async () => {
        try {
            const issueToken = inputEl.current.value;
            const result = await fetcher({
                url: `/api/reset-password`,
                method: 'POST',
                body: {
                    email: emailUsed,
                    authCode: '171009',
                    issueToken,
                },
            });
            if (!result.confirmToken) {
                throw new Error(result?.error?.message);
            }
            await dispatch({
                type: VERIFIED,
            });
            await alert(`인증 완료 되었습니다.`);
            Router.push('/changepw');
        } catch (err) {
            console.log(err);
            alert(err.message || '서버 에러입니다.');
        }
    }, []);

    return (
        <div>
            <div>인증 코드 검증 페이지</div>
            <input ref={inputEl} type="text" />
            <br />
            {timeLeft.minute}분{timeLeft.second}초<button onClick={verifyCode}>코드 전송</button>
        </div>
    );
};

export default CheckCode;
