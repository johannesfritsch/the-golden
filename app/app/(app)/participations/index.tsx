import Header from '@/components/Header'
import Layout from '@/components/Layout'
import TabBar from '@/components/TabBar'
import React from 'react'
import { View, Text } from 'react-native'

const Participations = () => {
  return (
    <Layout topElement={<Header leftButton='menu' rightButton='auth' />} bottomElement={<TabBar />}>
      <Text>Participations</Text>
    </Layout>
  )
}

export default Participations