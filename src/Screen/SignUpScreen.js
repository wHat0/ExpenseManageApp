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
import { SignUpUser } from "../../util/user";
import Button from "../components/Button";
import Input from "../components/Input";
import LoadingOverlay from "../components/LoadingOverlay";
import { AuthContext } from "../store/AuthContext";
const windowHeight = Dimensions.get("screen").height;

function SignUpScreen({ navigation }) {
  const [inputs, setInputData] = useState({
    Name: "",
    email: "",
    password: "",
    phone: "",
    Address: "",
    ConfirmPassword: "",
  });
  const [Pvisible, setPvisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [Loading, setLoading] = useState(false);

  const ContxAuth = useContext(AuthContext);

  async function SignUp() {
    console.log("CALLED SIgnup");
    setLoading(true);
    try {
      const token = await SignUpUser({
        email: inputs.email,
        password: inputs.password,
      });
      ContxAuth.authenticate(token);
    } catch {
      setLoading(false);
      return Alert.alert("ALERT", "User Already Registered");
    }
    setLoading(false);
    Alert.alert("SignUp Successfully");
  }
  function ChangeValue(value, input) {
    setInputData((curInput) => {
      return { ...curInput, [input]: value };
    });
  }

  //   useEffect(() => {
  //     console.log("singnup");
  //     SignUp();
  //   }, []);

  const validate = () => {
    console.log("VALidation");
    Keyboard.dismiss();
    let isValid = true;
    setErrors({});

    if (!inputs.email) {
      handleError("Please input email", "email");
      isValid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError("Please input a valid email", "email");
      isValid = false;
    }

    if (!inputs.Name) {
      handleError("Please input fullname", "Name");
      isValid = false;
    }

    if (!inputs.phone) {
      handleError("Please input phone number", "phone");
      isValid = false;
    }

    if (!inputs.password) {
      handleError("Please input password", "password");
      isValid = false;
    } else if (inputs.password.length < 6) {
      handleError("Min password length of 5", "password");
      isValid = false;
    }
    if (!inputs.ConfirmPassword) {
      handleError("Please Confirm your password", "ConfirmPassword");
      isValid = false;
    } else if (inputs.password !== inputs.ConfirmPassword) {
      handleError("Both Passwords Should be same", "ConfirmPassword");
      isValid = false;
    }

    if (isValid) {
      //   console.log(JSON.stringify(inputs));
      SignUp();
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
          justifyContent: "flex-end",
        }}
      >
        <View>
          <ScrollView
            style={{
              backgroundColor: "skyblue",
              borderRadius: 15,
              paddingBottom: 25,
              marginTop: windowHeight / 6,
            }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 60,
              }}
            >
              SignUpScreen
            </Text>
            <View style={{ marginHorizontal: 40 }}>
              <Input
                label={"UserName"}
                icon={"person-outline"}
                TextValues={(value) => ChangeValue(value, "Name")}
                error={errors.Name}
              />
              <Input
                label={"Email"}
                icon={"mail-outline"}
                TextValues={(value) => ChangeValue(value, "email")}
                error={errors.email}
              />
              <Input
                label={"Phone"}
                type={"number-pad"}
                icon={"call-outline"}
                error={errors.phone}
                TextValues={(value) => ChangeValue(value, "phone")}
              />
              <Input
                label={"Address"}
                icon={"home-outline"}
                TextValues={(value) => ChangeValue(value, "Address")}
                error={errors.Address}
              />
              <Input
                label={"Password"}
                icon={Pvisible ? "lock-open-outline" : "lock-closed-outline"}
                TextValues={(value) => ChangeValue(value, "password")}
                secure={Pvisible ? false : true}
                Endicon={Pvisible ? "eye-off-outline" : "eye-outline"}
                EndPress={() =>
                  Pvisible ? setPvisible(false) : setPvisible(true)
                }
                error={errors.password}
              />
              <Input
                label={"Confirm Password"}
                icon={Pvisible ? "lock-open-outline" : "lock-closed-outline"}
                TextValues={(value) => ChangeValue(value, "ConfirmPassword")}
                secure={Pvisible ? false : true}
                Endicon={Pvisible ? "eye-off-outline" : "eye-outline"}
                EndPress={() =>
                  Pvisible ? setPvisible(false) : setPvisible(true)
                }
                error={errors.ConfirmPassword}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  paddingHorizontal: 10,
                  marginTop: 5,
                }}
              >
                <Button color={"purple"} tittle={"signUp"} onPress={validate} />
                <Button
                  color={"purple"}
                  tittle={"Cancel"}
                  onPress={() => navigation.navigate("Login")}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
}

export default SignUpScreen;

const styles = StyleSheet.create({});
