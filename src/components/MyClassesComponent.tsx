import React, { useEffect, useState } from 'react'
import { FlatList, View, Text } from 'react-native'
import { useUser } from '../stores/useUserStore'
import { Class, useClass } from '../stores/useClassStore'
import { fetchClass } from '../services/classService'
import ClassItem from './ClassItem'

const MyClassesComponent = () => {
    const currUser = useUser((state) => state.user)
    const classes = useClass((state) => state.classes)
    const [myClasses, setMyClasses] = useState<Class[]>([])

    useEffect(() => {
        const getClasses = async() => {
            if(currUser)
                setMyClasses(classes.filter(c => c.participants.includes(currUser.uid)))
        }
        getClasses()
    }, [])
  return (
    <View>
        <FlatList
            data={myClasses}
            renderItem={({ item }) => <ClassItem c={item} mode={"trainee"}/>}
            ListEmptyComponent={
            <View style={{alignItems: 'center'}}>
                <Text>You have no upcomig classes</Text>
            </View>
            }
            keyExtractor={item => item.id}
            />
    </View>
  )
}

export default MyClassesComponent