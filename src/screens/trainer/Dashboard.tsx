import React from 'react'
import { Button, Text } from 'react-native'
import { auth } from '../../services/firebase-config'
import AddClassComponent from '../../components/AddClassComponent'

const Dashboard = () => {

    const handleSignOut = async() => {
        await auth.signOut()
    }

  return (
    <>
        <Text>Trainer's dashboard</Text>
        <Button title='log out' onPress={handleSignOut}></Button>
        <AddClassComponent />
    </>

  )
}

export default Dashboard