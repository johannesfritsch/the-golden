import BottomBar from '@/components/BottomBar'
import Button from '@/components/Button'
import CText from '@/components/CText'
import Header from '@/components/Header'
import Layout from '@/components/Layout'
import { trpc } from '@/utils/trpc'
import { Redirect } from 'expo-router'
import React from 'react'
import { View } from 'react-native'


const WaitlistStatus = () => {
    const { isPending, isFetching, error, data } = trpc.getWaitlistStatus.useQuery("test");

    return (
        <Layout loading={isPending || isFetching} topElement={<Header leftButton='back' rightButton='none' />} bottomElement={(data?.waitlistEntered && <BottomBar><Button caption='Tired of waiting?' onClick={() => { }} /></BottomBar>)}>
            {error && <CText type='h1'>An error has occurred: {error.message}</CText>}
            {!isPending && !isFetching && !error && data && (
                <View>
                    {!data.waitlistEntered && <Redirect href='/waitlist/info' />}
                    {data.waitlistEntered && <CText type={'normal'}>{data.waitlistPosition}</CText>}
                </View>
            )}
        </Layout>
    )
}

export default WaitlistStatus

const wait = async (ms: number) => new Promise(resolve => setTimeout(resolve, ms));