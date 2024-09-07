import { ReactNode } from 'react';
import { Text } from 'react-native';

export type CTextProps = {
    children: ReactNode,
    type: 'h1' | 'h2' | 'h3' | 'normal' | 'bold' | 'italic' | 'underline',
}

const CText = ({ children, type }: CTextProps) => {
    const style = {
        // Defaults

        ...(type === 'h1' ? {
            fontSize: 28,
            lineHeight: 38,
            fontFamily: 'RobotoMedium',
        } : type === 'h2' ? {
            fontSize: 18,
            fontFamily: 'RobotoMedium',
        } : type === 'h3' ? {
            fontSize: 17,
            fontFamily: 'RobotoMedium',
        } : type === 'normal' ? {
            fontSize: 14,
            lineHeight: 21,
            fontFamily: 'RobotoRegular',
            color: '#666',
        } : type === 'bold' ? {
            fontSize: 14,
            lineHeight: 21,
            fontFamily: 'RobotoMedium',
            color: '#666',
        } : type === 'italic' ? {
            fontSize: 14,
            lineHeight: 21,
            fontFamily: 'RobotoItalic',
        } : type === 'underline' ? {
            fontSize: 14,
            lineHeight: 21,
            fontFamily: 'RobotoRegular',
            textDecorationLine: 'underline',
        } : {
        })
    }

    return (
        <Text style={style}>{children}</Text>
    )
}

export default CText