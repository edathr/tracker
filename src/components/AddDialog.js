import React, { useState } from "react";

// Components
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modal";
import { Dropdown } from "react-native-material-dropdown";

const AddDialog = ({ isModalVisible, closeModal, initialValues, onSubmit }) => {
  const data = [
    { value: "Books" },
    { value: "TV Shows" },
    { value: "Movies" },
    { value: "Games" },
    { value: "Songs" },
  ];
  const [title, setTitle] = useState(initialValues.title);
  const [category, setCategory] = useState(initialValues.category);

  return (
    <Modal
      isVisible={isModalVisible}
      onBackdropPress={() => closeModal()}
      onBackButtonPress={() => closeModal()}
      backdropOpacity={0.5}
    >
      <View style={styles.modal}>
        <View style={styles.name}>
          <Text style={{ marginBottom: 10 }}>Name:</Text>
          <TextInput
            placeholder="Enter category name"
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
        </View>
        <View style={styles.category}>
          <Text>Type:</Text>
          <Dropdown
            label="Category type"
            data={data}
            value={category}
            onChangeText={(text) => setCategory(text)}
          />
        </View>
        <TouchableOpacity
          style={styles.finishbutton}
          onPress={() => {
            onSubmit(title, category);
          }}
        >
          <Text style={{ color: "white", fontSize: 16 }}>Finish</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

AddDialog.defaultProps = {
  initialValues: {
    title: "",
    category: "",
  },
};

const styles = StyleSheet.create({
  modal: {
    maxHeight: Dimensions.get("window").height / 2,
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
  },
  name: {
    marginBottom: 10,
    fontSize: 16,
  },
  category: {
    marginBottom: 20,
    fontSize: 16,
  },
});

export default AddDialog;
