declare type IFetchObject = {
    url: string;
    method: string;
    body?: BodyInit;
    options?: object;
    additionalHeaders?: object;
};

type IProfileData = {
    email: string;
    name: string;
    profileImage: string;
    lastConnectedAt: string;
    status: number;
};

type CustomHTMLElement = {
    show?: boolean;
    strength?: number;
};

type IUserData = {
    name: string;
    email: string;
    profileImage: string;
    lastConnectedAt: Date;
};

interface IContextData {
    remainMillisecond?: Date;
    email?: string;
    confirmToken?: string;
    state: reducerState;
    dispatch: Dispatch<ReducerAction<typeof reducer>>;
}
