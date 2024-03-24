import React, { useEffect, useState } from "react";
import { Class, useClass } from "../stores/useClassStore";
import { View, Text, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import style from "../services/style";
import Octicons from "react-native-vector-icons/Octicons";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { useMutation } from "react-query";
import { addUserToClass, removeClass } from "../services/classService";
import UpdateClassComponent from "./UpdateClassComponent";
import { useUser } from "../stores/useUserStore";
import { addClasstoUser } from "../services/userService";
import { auth } from "../services/firebase-config";
import { FieldValue } from "firebase/firestore";

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

  const useAddUserToClass = useClass((state) => state.addUserToClass)
  const useAddUserToWaiting = useClass((state) => state.addUserToWaiting)

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
  }, [])

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
          await addUserToClass(auth.currentUser.uid, c.id, arr)
          useAddUserToWaiting(uid, c.id)
          setIsWaiting(true)
        }
        setIsLoading(false)
      }   
    } catch(error){
      const er = error as Error
      Alert.alert("error", er.message)
    }
  }

  return (
    <View style={style.class_item}>
      {mode === "trainer" ? (
        <View style={[style.time_container, { marginBottom: 0 }]}>
          <Text style={style.hours}>
            {c.start} - {c.end}
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
                {c.start} - {c.end}
              </Text>
              <MaterialCommunityIcons name="calendar-plus" size={20} color="#bcbcbc"/>
            </View>
            ) : (
              <Text style={style.hours}>
                {c.start} - {c.end}
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
              <TouchableOpacity style={style.class_item_btn_container}>
              <Text style={style.update_txt}>Cancle registration</Text>
            </TouchableOpacity>
            ) : (
              <>
              {
                isWaiting ? (
                  <TouchableOpacity style={style.class_item_btn_container}>
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
