import React from 'react'
import { Class } from '../stores/useClassStore'
import { View, Text, TouchableOpacity } from 'react-native'
import style from '../services/style'
import Octicons from 'react-native-vector-icons/Octicons'
import Ionicons from 'react-native-vector-icons/Ionicons'

interface Props{
    c: Class;
    mode: string
}

const ClassItem = ({c, mode}: Props) => {
  return (
    <View style={style.class_item}>
        {
            mode === 'trainer' ? (
            <View style={[style.time_container, {marginBottom:0}]}>
                <Text style={style.hours}>{c.start} - {c.end}</Text>
                <Ionicons name='trash-outline' size={20} color="#bcbcbc"/>
            </View>
            ) : (
                <Text style={style.hours}>{c.start} - {c.end}</Text>
            )
        }
        <Text style={style.name}>{c.name}</Text>
        <Text style={style.trainer}>{c.trainer}</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Octicons name='people' size={15}/>
            <Text style={style.participants}>  {c.participants.length}/{c.maxParticipants}</Text>
        </View>
        {
            mode === 'trainer' ? (
            <TouchableOpacity style={style.class_item_btn_container}>
                <Text style={style.update_txt}>Update</Text>
            </TouchableOpacity>
            ) : (
                <>
                </>
            )
        }

    </View>
  )
}

export default ClassItem