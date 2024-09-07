import { ReactNode } from 'react';
import { Text } from 'react-native';

export type CTextProps = {
    children: ReactNode,
    type: 'h1' | 'h2' | 'h3' | 'normal' | 'italic' | 'underline',
}

const CText = ({ children, type }: CTextProps) => {

    const style = {
        // Defaults
        
        // h1
        ...(type === 'h1' ? {
            fontSize: 24,
            fontFamily: 'RobotoBold',
        // h2
        } : type === 'h2' ? {
            fontSize: 18,
            fontFamily: 'RobotoBold',
        // bold
        } : type === 'h3' ? {
            fontSize: 15,
            fontFamily: 'RobotoBold',
        // normal
        } : type === 'normal' ? {
            fontSize: 15,
            fontFamily: 'RobotoRegular',
        // italic
        } : type === 'italic' ? {
            fontSize: 15,
            fontFamily: 'RobotoItalic',
        // underline
        } : type === 'underline' ? {
            fontSize: 15,
            fontFamily: 'RobotoRegular',
            textDecorationLine: 'underline',
        // Default
        } : {
        })
    }

    return (
        <Text style={style}>{children}</Text>
    )
}

export default CText