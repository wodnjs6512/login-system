import React from 'react';
import produce from 'immer';

export const initialState = {
    remainMillisecond: null,
    email: null,
    confirmToken: false,
};

export const UPDATE_STATE = 'codeinfo/update';
export const RESET_STATE = 'codeinfo/reset';

export const reducer = (state, action) => {
    const { type, value } = action;
    switch (type) {
        case UPDATE_STATE:
            const { remainMillisecond, email, confirmToken } = action.payload;
            return produce(state, (draft) => {
                if (remainMillisecond) {
                    draft.remainMillisecond = new Date(new Date().getTime() + remainMillisecond);
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

export const Context = React.createContext('globalState');
