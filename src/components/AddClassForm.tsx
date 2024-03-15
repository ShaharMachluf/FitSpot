import React, { useState } from "react";
import {
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  Text,
  View,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import style from "../services/style";
import colors from "../services/colors";
import DateTimePicker, { DateType } from "react-native-ui-datepicker";
import TimePicker from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';

const AddClassForm = () => {
  const [name, setName] = useState<string>("");
  const [trainer, setTrainer] = useState<string>("");
  const [date, setDate] = useState<DateType>(dayjs());
  const [start, setStart] = useState<Date>(new Date());
  const [end, setEnd] = useState<Date>(new Date());
  const [minParticipants, setMinParticipants] = useState<string>('');
  const [maxParticipants, setMaxParticipants] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [datePicker, setDatePicker] = useState<boolean>(false)

  const addAction = async(): Promise<void> => {

  }

  return (
    <>
    {
        datePicker ? (
            <>
                <DateTimePicker
                    mode="single"
                    date={date}
                    onChange={(params) => setDate(params.date)}
                />
                <TouchableOpacity onPress={() => setDatePicker(false)}>
                    <Text>Confirm</Text>
                </TouchableOpacity>
            </>
        ) : (
            <>
                <TextInput
        value={name}
        onChangeText={(text) => setName(text)}
        keyboardType="default"
        placeholder="Class Name"
        style={style.input}
      />
      <TextInput
        value={trainer}
        onChangeText={(text) => setTrainer(text)}
        keyboardType="default"
        placeholder="Trainer"
        style={style.input}
      />
      <TextInput
        value={minParticipants}
        onChangeText={(text) => setMinParticipants(text)}
        keyboardType="numeric"
        placeholder="Minimum Participants"
        style={style.input}
      />
      <TextInput
        value={maxParticipants}
        onChangeText={(text) => setMaxParticipants(text)}
        keyboardType="numeric"
        placeholder="Maximum Participants"
        style={style.input}
      />

        <TouchableOpacity style={style.date_time_btn} onPress={() => setDatePicker(true)}>
            <Text style={style.btn_txt}>Class Date: {dayjs(date).format('DD/MM/YYYY')}</Text>
        </TouchableOpacity>
        <View style={style.time_container}>
            <TouchableOpacity style={style.date_time_btn}>
                <Text style={[style.btn_txt, style.time_txt]}>Pick Start Time</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.date_time_btn}>
                <Text style={[style.btn_txt, style.time_txt]}>Pick End Time</Text>
            </TouchableOpacity>
        </View>
        

        {isLoading ? (
        <ActivityIndicator size="large" color={colors.dark_orange} />
      ) : (
        <TouchableOpacity style={[style.btn,{backgroundColor:colors.dark_orange}]} onPress={addAction}>
          <Text style={style.btn_txt}>Add</Text>
        </TouchableOpacity>
      )}
            </>
        )
    }
      


{/* <DateTimePicker
        mode="single"
        date={date}
        onChange={(params) => setDate(params.date)}
        initialView="time"
      /> */}


    </>
  );
};

export default AddClassForm;
