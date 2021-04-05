import React from 'react';
import produce from 'immer';

export const initialState = {
    remainMillisecond: null,
    emailUsed: null,
    verifiedWithCode: false,
};

export const UPDATE_STATE = 'codeinfo/update';
export const RESET_STATE = 'codeinfo/reset';
export const VERIFIED = 'codeinfo/verified';

export const reducer = (state, action) => {
    const { type, value } = action;
    switch (type) {
        case UPDATE_STATE:
            const { remainMillisecond, emailUsed, verifiedWithCode } = action.payload;
            return produce(state, (draft) => {
                if (remainMillisecond) {
                    draft.remainMillisecond = new Date(new Date().getTime() + remainMillisecond);
                }
                if (emailUsed) {
                    draft.emailUsed = emailUsed;
                }
                draft.verifiedWithCode = false;
            });
        case VERIFIED:
            return produce(state, (draft) => {
                draft.remainMillisecond = null;
                draft.verifiedWithCode = true;
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
