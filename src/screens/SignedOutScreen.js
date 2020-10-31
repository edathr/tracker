import React, { useState, useEffect } from "react";

// Components
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from "react-native";
import { Card } from "react-native-elements";

// Firebase
import * as firebase from "firebase";

// Gradient
import { LinearGradient } from "expo-linear-gradient";

const SignedOutScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("Main");
      }
    });
  }, []);

  const logIn = () => {
    console.log("Log In");
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        navigation.navigate("Main");
      })
      .catch((err) => {
        setErrorMessage(Object.values(err)[1]);
        setError(true);
      });
  };

  const signUp = () => {
    console.log("Sign Up");
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        navigation.navigate("Main");
      })
      .catch((err) => {
        setErrorMessage(Object.values(err)[1]);
        setError(true);
      });
  };

  return (
    <LinearGradient
      colors={["#FFFFFF", "#FFFFFF", "#FFFFFF", "#CCDCFD"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ flex: 1 }}
    >
      <View style={styles.signedoutview}>
        <Card containerStyle={styles.signedoutcard}>
          <View style={styles.forminput}>
            <Text style={styles.formlabel}>Email:</Text>
            <TextInput
              autoCapitalize="none"
              placeholder="Enter email"
              onChangeText={(text) => {
                setEmail(text);
              }}
              value={email}
            />
          </View>

          <View style={styles.forminput}>
            <Text style={styles.formlabel}>Password:</Text>
            <TextInput
              autoCapitalize="none"
              secureTextEntry={true}
              placeholder="Enter password"
              onChangeText={(text) => {
                setPassword(text);
              }}
              value={password}
            />
          </View>

          {error ? (
            <Text style={{ color: "red", paddingVertical: 10 }}>
              {errorMessage}
            </Text>
          ) : null}

          {isSigningUp ? (
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                signUp();
              }}
            >
              <Text style={{ color: "white", fontSize: 16 }}>SIGN UP</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                logIn();
              }}
            >
              <Text style={{ color: "white", fontSize: 16 }}>LOG IN</Text>
            </TouchableOpacity>
          )}

          {isSigningUp ? (
            <TouchableOpacity
              style={{ alignSelf: "center" }}
              onPress={() => setIsSigningUp(false)}
            >
              <Text>Log In</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{ alignSelf: "center" }}
              onPress={() => setIsSigningUp(true)}
            >
              <Text>Sign Up</Text>
            </TouchableOpacity>
          )}
        </Card>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  signedoutview: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  signedoutcard: {
    width: Dimensions.get("window").width - 40,
  },
  formlabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  forminput: {
    paddingBottom: 20,
  },
  button: {
    backgroundColor: "#7E82C4",
    borderRadius: 5,
    alignItems: "center",
    paddingTop: 5,
    paddingBottom: 5,
    marginBottom: 10,
  },
});

export default SignedOutScreen;
