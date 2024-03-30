import React, { useEffect, useState } from "react";
import { Class, useClass } from "../stores/useClassStore";
import { View, Text, TouchableOpacity, ActivityIndicator, Alert, Platform } from "react-native";
import style from "../services/style";
import Octicons from "react-native-vector-icons/Octicons";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { useMutation } from "react-query";
import { addUserToClass, removeClass, removeUserFromClass } from "../services/classService";
import UpdateClassComponent from "./UpdateClassComponent";
import { useUser } from "../stores/useUserStore";
import { addClasstoUser, removeClassFromUser } from "../services/userService";
import { auth } from "../services/firebase-config";
import * as Calendar from 'expo-calendar';

interface Props {
  c: Class;
  mode: string;
}

const ClassItem = ({ c, mode }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [isWaiting, setIsWaiting] = useState<boolean>(false);
  const [isFull, setIsFull] = useState<boolean>(false);

  const currUser = useUser((state) => state.user);
  const useAddToClass = useUser((state) => state.addToClass)
  const useRemoveFromClass = useUser((state) => state.removeFromClass)

  const classes = useClass((state) => state.classes)
  const useAddUserToClass = useClass((state) => state.addUserToClass)
  const useAddUserToWaiting = useClass((state) => state.addUserToWaiting)
  const useRemoveUserFromClass = useClass((state) => state.removeUserFromClass)
  const useRemoveUserFromWaiting = useClass((state) => state.removeUserFromWaiting)

  useEffect(() => {
    if(c.participants.length === c.maxParticipants){
      setIsFull(true)
    }
    if(currUser && c.participants.includes(currUser?.uid)){
      setIsRegistered(true)
    }
    else if(currUser && c.waitingList.includes(currUser.uid)){
      setIsWaiting(true)
    }
  }, [classes, c.participants])

  const deleteClassMutation = useMutation(() => removeClass(c.id), {
    onSuccess: () => {
      useClass.getState().removeClass(c.id);
      setIsLoading(false);
    },
  });

  const handleDelete = () => {
    setIsLoading(true);
    deleteClassMutation.mutate();
  };

  const handleAdd = async (arr: string) => {
    setIsLoading(true)
    try{
      if(auth.currentUser){
        const uid = auth.currentUser.uid
        if(arr === 'register'){
          await addClasstoUser(uid, c.id)
          await addUserToClass(uid, c.id, arr)
          useAddToClass(c.id)
          useAddUserToClass(uid, c.id)
          setIsRegistered(true)
        } else{
          await addUserToClass(uid, c.id, arr)
          useAddUserToWaiting(uid, c.id)
          setIsWaiting(true)
        }
        setIsLoading(false)
      }   
    } catch(error){
      const er = error as Error
      Alert.alert("error", er.message)
      setIsLoading(false)
    }
  }

  const handleRemove = async(arr: string) => {
    setIsLoading(true)
    try{
      if(auth.currentUser){
        const uid = auth.currentUser.uid;
        if(arr === "register"){
          await removeUserFromClass(uid, c.id, arr)
          await removeClassFromUser(uid, c.id)
          useRemoveFromClass(c.id)
          useRemoveUserFromClass(uid, c.id)
          if(c.waitingList.length > 0){
            const waitingId = c.waitingList[0]
            await removeUserFromClass(waitingId, c.id, 'waiting')
            useRemoveUserFromWaiting(waitingId, c.id)
            await addUserToClass(waitingId, c.id, 'register')
            await addClasstoUser(waitingId, c.id)
            useAddUserToClass(waitingId, c.id)
          }
          setIsRegistered(false)
        } else {
          await removeUserFromClass(uid, c.id, arr)
          useRemoveUserFromWaiting(uid, c.id)
          setIsWaiting(false)
        }
        setIsLoading(false)
      }
    } catch(error){
      const er = error as Error
      Alert.alert("error", er.message)
      setIsLoading(false)
    }
  }

const getDefaultCalendarSource = async() => {
  const defaultCalendar = await Calendar.getDefaultCalendarAsync();  
  return defaultCalendar.source;
}

  const addClassToCalendar = async() => {

    const { status } = await Calendar.requestCalendarPermissionsAsync();
    if (status === 'granted') {
      const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
    

    const defaultCalendarSource =
    Platform.OS === 'ios'
        ? await getDefaultCalendarSource()
        : calendars[0].source;

        if (!defaultCalendarSource) {
          alert('No default calendar found');          
          return;
      }
      
      const newCalendarID = await Calendar.createCalendarAsync({
        title: 'Expo Calendar',
        color: 'blue',
        entityType: Calendar.EntityTypes.EVENT,
        sourceId: defaultCalendarSource.id,
        source: defaultCalendarSource,
        name: 'internalCalendarName',
        ownerAccount: 'personal',
        accessLevel: Calendar.CalendarAccessLevel.OWNER,
      });
      

      const newEvent = {
          title: c.name,
          startDate: new Date(`${c.date.split('/').reverse().join('-')}T${c.start}`),
          endDate: new Date(`${c.date.split('/').reverse().join('-')}T${c.end}`),
          timeZone: 'local',
      };

      const eventId = await Calendar.createEventAsync(newCalendarID, newEvent);
      alert('Event added to your calendar');
      }
  }

  return (
    <View style={style.class_item}>
      {mode === "trainer" ? (
        <View style={[style.time_container, { marginBottom: 0 }]}>
          <Text style={style.hours}>
            {c.start} - {c.end} | {c.date}
          </Text>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <Ionicons
              name="trash-outline"
              size={20}
              color="#bcbcbc"
              onPress={handleDelete}
            />
          )}
        </View>
      ) : (
        <>
          {
            isRegistered ? (
              <View style={[style.time_container, { marginBottom: 0 }]}>
              <Text style={style.hours}>
                {c.start} - {c.end} | {c.date}
              </Text>
              <MaterialCommunityIcons name="calendar-plus" size={20} color="#bcbcbc" onPress={addClassToCalendar}/>
            </View>
            ) : (
              <Text style={style.hours}>
                {c.start} - {c.end} | {c.date}
              </Text>
            )
          }
        </>
      )}
      <Text style={style.name}>{c.name}</Text>
      <Text style={style.trainer}>{c.trainer}</Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Octicons name="people" size={15} />
        <Text style={style.participants}>
          {" "}
          {c.participants.length}/{c.maxParticipants}
        </Text>
      </View>
      {mode === "trainer" ? (
        <UpdateClassComponent c={c} />
      ) : (
        <>
        {
          isLoading ? (
            <ActivityIndicator />
          ) : (
            <>
          {
            isRegistered ? (
              <TouchableOpacity style={style.class_item_btn_container} onPress={() => handleRemove('register')}>
              <Text style={style.update_txt}>Cancle registration</Text>
            </TouchableOpacity>
            ) : (
              <>
              {
                isWaiting ? (
                  <TouchableOpacity style={style.class_item_btn_container} onPress={() => handleRemove('waiting')}>
                    <Text style={style.update_txt}>Cancle waiting</Text>
                  </TouchableOpacity>
                ) : (
                  isFull ? (
                    <TouchableOpacity style={style.class_item_btn_container} onPress={() => handleAdd("waiting")}>
                      <Text style={style.update_txt}>Enter waiting list</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity style={style.class_item_btn_container} onPress={() => handleAdd("register")}>
                      <Text style={style.update_txt}>Register</Text>
                    </TouchableOpacity>
                  )
                )
              }
              </>
            )
          }
        </>
          )
        }
        </>
      )}
    </View>
  );
};

export default ClassItem;
