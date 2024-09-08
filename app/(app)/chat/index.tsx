import Header from '@/components/Header'
import Layout from '@/components/Layout'
import TabBar from '@/components/TabBar'
import React from 'react'
import { View, Text } from 'react-native'

const Chat = () => {
  return (
    <Layout header={<Header leftButton='menu' rightButton='auth' />} footer={<TabBar />}>
      <Text>Chat</Text>
    </Layout>
  )
}

export default Chat