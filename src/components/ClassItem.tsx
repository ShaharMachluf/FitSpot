import React from 'react'
import { Class } from '../stores/useClassStore'
import { View, Text } from 'react-native'
import style from '../services/style'
import Octicons from 'react-native-vector-icons/Octicons'
import { ProgressBar } from 'react-native-paper';
import colors from '../services/colors'

interface Props{
    c: Class
}

const ClassItem = ({c}: Props) => {
  return (
    <View style={style.class_item}>
        <Text style={style.hours}>{c.start} - {c.end}</Text>
        <Text style={style.name}>{c.name}</Text>
        <Text style={style.trainer}>{c.trainer}</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Octicons name='people' size={15}/>
            <Text style={style.participants}>  {c.participants.length}/{c.maxParticipants}</Text>
            {/* <ProgressBar progress={c.participants.length === 0 ? 0 : c.participants.length / c.maxParticipants} color={colors.dark_tin} /> */}
            {/* <Text> </Text> */}
        </View>
    </View>
  )
}

export default ClassItem