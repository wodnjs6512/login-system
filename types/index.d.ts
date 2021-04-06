declare type IFetchObject = {
    url: string;
    method: string;
    body?: BodyInit & Object<any>;
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
    email?: string;
    confirmToken?: string;
    remainMillisecond?: Date;
    store: reducerState & Object<any>;
    dispatch: Dispatch<ReducerAction<typeof reducer>>;
}

interface IContextDataInput {
    email?: string;
    confirmToken?: string;
    remainMillisecond?: number;
}
