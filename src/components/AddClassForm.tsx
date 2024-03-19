import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  Text,
  View,
  Alert,
} from "react-native";
import style from "../services/style";
import colors from "../services/colors";
import DateTimePicker, { DateType } from "react-native-ui-datepicker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import dayjs from "dayjs";
import { Class, useClass } from "../stores/useClassStore";
import { addClass } from "../services/classService";

const AddClassForm = () => {
  const [name, setName] = useState<string>("");
  const [trainer, setTrainer] = useState<string>("");
  const [date, setDate] = useState<DateType>(dayjs());
  const [start, setStart] = useState<Date | null>(null);
  const [end, setEnd] = useState<Date | null>(null);
  const [minParticipants, setMinParticipants] = useState<string>("");
  const [maxParticipants, setMaxParticipants] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [datePicker, setDatePicker] = useState<boolean>(false);
  const [isStartTimePickerVisible, setStartTimePickerVisibility] = useState(false);
  const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);

  const addClassToStore = useClass((state)=>state.addClass)
  const classes = useClass((state)=>state.classes)

  const showStartTimePicker = () => {
    setStartTimePickerVisibility(true);
  };
  
  const hideStartTimePicker = () => {
    setStartTimePickerVisibility(false);
  };
  
  const showEndTimePicker = () => {
    setEndTimePickerVisibility(true);
  };
  
  const hideEndTimePicker = () => {
    setEndTimePickerVisibility(false);
  };

  const handleTimeConfirm = (time: Date, set: React.Dispatch<React.SetStateAction<Date | null>>, hide: () => void) => {
    set(time);
    hide();
  };

  const handleAddClass = async(c: Omit<Class, "id">): Promise<void> => {
    try{
      const id = await addClass(c)
      addClassToStore({...c, id})    
      setIsLoading(false)
    }catch(error){
      console.error('Error adding class:', error);
      setIsLoading(false)
    }
  }

  const addAction = async (): Promise<void> => {
    setIsLoading(true)
    //validation
    if(name === "" || trainer === "" || !date || !start || !end || minParticipants === "" || maxParticipants === ""){
      Alert.alert("Error", "All the fields must be filled")
      setIsLoading(false)
      return 
    }
    if(start > end){
      Alert.alert("Error", "Start time must be earlier than end time")
      setIsLoading(false)
      return
    }
    if(Number(minParticipants) >= Number(maxParticipants)){
      Alert.alert("Error", "Maximum number of participants must be larger than the minimum")
      setIsLoading(false)
      return
    }
      const newClass: Omit<Class, "id"> = {
        name: name,
        trainer: trainer,
        date: dayjs(date).format("DD/MM/YYYY"),
        start: start.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
        end: end.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
        minParticipants: Number(minParticipants),
        maxParticipants: Number(maxParticipants),
        participants: [],
        waitingList: []
      } 
      await handleAddClass(newClass)

  };

  return (
    <>
      {datePicker ? (
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
          <Text style={style.add_title}>Add Class</Text>
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

          <TouchableOpacity
            style={style.date_time_btn}
            onPress={() => setDatePicker(true)}
          >
            <Text style={style.btn_txt}>
              Class Date: {dayjs(date).format("DD/MM/YYYY")}
            </Text>
          </TouchableOpacity>
          <View style={style.time_container}>
            <TouchableOpacity
              style={style.date_time_btn}
              onPress={showStartTimePicker}
            >
              {start ? (
                <Text style={[style.btn_txt, style.time_txt]}>
                  Start:{" "}
                  {start.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}
                </Text>
              ) : (
                <Text style={[style.btn_txt, style.time_txt]}>
                  Pick Start Time
                </Text>
              )}
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isStartTimePickerVisible}
              mode="time"
              onConfirm={(time) => handleTimeConfirm(time, setStart, hideStartTimePicker)}
              onCancel={hideStartTimePicker}
            />
            <TouchableOpacity
              style={style.date_time_btn}
              onPress={showEndTimePicker}
            >
              {end ? (
                <Text style={[style.btn_txt, style.time_txt]}>
                  End:{" "}
                  {end.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}
                </Text>
              ) : (
                <Text style={[style.btn_txt, style.time_txt]}>
                  Pick End Time
                </Text>
              )}
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isEndTimePickerVisible}
              mode="time"
              onConfirm={(time) => handleTimeConfirm(time, setEnd, hideEndTimePicker)}
              onCancel={hideEndTimePicker}
            />
          </View>

          {isLoading ? (
            <ActivityIndicator size="large" color={colors.dark_orange} />
          ) : (
            <TouchableOpacity
              style={[style.btn, { backgroundColor: colors.dark_orange }]}
              onPress={addAction}
            >
              <Text style={style.btn_txt}>Add</Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </>
  );
};

export default AddClassForm;
