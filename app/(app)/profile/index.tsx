import Header from '@/components/Header'
import Layout from '@/components/Layout'
import TabBar from '@/components/TabBar'
import React from 'react'
import { Text } from 'react-native'

const Profile = () => {
  return (
    <Layout topElement={<Header leftButton='menu' rightButton='auth' />} bottomElement={<TabBar />}>
      <Text>Profile</Text>
    </Layout>
  )
}

export default Profile