import React, { useContext, useRef, useCallback, useState, useEffect, FormEvent } from 'react';
import Router from 'next/router';
// @ts-ignore babel alias error
import { Context, RESET_STATE, VERIFIED } from '@reducers';
// @ts-ignore babel alias error
import fetcher from '@utils/fetcher';
// @ts-ignore babel alias error
import passwordStrengthChekcer from '@utils/passwordStrengthChecker';
// @ts-ignore babel alias error
import PasswordComplexityInd from '@components/atoms/PasswordComplexityInd';
/**
 * 비밀번호 변경 페이지
 * */
const Index = () => {
    const { store, dispatch } = useContext(Context);
    const { email, confirmToken } = store;
    const [emailStrength, setEmailStrength] = useState(null);
    const password = useRef(null);
    const passwordConfirm = useRef(null);
    useEffect(() => {
        if (!confirmToken || !email) {
            // dispatch({
            //     type: RESET_STATE,
            // });
            // location.href = '/';
        }
    }, []);

    const updatePasswordStrength = useCallback((): void => {
        const newPassword = password.current.value;
        const strength = passwordStrengthChekcer(newPassword);
        setEmailStrength(strength);
    }, []);

    const changePw = useCallback(async (e: FormEvent): Promise<any> => {
        e.preventDefault();
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
            await fetcher({
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
            alert(err.message || '알수 없는 에러');
        }
    }, []);

    return (
        <div>
            <h1>비밀번호 변경 페이지</h1>
            <form onSubmit={changePw}>
                <div>
                    <p>비밀번호 입력 : </p>
                    <input
                        ref={password}
                        type="password"
                        placeholder="비밀번호 입력"
                        onChange={updatePasswordStrength}
                    />
                </div>
                <div>
                    <p>비밀번호 확인 : </p>
                    <input ref={passwordConfirm} type="password" placeholder="비밀번호 확인" />
                </div>
                <PasswordComplexityInd strength={emailStrength} />
                <input type="submit" value="비밀번호 변경" />
            </form>
        </div>
    );
};

export default Index;
