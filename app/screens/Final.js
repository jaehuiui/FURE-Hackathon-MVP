import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  SafeAreaView,
  TextInput,
  Alert,
} from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { LinearGradient } from "expo-linear-gradient";
import { CheckBox } from "react-native-elements";
import firebase from "firebase";
import "firebase/firestore";

export default class Intro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid2: this.props.route.params.uid,
      email: "",
    };
    this.handleChange_email = this.handleChange_email.bind(this);
  }

  async componentDidMount() {
    this.focusListener = this.props.navigation.addListener(
      "focus",
      async () => {
        const data = firebase.firestore();
        const increment_opt1 = firebase.firestore.FieldValue.increment(1);
        data
          .collection("users")
          .doc("mvp")
          .update({ until_final: increment_opt1 });
      }
    );
  }

  OnInsertPress() {
    const data = firebase.firestore();
    data.collection("users").doc(this.state.uid2).update({
      email: this.state.email,
    });
    Alert.alert(
      "제출되었습니다!",
      "감사합니다.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ],
      { cancelable: false }
    );
  }
  handleChange_email(newText) {
    this.setState({
      email: newText,
    });
  }

  render() {
    return (
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0.2 }}
        colors={["#87c0cd", "#f3f9fb"]}
        style={styles.container}
      >
        <View style={styles.top_layer_1}>
          <Text style={styles.question2}>
            확인하기가 안 눌려서 당황스러웠죠? {"\n"}
            이런 서비스를 만들 수 있도록 노력 중입니다.{"\n"}
            이메일을 입력해주시면{"\n"} 저희 서비스에 대한 소식을 전해드릴게요!
          </Text>
        </View>
        <View style={styles.middle_layer_1}>
          <View style={styles.inputinfo}>
            <Text style={styles.question}>이메일 : </Text>
            <TextInput
              style={styles.inputbox}
              placeholder=""
              onChangeText={this.handleChange_email}
            ></TextInput>
          </View>
        </View>
        <View style={styles.bottom_layer_1}>
          <TouchableOpacity
            onPress={() => {
              this.OnInsertPress();
            }}
          >
            <View style={styles.signin_button}>
              <Text style={styles.signin}>제출</Text>
            </View>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  //Page 1
  container: {
    flex: 1,
    justifyContent: "center",
  },
  top_layer_1: {
    flex: 4,
    justifyContent: "center",
  },
  middle_layer_1: {
    flex: 2,
    justifyContent: "center",
  },
  bottom_layer_1: {
    flex: 3,
    justifyContent: "center",
    marginBottom: RFValue(50, 812),
  },

  question2: {
    textAlign: "center",
    fontSize: RFValue(25, 812),
    fontWeight: "bold",
    lineHeight: 35,
  },
  answer: {
    textAlign: "center",
    fontSize: RFValue(20, 812),
  },
  inputinfo: {
    marginVertical: RFValue(20, 812),
    flexDirection: "row",
    justifyContent: "center",
  },
  question: {
    textAlignVertical: "center",
    textAlign: "center",
    fontSize: RFValue(20, 812),
    fontWeight: "bold",
  },

  inputbox: {
    borderColor: "gray",
    borderBottomWidth: 1,
    width: RFValue(200, 812),
    marginHorizontal: RFValue(20, 812),
    fontSize: RFValue(20, 812),
    textAlign: "center",
  },

  //Inner Layer 1
  logo: {
    alignSelf: "center",
    height: 200,
    width: 300,
    resizeMode: "center",
    aspectRatio: 1,
  },
  explanation: {
    fontSize: RFValue(22, 812),
    textAlign: "center",
    color: "gray",
  },
  skip: {
    fontSize: RFValue(15, 812),
    color: "gray",
    marginRight: RFValue(30, 812),
  },

  signin: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
  },

  signin_button: {
    borderWidth: 0.5,
    borderColor: "gray",
    backgroundColor: "#113f67",
    width: 250,
    height: 60,
    alignSelf: "center",
    marginTop: 40,
    marginHorizontal: 40,
    marginBottom: 30,
    borderRadius: 25,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },
});
