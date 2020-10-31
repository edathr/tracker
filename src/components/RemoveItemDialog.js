import React from "react";

// Components
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";

const RemoveItemDialog = ({ isModalVisible, closeModal, catid, onSubmit }) => {
  return (
    <Modal
      isVisible={isModalVisible}
      onBackdropPress={() => closeModal()}
      onBackButtonPress={() => closeModal()}
      backdropOpacity={0.5}
    >
      <View style={styles.modal}>
        <Text style={{ fontSize: 20, alignSelf: "center" }}>
          Confirm removal?
        </Text>
        <View style={styles.buttonrow}>
          <TouchableOpacity
            style={styles.cancelbutton}
            onPress={() => closeModal()}
          >
            <Text style={{ color: "grey", fontSize: 16 }}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.finishbutton}
            onPress={() => onSubmit(catid)}
          >
            <Text style={{ color: "white", fontSize: 16 }}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 30,
    paddingBottom: 30,
  },
  header: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 20,
  },
  finishbutton: {
    backgroundColor: "#7E82C4",
    borderRadius: 5,
    alignItems: "center",
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 20,
    paddingRight: 20,
  },
  cancelbutton: {
    borderColor: "grey",
  },
  buttonrow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 20,
  },
});

export default RemoveItemDialog;
