import Header from '@/components/Header'
import Layout from '@/components/Layout'
import TabBar from '@/components/TabBar'
import React from 'react'
import { Text } from 'react-native'

const Profile = () => {
  return (
    <Layout header={<Header leftButton='menu' rightButton='auth' />} footer={<TabBar />}>
      <Text>Profile</Text>
    </Layout>
  )
}

export default Profile