import { ScrollView, StyleProp, View, ViewStyle } from 'react-native'
import { ReactNode } from 'react'
import LoadingLayer from './LoadingLayer'

export type LayoutProps = {
  children: ReactNode
  topElement?: ReactNode
  header?: ReactNode
  footer?: ReactNode
  bottomElement?: ReactNode
  style?: StyleProp<ViewStyle>
  loading?: boolean
}

const Layout = ({ children, topElement, header, footer, bottomElement, style, loading = false }: LayoutProps) => {
  return (
    <View style={[style, { height: '100%', backgroundColor: 'white' }]}>
      {topElement}
      {loading && <View style={{ flexGrow: 1, paddingBottom: 90 }}><LoadingLayer /></View>}
      {!loading && (<ScrollView style={{ flexGrow: 1, backgroundColor: 'white' }}>
        {header}
        <View style={{ padding: 20 }}>
          {children}
        </View>
        {footer || <View style={{ height: 90 }} />}
      </ScrollView>)}
      {!loading && bottomElement}
    </View>
  )
}

export default Layout