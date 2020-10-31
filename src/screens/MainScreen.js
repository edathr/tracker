import React, { useState, useContext, useEffect } from "react";

// Components
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import CategoryCard from "../components/CategoryCard";
import AddDialog from "../components/AddDialog";
import { SearchBar } from "react-native-elements";
import Grid from "react-native-grid-component";
import { FlatList } from "react-native-gesture-handler";
import SearchScreen from "./SearchScreen";
import { Card } from "react-native-elements";

// Gradient
import { LinearGradient } from "expo-linear-gradient";

// Icons
import {
  FontAwesome5,
  Ionicons,
  AntDesign,
  MaterialIcons,
  Entypo,
} from "@expo/vector-icons";

// Context
import { Context } from "../context/TrackerContext";

const MainScreen = ({ navigation }) => {
  const { state, addCategory, getCategory, getCurrentlyStarted } = useContext(
    Context
  );
  const [isModalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getCategory();
    getCurrentlyStarted();

    const listener = navigation.addListener("didFocus", () => {
      getCategory();
      getCurrentlyStarted();
    });

    //cleans up listener
    return () => {
      listener.remove();
    };
  }, []);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const updateSearch = (newSearch) => {
    setSearch(newSearch);
  };

  const renderItem = (data) => {
    if (data.category === "Books") {
      icon = <FontAwesome5 name="book-open" size={30} />;
    } else if (data.category === "Movies") {
      icon = <MaterialIcons name="movie-filter" size={30} />;
    } else if (data.category === "TV Shows") {
      icon = <Entypo name="tv" size={30} />;
    } else {
      icon = <Entypo name="game-controller" size={30} />;
    }

    return (
      <CategoryCard
        key={data.catid}
        title={data.title}
        catid={data.catid}
        category={data.category}
        icon={icon}
      />
    );
  };

  const renderWatch = (data) => {
    return <Text style={styles.item}>{data.title}</Text>;
  };

  return (
    <LinearGradient
      colors={["#FFFFFF", "#FFFFFF", "#FFFFFF", "#CCDCFD"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ flex: 1 }}
    >
      <SearchBar
        placeholder="Search"
        containerStyle={styles.searchbar}
        inputContainerStyle={{ backgroundColor: "transparent" }}
        onChangeText={(newSearch) => updateSearch(newSearch)}
        value={search}
      />
      {search === "" ? (
        <>
          <TouchableOpacity
            onPress={() => openModal()}
            style={styles.addbutton}
          >
            <Ionicons
              style={styles.icon}
              name="ios-add-circle-outline"
              size={30}
            />
            <Text style={styles.buttontext}>Add Category</Text>
          </TouchableOpacity>

          <View>
            <Card containerStyle={styles.container}>
              <Text style={styles.header}>Currently Started:</Text>
              {state.currentlystarted.length !== 0 ? (
                <FlatList
                  data={state.currentlystarted}
                  renderItem={({ item }) => renderWatch(item)}
                  keyExtractor={(item) => item.itemid}
                />
              ) : (
                <Text>Nothing started yet!</Text>
              )}
            </Card>
          </View>

          <Grid
            renderItem={renderItem}
            data={state.categories}
            numColumns={2}
          />
        </>
      ) : (
        <SearchScreen search={search} navigation={navigation} />
      )}

      <AddDialog
        isModalVisible={isModalVisible}
        closeModal={() => closeModal()}
        onSubmit={(title, category) => {
          addCategory(title, category, closeModal);
        }}
      />
    </LinearGradient>
  );
};

MainScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
        <AntDesign name="user" size={30} style={styles.userIcon} />
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  icon: {
    color: "white",
    marginRight: 10,
  },
  buttontext: {
    color: "white",
  },
  addbutton: {
    borderRadius: 5,
    margin: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: "#7E82C4",
    flexDirection: "row",
    alignSelf: "flex-end",
    alignItems: "center",
  },
  searchbar: {
    backgroundColor: "transparent",
    borderBottomColor: "transparent",
    borderTopColor: "transparent",
  },
  userIcon: {
    marginRight: 10,
  },
  modal: {
    maxHeight: Dimensions.get("window").height / 2,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 30,
    paddingBottom: 30,
  },
  finishbutton: {
    backgroundColor: "#7E82C4",
    borderRadius: 5,
    alignItems: "center",
    paddingTop: 5,
    paddingBottom: 5,
  },
  container: {
    borderRadius: 10,
    backgroundColor: "#CCDCFD",
  },
  header: {
    fontWeight: "bold",
    fontSize: 18,
    paddingBottom: 10,
  },
  item: {
    paddingVertical: 5,
  },
});

export default MainScreen;
