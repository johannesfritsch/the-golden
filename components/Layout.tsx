import { ScrollView, StyleProp, View, ViewStyle } from 'react-native'
import { ReactNode } from 'react'

export type LayoutPropsProps = {
  children: ReactNode
  topElement?: ReactNode
  header?: ReactNode
  footer?: ReactNode
  bottomElement?: ReactNode
  style?: StyleProp<ViewStyle>
}

const LayoutProps = ({ children, topElement, header,footer, bottomElement, style }: LayoutPropsProps) => {
  return (
    <View style={[style, { height: '100%' }]}>
      {topElement}
      <ScrollView style={{ flexGrow: 1, backgroundColor: 'white' }}>
        {header}
        <View style={{ padding: 20 }}>
          {children}
        </View>
        {footer || <View style={{ height: 90 }} />}
      </ScrollView>
      {bottomElement}
    </View>
  )
}

export default LayoutProps