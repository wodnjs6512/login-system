declare type IFetchObject = {
    url: string;
    method: string;
    body: BodyInit;
    options: object;
    additionalHeaders: object;
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
