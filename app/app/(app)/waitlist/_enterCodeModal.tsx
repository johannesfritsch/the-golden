import Button from '@/components/Button'
import CText from '@/components/CText'
import { trpc } from '@/utils/trpc'
import { router } from 'expo-router'
import React, { useEffect } from 'react'
import { Alert, TextInput } from 'react-native'

export type EnterCodeModalProps = {
    onCodeEntered: () => void
}

const EnterCodeModal = ({ onCodeEntered }: EnterCodeModalProps) => {
    const [code, setCode] = React.useState('');
    const { mutateAsync: enterReferralCode } = trpc.enterReferralCode.useMutation();
    const inputRef = React.useRef<TextInput>(null);

    const handleSubmit = async () => {
        try {
            await enterReferralCode({ code });
            setCode('');
            onCodeEntered();
        } catch (e) {
            Alert.alert('Error', (e as Error).message);
        }
    }

    useEffect(() => {
        inputRef.current?.focus();
    }, []);


    return (
        <>
            <CText type='h1' style={{ marginBottom: 20 }}>Got a code?</CText>
            <CText type='normal' style={{ marginBottom: 30 }}>If you have received a code, you can enter it here. It will skip the whole or parts of the waitlist for you.</CText>
            <TextInput autoCorrect={false} ref={inputRef} inputMode='text' autoCapitalize="characters" onChangeText={(t) => setCode(t.toUpperCase())} value={code.toUpperCase()} style={{ backgroundColor: '#DDD', padding: 10, borderRadius: 10, marginBottom: 30 }} placeholder='Enter your code here' maxLength={6} />
            <Button disabled={code.length < 6} caption='Redeem code' onClick={handleSubmit} />
        </>
    )
}

export default EnterCodeModal