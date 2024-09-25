import React from 'react'
import WaitlistInfo from './_info'
import { trpc } from '@/utils/trpc';
import WaitlistStatus from './_status';
import CText from '@/components/CText';

const Waitlist = () => {
    const { data, error, refetch } = trpc.getWaitlistStatus.useQuery("test");
    if (data && data.waitlistEntered) return <WaitlistStatus status={data} onLeave={() => refetch()} />;
    if (data && !data.waitlistEntered) return <WaitlistInfo onJoin={() => refetch()} />;

    if (error) return <CText type='h1'>An error has occurred: {error.message}</CText>;

    return <CText type='h1'>Loading...</CText>;

}

export default Waitlist