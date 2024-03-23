import React, { useState } from "react";
import { Class, useClass } from "../stores/useClassStore";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import style from "../services/style";
import Octicons from "react-native-vector-icons/Octicons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useMutation } from "react-query";
import { removeClass } from "../services/classService";
import UpdateClassComponent from "./UpdateClassComponent";

interface Props {
  c: Class;
  mode: string;
}

const ClassItem = ({ c, mode }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
        <Text style={style.hours}>
          {c.start} - {c.end}
        </Text>
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
        <></>
      )}
    </View>
  );
};

export default ClassItem;
