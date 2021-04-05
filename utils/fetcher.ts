const fetcher = async ({ url, method, body, additionalHeaders = {} }: IFetchObject) => {
    const headers = {
        'Content-Type': 'application/json',
    };
    const domain = process.env.SERVER_DOMAIN;

    Object.assign(headers, additionalHeaders);
    // Authorization: `bearer ${JWT}`,
    return await fetch(domain + url, {
        method,
        mode: 'cors',
        headers,
        body: JSON.stringify(body),
    }).then((r) => r.json());
};

export default fetcher;
