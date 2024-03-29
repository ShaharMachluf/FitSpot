import React, { useState } from 'react'
import { User, useUser } from '../stores/useUserStore';
import { ActivityIndicator, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import style from '../services/style';
import colors from '../services/colors';
import { useMutation } from 'react-query';
import { updateUser } from '../services/userService';

interface Props {
    hideModal: () => void;
}

const UpdateUserForm: React.FC<Props> = ({hideModal}) => {

    const currUser = useUser((state) => state.user)
    const setUser = useUser((state) => state.setUser)

    const [firstName, setFirstName] = useState<string>(currUser ? currUser.firstName : "")
    const [lastName, setLastName] = useState<string>(currUser ? currUser.lastName : "")
    const [mobile, setMobile] = useState<string>(currUser ? currUser.mobile : "")
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const updateMutation = useMutation((update: User) => 
        updateUser(update), {
            onSuccess: (data : User | string) => {
                if(typeof(data) === 'string'){
                    Alert.alert("Error", data)
                }
                else{
                    setUser(data)
                    setIsLoading(false)
                    hideModal()
                }
            }
        }
    )

    const updateAction = async() => {
        setIsLoading(true)
        if(firstName === "" || lastName === "" || mobile === ""){
            Alert.alert("Error", "All the fields must be filled")
            setIsLoading(false)
        }
        if(currUser){
            const newUser: User = {
                firstName,
                lastName,
                mobile,
                email: currUser?.email,
                isTrainer: currUser.isTrainer,
                uid: currUser.uid,
                myClasses: currUser.myClasses
            }
            updateMutation.mutate(newUser)

        }


    }

  return (
    <>
    <TextInput
    value={firstName}
    onChangeText={(text) => setFirstName(text)}
    keyboardType="default"
    placeholder="First name"
    style={style.input}
  />

  <TextInput
    value={lastName}
    onChangeText={(text) => setLastName(text)}
    keyboardType="default"
    placeholder="Last name"
    style={style.input}
  />

  <TextInput
    value={mobile}
    onChangeText={(text) => setMobile(text)}
    keyboardType="phone-pad"
    placeholder="Mobile"
    autoCapitalize="none"
    style={style.input}
  />

    {isLoading ? (
        <ActivityIndicator size="large" color={colors.dark_orange} />
        ) : (
        <TouchableOpacity
            style={[style.btn, { backgroundColor: colors.dark_orange }]}
            onPress={updateAction}
        >
            <Text style={style.btn_txt}>Update</Text>
        </TouchableOpacity>
    )}
  </>
  )
}

export default UpdateUserForm