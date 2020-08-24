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
} from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { LinearGradient } from "expo-linear-gradient";
import { CheckBox } from "react-native-elements";
import firebase from "firebase";
import "firebase/firestore";

export default class Intro extends Component {
  state = {
    checked: false,
    agree: true,
    disagree: false,
    uid2: this.props.route.params.uid,
  };

  OnInsertPress() {
    const data = firebase.firestore();
    const increment_opt1 = firebase.firestore.FieldValue.increment(1);

    if (this.state.agree) {
      data
        .collection("users")
        .doc(this.state.uid2)
        .update({
          question2_agree: this.state.agree,
        })
        .then(() => {
          this.props.navigation.navigate("Third", { uid: this.state.uid2 });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      data
        .collection("users")
        .doc("mvp")
        .update({
          question2_dis: !this.state.agree,
        })
        .then(() => {
          this.props.navigation.navigate("Third", { uid: this.state.uid2 });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  render() {
    return (
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        colors={["#87c0cd", "#f3f9fb"]}
        style={styles.container}
      >
        <View style={styles.top_layer_1}>
          <Text style={styles.question}>
            당신과 비슷한 체형이였던 사람이 {"\n"}어떻게 러닝으로 체중 감량을
            하였는지 {"\n"}루틴이 궁금하신가요?
          </Text>
        </View>
        <View style={styles.middle_layer_1}>
          <CheckBox
            title="예"
            checkedColor="#226597"
            checked={this.state.agree}
            onPress={() => this.setState({ agree: !this.state.agree })}
          />
          <CheckBox
            title="아니요"
            checkedColor="#226597"
            checked={!this.state.agree}
            onPress={() => this.setState({ agree: !this.state.agree })}
          />
        </View>
        <View style={styles.bottom_layer_1}>
          <TouchableOpacity
            onPress={() => {
              this.OnInsertPress();
            }}
          >
            <View style={styles.signin_button}>
              <Text style={styles.signin}>다음</Text>
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

  question: {
    textAlign: "center",
    fontSize: RFValue(25, 812),
    fontWeight: "bold",
    lineHeight: 35,
  },
  answer: {
    textAlign: "center",
    fontSize: RFValue(20, 812),
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
    width: 200,
    height: 50,
    alignSelf: "center",
    marginTop: 15,
    marginHorizontal: 40,
    marginBottom: 30,
    borderRadius: 25,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },
});
