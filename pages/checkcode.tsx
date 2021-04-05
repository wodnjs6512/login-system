import React, { useCallback, useRef, useContext, useEffect, useMemo, useState } from 'react';
import Router from 'next/router';

// @ts-ignore babel alias error
import { Context, RESET_STATE, UPDATE_STATE } from '@reducers';

// @ts-ignore babel alias error
import fetcher from '@utils/fetcher';

/**
 * 인증 코드 검증 페이지
 * */

let interval = 0;
const CheckCode = () => {
    const inputEl = useRef(null);
    const { store, dispatch } = useContext(Context);
    const [timeLeft, setTimeLeft] = useState({ minute: 0, second: 0 });
    const [timer, setTimer] = useState(null);
    const { remainMillisecond, email } = store;
    useEffect(() => {
        if (!remainMillisecond || !email) {
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
        if (currentTimeLeft < 0) {
            location.href = '/';
            return;
        } else {
            setTimeLeft({
                minute: Math.floor(currentTimeLeft / 60),
                second: currentTimeLeft % 60,
            });
        }
    };

    const verifyCode = useCallback(async () => {
        try {
            const issueToken = inputEl.current.value;
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
            Router.push('/changepw');
        } catch (err) {
            console.log(err);
            alert(err.message || '알수 없는 에러');
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
