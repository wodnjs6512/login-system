import React, { useReducer } from 'react';
import Head from 'next/head';
import Gnb from '../components/modules/Gnb';
import Footer from '../components/modules/Footer';
import '../styles/globals.css';
import styled from '@emotion/styled';
import { reducer, Context, initialState } from '@reducers';
import type { AppProps /*, AppContext */ } from 'next/app';

const MyApp = ({ Component, pageProps }: AppProps) => {
    const [store, dispatch] = useReducer(reducer, initialState);
    return (
        <Context.Provider value={{ store, dispatch }}>
            <PageLayout>
                <Head>
                    <title>Login-system</title>
                    <link rel="icon" href="/favicon.ico" />
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
    }
`;

const ContentWrapper = styled.div`
    min-height: calc(100vh - 160px);
`;

export default MyApp;
