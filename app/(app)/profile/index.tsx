import Layout from '@/components/Layout'
import React from 'react'
import { View, Text } from 'react-native'

const Profile = () => {
  return (
    <Layout header={{ leftButton: 'menu', rightButton: 'none' }}><Text>Profile</Text></Layout>
  )
}

export default Profile