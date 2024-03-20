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
        <Text>{c.start} - {c.end}</Text>
        <Text>{c.name}</Text>
        <Text>{c.trainer}</Text>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent:'space-between', width:"75%"}}>
            <Text>{c.participants.length}    </Text>
            <ProgressBar progress={c.participants.length === 0 ? 0 : c.participants.length / c.maxParticipants} color={colors.dark_tin} />
            <Text>    {c.maxParticipants}</Text>
        </View>
    </View>
  )
}

export default ClassItem