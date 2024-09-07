import { ScrollView, View } from 'react-native'
import Footer from './Footer'
import { ReactNode } from 'react'
import Header, { HeaderProps } from './Header'
import TabBar from './TabBar'

export type LayoutPropsProps = {
  children: ReactNode
  header: HeaderProps
  topElement?: ReactNode
  showTabBar?: boolean
}

const LayoutProps = ({ children, header, topElement, showTabBar = true }: LayoutPropsProps) => {
  return (
    <>
    <Header {...header} />
    <ScrollView style={{ flexGrow: 1, backgroundColor: 'white' }}>
      {topElement}
      <View style={{ padding: 20 }}>
        {children}
      </View>
      <Footer />
    </ScrollView>
    {showTabBar && <TabBar />}
    </>
  )
}

export default LayoutProps