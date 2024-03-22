import * as React from "react";
import { Modal, Portal, Button } from "react-native-paper";
import AddClassForm from "./AddClassForm";
import { TouchableOpacity, View, Text } from "react-native";
import style from "../services/style";

const MyComponent = () => {
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
          <AddClassForm hideModal={hideModal} />
        </Modal>
      </Portal>
        <TouchableOpacity
          style={[style.btn, style.add_class_btn]}
          onPress={showModal}
        >
          <Text style={style.btn_txt}>Add Class</Text>
        </TouchableOpacity>
    </>
  );
};

export default MyComponent;
