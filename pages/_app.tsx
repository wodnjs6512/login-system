import React, { useReducer } from 'react';
import Head from 'next/head';
import Gnb from '../components/modules/Gnb';
import Footer from '../components/modules/Footer';
import '../styles/globals.css';
import styled from '@emotion/styled';
import type { AppProps /*, AppContext */ } from 'next/app';

import { reducer, Context, initialState } from '../reducers';

const MyApp = ({ Component, pageProps }: AppProps) => {
    const [store, dispatch] = useReducer(reducer, initialState);
    return (
        <Context.Provider value={{ store, dispatch }}>
            <PageLayout>
                <Head>
                    <title>Login-system</title>
                    <link rel="icon" href="/favicon.ico" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Gugi&display=swap"
                        rel="stylesheet"
                    ></link>
                </Head>
                <Gnb />
                <ContentWrapper>
                    <Component {...pageProps} />
                </ContentWrapper>
                <Footer />
            </PageLayout>
        </Context.Provider>
    );
};

const PageLayout = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1 0 auto;
    height: max-content;
    > div {
        display: flex;
        width: 100%;
        position: relative;
    }
`;

const ContentWrapper = styled.div`
    min-height: calc(100vh - 160px);
    width: 100%;
    flex: 1 0 auto;
    > div {
        width: 100%;
        display: flex;
        flex-direction: column;
        flex: 1 0 auto;
    }
`;

export default MyApp;
