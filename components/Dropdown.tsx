import React from 'react'
import { StyleProp, ViewStyle } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

// <Dropdown value={null} items={genders} allowNull={true} onValueChange={() => {}} />

export type DropdownProps = {
    value: string | null
    items: Record<string, string>
    allowNull?: boolean
    onValueChange: (value: string) => void
    style?: StyleProp<ViewStyle>
}

const Dropdown = ({ value: currentValue, items, allowNull, onValueChange, style }: DropdownProps) => {
    const containerStyle = {
        backgroundColor: currentValue != null ? '#888' : 'transparent',
        borderRadius: 15,
        height: 45,
    }

    const inputStyle = {
        fontSize: 16,
        lineHeight: 21,
        fontFamily: 'RobotoRegular',
        color: 'white',
        height: 45,
        borderWidth: 1,
        borderColor: currentValue != null ? '#888' : '#CCC',
        textAlign: 'center' as const,
        borderRadius: 15,
        paddingHorizontal: 15,
    };

    const placeholderStyle = {
        color: currentValue != null ? 'white' : '#888',
    }

    return (
        <RNPickerSelect value={currentValue} style={{ inputIOSContainer: containerStyle, inputAndroidContainer: containerStyle, inputIOS: inputStyle, inputAndroid: inputStyle, placeholder: placeholderStyle }} items={Object.entries(items).map(([value, label]) => ({ value, label }))} onValueChange={onValueChange} />
    )
}

export default Dropdown