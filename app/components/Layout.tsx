import { ScrollView, StyleProp, View, ViewStyle } from 'react-native'
import { ReactNode } from 'react'
import LoadingLayer from './LoadingLayer'
import CText from './CText'
import { Feather } from '@expo/vector-icons'

export type LayoutProps = {
  children: ReactNode
  topElement?: ReactNode
  header?: ReactNode
  footer?: ReactNode
  bottomElement?: ReactNode
  style?: StyleProp<ViewStyle>
  loading?: boolean
  error?: { message: string }
}

const Layout = ({ children, topElement, header, footer, bottomElement, style, loading = false, error }: LayoutProps) => {
  return (
    <View style={[style, { height: '100%', backgroundColor: 'white' }]}>
      {topElement}
      {loading && <View style={{ flexGrow: 1, paddingBottom: 90 }}><LoadingLayer /></View>}
      {error && (
        <View style={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Feather name='alert-triangle' size={50} color='red' style={{ marginBottom: 20 }} />
          <CText type={'h3'}>An error occured</CText>
          <CText type='normal'>{error.message}</CText>
        </View>
      )}
      {!loading && !error && (
        <ScrollView style={{ flexGrow: 1, backgroundColor: 'white' }}>
          {header}
          <View style={{ padding: 20 }}>
            {children}
          </View>
          {footer || <View style={{ height: 90 }} />}
        </ScrollView>
      )}
      {!loading && !error && bottomElement}
    </View>
  )
}

export default Layout