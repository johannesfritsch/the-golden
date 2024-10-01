import React, { useCallback } from 'react'
import WaitlistInfo from './_info'
import { trpc } from '@/utils/trpc';
import WaitlistStatus from './_status';
import CText from '@/components/CText';
import Layout from '@/components/Layout';
import { useFocusEffect } from 'expo-router';
import Header from '@/components/Header';

const Waitlist = () => {
    const { data, isFetching, error, refetch } = trpc.getWaitlistStatus.useQuery();
    const [confetti, setConfetti] = React.useState(false);

    useFocusEffect(useCallback(() => {
        refetch();
    }, []));

    if (!isFetching && data && data.waitlistEntered) return <WaitlistStatus showConfetti={confetti} onCodeEntered={() => { refetch(); setConfetti(true); }} onConfettiEnded={() => setConfetti(false)} refetch={refetch} status={data} onLeave={() => refetch()} />;
    if (!isFetching && data && !data.waitlistEntered) return <WaitlistInfo onJoin={() => { refetch(); setConfetti(true); }} />;

    if (error) return <CText type='h1'>An error has occurred: {error.message}</CText>;

    return (
        <Layout refetch={refetch} loading={true} topElement={<Header leftButton='none' rightButton={{ type: 'none' }} />}>
            <CText type='h1'>Loading...</CText>
        </Layout>
    )

}

export default Waitlist