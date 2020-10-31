import React, { useState } from "react";

// Components
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modal";
import TagInput from "react-native-tags-input";

const AddItemDialog = ({
  isModalVisible,
  closeModal,
  type,
  initialValues,
  onSubmit,
}) => {
  //TODO: Tags, check if the person fixed the problem, or if need to do from scratch
  const [title, setTitle] = useState(initialValues.title);
  const [tags, setTags] = useState({
    tag: "",
    tagsArray: [],
  });

  const updateTagState = (state) => {
    setTags({
      tags: state,
    });
  };

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
            placeholder={`Enter name of ${type}`}
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
        </View>

        {/* <View style={styles.name}>
                    <Text style={{marginBottom: 10}}>Tags:</Text>
                </View> */}

        <TouchableOpacity
          style={styles.finishbutton}
          onPress={() => {
            onSubmit(title);
          }}
        >
          <Text style={{ color: "white", fontSize: 16 }}>Finish</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

AddItemDialog.defaultProps = {
  initialValues: {
    title: "",
  },
  type: "book",
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
  },
  name: {
    marginBottom: 10,
    fontSize: 16,
  },
  category: {
    marginBottom: 20,
    fontSize: 16,
  },
  tags: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AddItemDialog;
