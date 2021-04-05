module.exports = {
    future: {
        webpack5: true,
    },
    env: {
        // 지금만 하드코딩
        SERVER_DOMAIN: 'https://ably-frontend-interview-server.vercel.app',
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/getotp',
                permanent: true,
            },
        ];
    },
};
