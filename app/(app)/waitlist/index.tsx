import CText from '@/components/CText'
import Layout from '@/components/Layout'
import { Redirect } from 'expo-router'
import React from 'react'

const WaitlistStatus = () => {

    return <Redirect href='/waitlist/info' />;

    return (
        <Layout>
            <CText type={'h1'}>WaitlistStatus</CText>
        </Layout>
    )
}

export default WaitlistStatus