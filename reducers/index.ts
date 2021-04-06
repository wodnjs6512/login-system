import React from 'react';
import produce from 'immer';

export const initialState = {} as IContextData;

export const UPDATE_STATE = 'codeinfo/update';
export const RESET_STATE = 'codeinfo/reset';

type Actions =
    | { type: 'codeinfo/update'; payload: IContextDataInput }
    | { type: 'codeinfo/reset'; payload: IContextDataInput };

export const reducer = (state: IContextData, action: Actions) => {
    const { type } = action;
    switch (type) {
        case UPDATE_STATE:
            const { remainMillisecond, email, confirmToken } = action.payload;
            return produce(state, (draft) => {
                if (remainMillisecond) {
                    const now = new Date().getTime();
                    draft.remainMillisecond = new Date(now + remainMillisecond);
                }
                if (email) {
                    draft.email = email;
                }
                if (confirmToken) {
                    draft.confirmToken = confirmToken;
                }
            });

        case RESET_STATE:
            return produce(state, (draft) => {
                Object.assign(draft, initialState);
            });
        default:
            throw new Error();
    }
};

export const Context = React.createContext(initialState);
