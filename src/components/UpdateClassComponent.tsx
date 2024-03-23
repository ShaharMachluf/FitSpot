import React from 'react'
import { Modal, Portal, Button } from "react-native-paper";
import { TouchableOpacity, View, Text } from "react-native";
import style from "../services/style";
import UpdateClassForm from './UpdateClassForm';
import { Class } from '../stores/useClassStore';

interface Props{
    c: Class
}

const UpdateClassComponent = ({c}: Props) => {
    const [visible, setVisible] = React.useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
  return (
    <>
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={style.add_container}
      >
        <UpdateClassForm c={c} hideModal={hideModal} />
      </Modal>
    </Portal>
    <TouchableOpacity style={style.class_item_btn_container} onPress={showModal}>
          <Text style={style.update_txt}>Update</Text>
        </TouchableOpacity>
  </>
  )
}

export default UpdateClassComponent