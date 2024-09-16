import React from 'react';
import { View } from 'react-native';
import { Formik } from 'formik';
import Button from '@/components/Button';
import CText from '@/components/CText';
import Dropdown from '@/components/Dropdown';
import i18nCountries from 'i18n-iso-countries/langs/en.json';
import BoxSelector from '@/components/BoxSelector';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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

type WaitlistFormData = {
    gender: (keyof typeof genders) | null,
    ageGroup: (keyof typeof ageGroups) | null,
    countryISO: string | null,
};

export type WaitlistFormProps = {
    onSubmit: (values: WaitlistFormData) => void
};

const WaitlistForm = ({ onSubmit }: WaitlistFormProps) => {
    const insets = useSafeAreaInsets();

    return (
        <View style={{ height: '100%' }}>
            <Formik<WaitlistFormData>
                initialValues={{ gender: null, ageGroup: null, countryISO: null }}
                onSubmit={(values) => onSubmit(values)}
            >
                {({ handleChange, handleSubmit, values }) => (
                    <View style={{ height: '100%' }}>
                        <View>
                            <CText type='h1' style={{ marginBottom: 10 }}>Join the EAP</CText>
                            <CText type='normal' style={{ marginBottom: 40 }}>We need some information to improve the experience for our future guests. Please fill out the form below. All data is handled according to European data protection laws.</CText>

                            <View style={{ marginBottom: 25 }}>
                                <CText type='bold' style={{ marginBottom: 5 }}>Gender</CText>
                                <BoxSelector value={values.gender} items={genders} allowNull={true} onValueChange={handleChange('gender')} />
                            </View>
                            <View style={{ marginBottom: 25 }}>
                                <CText type='bold' style={{ marginBottom: 5 }}>Age Group</CText>
                                <BoxSelector value={values.ageGroup} items={ageGroups} allowNull={true} onValueChange={handleChange('ageGroup')} />
                            </View>
                            <View style={{ marginBottom: 25 }}>
                                <CText type='bold' style={{ marginBottom: 5 }}>Country</CText>
                                <Dropdown value={values.countryISO} items={Object.fromEntries(Object.entries(i18nCountries.countries).map(([value, label]) => ([value, Array.isArray(label) ? label[0] : label])))} allowNull={true} onValueChange={handleChange('countryISO')} />
                            </View>
                        </View>
                        <View style={{ paddingTop: 30 }}>
                            <Button disabled={!values.gender || !values.ageGroup || !values.countryISO} onClick={handleSubmit} caption='Join our Early Access Program' />
                        </View>
                    </View>

                )}
            </Formik>
        </View>
    );
};
export default WaitlistForm;