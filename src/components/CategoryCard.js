import React, { useState, useContext } from "react";

// Components
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Card } from "react-native-elements";
import AddDialog from "./AddDialog";
import RemoveItemDialog from "./RemoveItemDialog";
import OptionsMenu from "react-native-options-menu";

// Navigation
import { withNavigation } from "react-navigation";

// Icons
import { Entypo } from "@expo/vector-icons";

// Context
import { Context } from "../context/TrackerContext";

const CategoryCard = ({ icon, catid, title, category, navigation }) => {
  const { deleteCategory, editCategory } = useContext(Context);
  const [isDeleteVisible, setDeleteVisible] = useState(false);
  const [isEditVisible, setEditVisible] = useState(false);

  const openDelete = () => {
    setDeleteVisible(true);
  };

  const closeDelete = () => {
    setDeleteVisible(false);
  };

  const openEdit = () => {
    setEditVisible(true);
  };

  const closeEdit = () => {
    setEditVisible(false);
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => navigation.navigate("Category", { catid: catid })}
    >
      <Card containerStyle={styles.container}>
        <View style={styles.card}>
          {icon}
          <View style={styles.options}>
            <Text style={styles.text}>{title}</Text>
            <View style={{ paddingLeft: 20 }}>
              <OptionsMenu
                customButton={<Entypo name="dots-three-vertical" size={18} />}
                options={["Edit", "Delete"]}
                actions={[openEdit, openDelete]}
              />
            </View>
          </View>
        </View>
      </Card>

      <AddDialog
        isModalVisible={isEditVisible}
        closeModal={closeEdit}
        initialValues={{ title: title, category: category }}
        catid={catid}
        onSubmit={(title, category) => {
          editCategory(catid, title, category, closeEdit);
        }}
      />
      <RemoveItemDialog
        isModalVisible={isDeleteVisible}
        closeModal={closeDelete}
        catid={catid}
        onSubmit={(catid) => {
          deleteCategory(catid, closeDelete);
        }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 160,
    borderRadius: 10,
    borderColor: "transparent",
    backgroundColor: "#EBF1FF",
    elevation: 5,
  },
  text: {
    color: "#4F527B",
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 10,
  },
  card: {
    alignItems: "center",
  },
  options: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "baseline",
  },
});

export default withNavigation(CategoryCard);
