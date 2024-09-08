import { ScrollView, View } from 'react-native'
import Footer from './Footer'
import { ReactNode } from 'react'
import Header, { HeaderProps } from './Header'
import TabBar from './TabBar'

export type LayoutPropsProps = {
  children: ReactNode
  header?: ReactNode
  topElement?: ReactNode
  footer?: ReactNode
}

const LayoutProps = ({ children, header, topElement, footer }: LayoutPropsProps) => {
  return (
    <>
      {header}
      <ScrollView style={{ flexGrow: 1, backgroundColor: 'white' }}>
        {topElement}
        <View style={{ padding: 20 }}>
          {children}
        </View>
        <Footer />
      </ScrollView>
      {footer}
    </>
  )
}

export default LayoutProps