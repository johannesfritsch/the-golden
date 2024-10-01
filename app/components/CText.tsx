import { ReactNode } from 'react';
import { StyleProp, Text, TextStyle } from 'react-native';

export type CTextProps = {
    children: ReactNode,
    type: 'link' | 'h0' | 'h1' | 'h2' | 'h3' | 'h4' | 'normal' | 'bold' | 'italic' | 'underline' | 'boldunderline',
    style?: StyleProp<TextStyle>,
}

const CText = ({ children, type, style: additionalStyle = {} }: CTextProps) => {
    return (
        <Text style={[{
            ...(type === 'h0' ? {
                fontSize: 50,
                lineHeight: 50,
                fontFamily: 'DMSerifDisplay',
            } : type === 'h1' ? {
                fontSize: 28,
                lineHeight: 38,
                fontFamily: 'DMSerifDisplay',
            } : type === 'h2' ? {
                fontSize: 23,
                fontFamily: 'RobotoMedium',
            } : type === 'h3' ? {
                fontSize: 18,
                fontFamily: 'RobotoMedium',
            } : type === 'h4' ? {
                fontSize: 16,
                fontFamily: 'RobotoMedium',
            } : type === 'normal' ? {
                fontSize: 15,
                lineHeight: 21,
                fontFamily: 'RobotoRegular',
                color: '#666',
            } : type === 'link' ? {
                fontSize: 15,
                lineHeight: 21,
                fontFamily: 'RobotoMedium',
                color: '#B29146',
            } : type === 'bold' ? {
                fontSize: 15,
                lineHeight: 21,
                fontFamily: 'RobotoMedium',
                color: '#666',
            } : type === 'italic' ? {
                fontSize: 15,
                lineHeight: 21,
                fontFamily: 'RobotoItalic',
            } : type === 'underline' ? {
                fontSize: 15,
                lineHeight: 21,
                fontFamily: 'RobotoRegular',
                textDecorationLine: 'underline',
            } : type === 'boldunderline' ? {
                fontSize: 15,
                lineHeight: 21,
                fontFamily: 'RobotoMedium',
                textDecorationLine: 'underline',
            } : {
            }),
        }, additionalStyle]}>{children}</Text>
    )
}

export default CText