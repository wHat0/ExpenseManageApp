import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Dimensions,
  Keyboard,
  Alert,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { LoginUser, SignUpUser } from "../../util/user";
import Button from "../components/Button";
import Input from "../components/Input";
import LoadingOverlay from "../components/LoadingOverlay";
import { AuthContext } from "../store/AuthContext";

function LoginScreen({ navigation }) {
  //   useEffect(() => {
  //     console.log("singnup");
  //     LoginUser({ email: "Waleed@gmail.com", password: "Wakeedddd" });
  //   }, []);

  const [Pvisible, setPvisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [Loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const ContxAuth = useContext(AuthContext);

  async function Login() {
    console.log("CALLED Login");
    setLoading(true);

    try {
      const token = await LoginUser({
        email: email,
        password: password,
      });
      ContxAuth.authenticate(token);
    } catch {
      setLoading(false);
      return Alert.alert("ALERT", "Invalid Password or username Used");
    }
    Alert.alert("LOGIN SUCCESS");
    setLoading(false);
  }

  const validate = () => {
    console.log("VALidation");
    console.log(email, password);
    Keyboard.dismiss();
    let isValid = true;
    setErrors({});

    if (!email) {
      handleError("Please input email", "email");
      isValid = false;
    } else if (!email.match(/\S+@\S+\.\S+/)) {
      handleError("Please input a valid email", "email");
      isValid = false;
    }

    if (!password) {
      handleError("Please input password", "password");
      isValid = false;
    } else if (password.length < 6) {
      handleError("Min password length of 5", "password");
      isValid = false;
    }

    if (isValid) {
      Login();
    }
  };

  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };

  if (Loading) {
    return <LoadingOverlay />;
  }

  return (
    <>
      <StatusBar style="light" />
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "purple",
          justifyContent: "center",
        }}
      >
        <View>
          <ScrollView
            style={{
              backgroundColor: "skyblue",
              borderRadius: 15,
              paddingBottom: 25,
            }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 60,
              }}
            >
              LoginScreen
            </Text>
            <View style={{ marginHorizontal: 40 }}>
              <Input
                label={"Email"}
                icon={"mail-outline"}
                TextValues={(value) => setEmail(value)}
                error={errors.email}
              />
              <Input
                label={"Password"}
                icon={Pvisible ? "lock-open-outline" : "lock-closed-outline"}
                TextValues={(value) => setPassword(value)}
                secure={Pvisible ? false : true}
                Endicon={Pvisible ? "eye-off-outline" : "eye-outline"}
                EndPress={() =>
                  Pvisible ? setPvisible(false) : setPvisible(true)
                }
                error={errors.password}
              />
              <Button color={"purple"} tittle={"Login"} onPress={validate} />
              <Text
                onPress={() => navigation.navigate("SignUp")}
                style={{ fontSize: 15, color: "purple", fontWeight: "bold" }}
              >
                Don't Have any Account SignUp now
              </Text>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({});
