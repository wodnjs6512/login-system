const fetcher = async ({
    url,
    method,
    body,
    additionalHeaders = {},
}: IFetchObject): Promise<any> => {
    const headers = {
        'Content-Type': 'application/json',
    };
    const domain = process.env.SERVER_DOMAIN;

    Object.assign(headers, additionalHeaders);
    // Authorization: `bearer ${JWT}`,
    console.log({
        method,
        mode: 'cors',
        headers,
        credentials: 'same-origin',
        body: JSON.stringify(body),
    });
    return await fetch(domain + url, {
        method,
        mode: 'cors',
        headers,
        credentials: 'same-origin',
        body: JSON.stringify(body),
    }).then(async (r) => {
        const status = r.status;
        console.log(r);
        if (status === 400) {
            throw new Error('잘못된 요청입니다.');
        } else if (status === 401) {
            throw new Error('권한이 없습니다.');
        } else if (status === 500) {
            throw new Error('서버 에러 입니다.');
        }
        try {
            const response = await r.json();
            return { ...response, status };
        } catch (err) {
            if (status === 200) {
                return { status };
            }
        }
    });
};

export default fetcher;
