import Layout from '@/components/Layout'
import React from 'react'
import { View, Text } from 'react-native'

const Chat = () => {
  return (
    <Layout header={{ leftButton: 'menu', rightButton: 'auth' }}><Text>Chat</Text></Layout>
  )
}

export default Chat