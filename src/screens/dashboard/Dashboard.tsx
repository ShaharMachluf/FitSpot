import React from 'react'
import { Button, Text } from 'react-native'
import { signOut } from 'firebase/auth'
import { auth } from '../../services/firebase-config'

const Dashboard = () => {

    const handleSignOut = async() => {
        await auth.signOut()
    }

  return (
    <>
    <Text>Dashboard</Text>
    <Button title='log out' onPress={handleSignOut}></Button>
    </>

  )
}

export default Dashboard