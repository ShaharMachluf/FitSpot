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
        if (currUser && classes.length > 0) {
            setMyClasses(classes.filter(c => c.participants.includes(currUser.uid)));
        }
    }, [currUser, classes])

    const getClassesByDate = (): Class[] => {
        const today = new Date();
        return myClasses.filter((c) => {
            const classDate = new Date(c.date.split('/').reverse().join('-'));
            return classDate >= today;
        }).sort((a, b) => {
          const dateA = new Date(`1970-01-01T${a.start}`);
          const dateB = new Date(`1970-01-01T${b.start}`);
          return dateA.getTime() - dateB.getTime();
        });
      }

  return (
    <View style={{height: 260}}>
        <FlatList
            data={getClassesByDate()}
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