import React from 'react';
import { TextInput, View } from 'react-native';
import { Formik } from 'formik';
import Button from '@/components/Button';
import Rive, { Alignment, Fit } from 'rive-react-native';
import CText from '@/components/CText';

const WaitlistForm = () => (
    <View style={{}}>
        <CText type='h1' style={{ marginBottom: 10 }}>Join the EAP</CText>
        <CText type='normal' style={{ marginBottom: 40 }}>We need some information to improve the experience for our future guests. Please fill out the form below. All data is handled according to European data protection laws.</CText>
        <View style={{}}>
            <Formik
                initialValues={{ email: '' }}
                onSubmit={(values) => console.log(values)}
            >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                    <View>
                        <TextInput
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                        />
                        <Button onClick={handleSubmit} caption='Join The Golden waitlist' />
                    </View>
                )}
            </Formik>
        </View>
    </View>
);
export default WaitlistForm;