import React, { useState, useContext } from "react";

// Components
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Card } from "react-native-elements";
import AddItemDialog from "./AddItemDialog";
import RemoveItemDialog from "./RemoveItemDialog";

// Icons
import { MaterialIcons, Feather } from "@expo/vector-icons";

// Context
import { Context } from "../context/TrackerContext";

const ListItems = ({ title, type, started, catid, itemid }) => {
  const { editItem, deleteItem, setStarted, stopItem, startItem } = useContext(
    Context
  );
  const [isEditVisible, setEditVisible] = useState(false);
  const [isRemoveVisible, setRemoveVisible] = useState(false);
  const [hasStarted, setHasStarted] = useState(started);

  const openEditModal = () => {
    setEditVisible(true);
  };

  const closeEditModal = () => {
    setEditVisible(false);
  };

  const openRemoveModal = () => {
    setRemoveVisible(true);
  };

  const closeRemoveModal = () => {
    setRemoveVisible(false);
  };

  const toggleItem = () => {
    if (!hasStarted) {
      startItem(catid, itemid, title);
    } else {
      stopItem(itemid);
    }
    setStarted(catid, itemid, title, !hasStarted);
    setHasStarted(!hasStarted);
  };

  return (
    <Card containerStyle={styles.card}>
      <View style={styles.container}>
        <View>
          <TouchableOpacity onPress={() => openEditModal()}>
            <MaterialIcons name="edit" size={20} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginTop: 10 }}
            onPress={() => openRemoveModal()}
          >
            <Feather name="trash-2" size={20} />
          </TouchableOpacity>
        </View>
        <View style={{ marginLeft: 15 }}>
          <Text>
            <Text style={{ fontWeight: "bold" }}>Name: </Text>
            {title}
          </Text>
          {hasStarted ? (
            <TouchableOpacity style={styles.stop} onPress={() => toggleItem()}>
              <Text>Stop</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.start} onPress={() => toggleItem()}>
              <Text>Start</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <AddItemDialog
        isModalVisible={isEditVisible}
        closeModal={closeEditModal}
        type={type}
        catid={catid}
        initialValues={{ title: title }}
        onSubmit={(title) => {
          editItem(catid, itemid, title, started, closeEditModal);
        }}
      />
      <RemoveItemDialog
        isModalVisible={isRemoveVisible}
        closeModal={closeRemoveModal}
        type={type}
        catid={catid}
        onSubmit={(catid) => {
          deleteItem(catid, itemid, closeRemoveModal);
        }}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    borderColor: "transparent",
    backgroundColor: "#EBF1FF",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  start: {
    backgroundColor: "#93E9BE",
    alignItems: "center",
    borderRadius: 5,
    padding: 5,
    marginTop: 20,
    height: 35,
    width: 100,
  },
  stop: {
    backgroundColor: "#FF6961",
    alignItems: "center",
    borderRadius: 5,
    padding: 5,
    marginTop: 20,
    height: 35,
    width: 100,
  },
});

export default ListItems;
