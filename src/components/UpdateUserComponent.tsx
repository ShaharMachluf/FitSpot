import * as React from "react";
import { Modal, Portal, Button } from "react-native-paper";
import AddClassForm from "./AddClassForm";
import { TouchableOpacity, View, Text } from "react-native";
import style from "../services/style";
import UpdateUserForm from "./UpdateUserForm";

const UpdateUserComponent = () => {
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
          <UpdateUserForm hideModal={hideModal} />
        </Modal>
      </Portal>
        <TouchableOpacity
          style={style.class_item_btn_container}
          onPress={showModal}
        >
          <Text style={style.update_txt}>Update</Text>
        </TouchableOpacity>
    </>
  );
};

export default UpdateUserComponent;