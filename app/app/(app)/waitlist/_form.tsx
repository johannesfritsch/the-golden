import React, { useEffect, useMemo } from 'react';
import { View } from 'react-native';
import { Formik } from 'formik';
import Button from '@/components/Button';
import CText from '@/components/CText';
import Dropdown from '@/components/Dropdown';
import i18nCountries from 'i18n-iso-countries/langs/en.json';
import BoxSelector from '@/components/BoxSelector';
import { Notifications, Registered, RegistrationError } from 'react-native-notifications';
import { check, checkNotifications } from 'react-native-permissions'

const genders = {
    'm': 'Male',
    'f': 'Female',
    'o': 'Other',
};

const ageGroups = {
    '18-25': '18-25',
    '26-35': '26-35',
    '36-45': '36-45',
    '46-55': '46-55',
    '56-65': '56-65',
    '66-75': '66-75',
    '76-85': '76-85',
    '86-95': '86-95',
    'other': 'Other',
};

export type WaitlistFormData = {
    gender: (keyof typeof genders) | null,
    ageGroup: (keyof typeof ageGroups) | null,
    countryISO: string | null,
    pushToken?: string | null,
};

export type WaitlistFormValues = {
    gender: (keyof typeof genders),
    ageGroup: (keyof typeof ageGroups),
    countryISO: string,
    pushToken: string,
};

export type WaitlistFormProps = {
    onSubmit: (values: WaitlistFormValues) => void
};

enum WaitlistFormPage {
    FORM,
    PUSH_NOTIFICATIONS,
};

const WaitlistForm = ({ onSubmit }: WaitlistFormProps) => {
    const [page, setPage] = React.useState<WaitlistFormPage>(WaitlistFormPage.FORM);
    const [values, setValues] = React.useState<WaitlistFormData | null>(null);
    const [pushToken, setPushToken] = React.useState<string | null>(null);
    const [userAllowedPN, setUserAllowedPN] = React.useState<'NOT_ASKED' | 'DISALLOWED' | 'ALLOWED'>('NOT_ASKED');
    useMemo(() => {
        Notifications.events().registerRemoteNotificationsRegistered(async (event: Registered) => {
            console.log('Notifications.events().registerRemoteNotificationsRegistered');
            setPushToken(event.deviceToken);
        });

        Notifications.events().registerRemoteNotificationsRegistrationFailed((event: RegistrationError) => {
            console.error(event);
        });
    }, []);

    useEffect(() => {
        if (pushToken && values) {
            onSubmit({ gender: values!.gender!, ageGroup: values!.ageGroup!, countryISO: values!.countryISO!, pushToken });
        }
    }, [values, pushToken]);

    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                const permissions = await checkNotifications();
                console.log('Permissions:', permissions);
                if (permissions.status === 'granted') {
                    setUserAllowedPN('ALLOWED');
                } else if (permissions.status === 'blocked') {
                    setUserAllowedPN('DISALLOWED');
                } else if (permissions.status === 'denied') {
                    setUserAllowedPN('NOT_ASKED');
                }
            } catch (error) {
                console.error('Error checking permissions:', error);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    if (page === WaitlistFormPage.FORM) return (
        <View style={{ height: '100%' }}>
            <Formik<WaitlistFormData>
                initialValues={{ gender: null, ageGroup: null, countryISO: null }}
                onSubmit={(values) => {
                    setValues(values);
                    setPage(WaitlistFormPage.PUSH_NOTIFICATIONS);
                }}>
                {({ handleChange, handleSubmit, values }) => (
                    <View style={{ height: '100%' }}>
                        <View>
                            <CText type='h1' style={{ marginBottom: 10 }}>Join the EAP</CText>
                            <CText type='normal' style={{ marginBottom: 40 }}>We need some information to improve the experience for our future guests. Please fill out the form below. All data is handled according to European data protection laws.</CText>

                            <View style={{ marginBottom: 25 }}>
                                <CText type='bold' style={{ marginBottom: 10 }}>Gender</CText>
                                <BoxSelector value={values.gender} items={genders} allowNull={true} onValueChange={handleChange('gender')} />
                            </View>
                            <View style={{ marginBottom: 25 }}>
                                <CText type='bold' style={{ marginBottom: 10 }}>Age Group</CText>
                                <BoxSelector value={values.ageGroup} items={ageGroups} allowNull={true} onValueChange={handleChange('ageGroup')} />
                            </View>
                            <View style={{ marginBottom: 25 }}>
                                <CText type='bold' style={{ marginBottom: 10 }}>Country</CText>
                                <Dropdown value={values.countryISO} items={Object.fromEntries(Object.entries(i18nCountries.countries).map(([value, label]) => ([value, Array.isArray(label) ? label[0] : label])))} allowNull={true} onValueChange={handleChange('countryISO')} />
                            </View>
                        </View>
                        <View style={{ paddingTop: 30 }}>
                            <Button chevron style={{ width: '100%' }} disabled={!values.gender || !values.ageGroup || !values.countryISO} onClick={handleSubmit} caption='Proceed' />
                        </View>
                    </View>
                )}
            </Formik>
        </View>
    );

    return <View>
        <CText type='h1' style={{ marginBottom: 10 }}>Push Notifications</CText>
        <CText type='normal' style={{ marginBottom: 40 }}>To keep you updated about your position in the waitlist, we need your permission to send you push notifications. You can disable them at any time in the settings.</CText>
        {userAllowedPN === 'NOT_ASKED' && (<Button style={{ width: '100%' }} onClick={async () => {
            console.log('Notifications.registerRemoteNotifications()');
            Notifications.registerRemoteNotifications();
        }} caption='Allow push notifications' />)}
        {userAllowedPN === 'DISALLOWED' && (<View>
            <CText type='h2' style={{ marginBottom: 10 }}>Push Notifications Disabled</CText>
            <CText type='normal' style={{ marginBottom: 20 }}>You have disabled push notifications. To enable them, go to your device settings and allow push notifications for The Golden.</CText>
        </View>)}
        {userAllowedPN === 'ALLOWED' && <Button style={{ width: '100%' }} onClick={() => {
            Notifications.registerRemoteNotifications();
        }} caption='Join the waitlist of EAP' />}
    </View>;
};

export default WaitlistForm;