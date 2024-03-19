import * as React from "react";
import { Modal, Portal, Text, Button } from "react-native-paper";
import AddClassForm from "./AddClassForm";
import { View } from "react-native";
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
            <AddClassForm hideModal={hideModal}/>
        </Modal>
      </Portal>
      <Button style={{ marginTop: 30 }} onPress={showModal} >
        Show
      </Button>
    </>
  );
};

export default MyComponent;
