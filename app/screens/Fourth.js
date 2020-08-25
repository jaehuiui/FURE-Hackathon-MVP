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
    agree: false,
    disagree: false,
    uid2: this.props.route.params.uid,
    height: "",
    weight: "",
    count1: 0,
    count2: 0,
    count3: 0,
    count: 0,
    height1: "",
    height2: "",
    weight1: "",
    weight2: "",
  };

  async componentDidMount() {
    this.focusListener = this.props.navigation.addListener(
      "focus",
      async () => {
        const data = firebase.firestore();
        const increment_opt1 = firebase.firestore.FieldValue.increment(1);
        data
          .collection("users")
          .doc(this.state.uid2)
          .onSnapshot((doc) => {
            var weight_r = doc.data().weight;
            var height_r = doc.data().height;
            this.setState({
              height: height_r,
              weight: weight_r,
              height1: parseInt(height_r) + 1,
              height2: parseInt(height_r) + 3,
              weight1: parseInt(weight_r) - 2,
              weight2: parseInt(weight_r) + 3,
            });
          });
        data
          .collection("users")
          .doc("mvp")
          .update({ until_fourth: increment_opt1 });
      }
    );
  }

  OnPressResult1() {
    const data = firebase.firestore();
    this.setState({
      count1: this.state.count1 + 1,
      count: this.state.count + 1,
    });
    data.collection("users").doc(this.state.uid2).update({
      option1_click: this.state.count1,
    });
    const increment_opt1 = firebase.firestore.FieldValue.increment(
      this.state.count1
    );
    const increment_opt2 = firebase.firestore.FieldValue.increment(
      this.state.count
    );
    data
      .collection("users")
      .doc("mvp")
      .update({ total_option1: increment_opt1 });
    if (this.state.count > 4) {
      data
        .collection("users")
        .doc("mvp")
        .update({ total_count: increment_opt2 });
      this.props.navigation.navigate("Final", { uid: this.state.uid2 });
    }
  }
  OnPressResult2() {
    const data = firebase.firestore();
    this.setState({
      count2: this.state.count2 + 1,
      count: this.state.count + 1,
    });
    data.collection("users").doc(this.state.uid2).update({
      option2_click: this.state.count2,
    });
    const increment_opt1 = firebase.firestore.FieldValue.increment(
      this.state.count2
    );
    const increment_opt2 = firebase.firestore.FieldValue.increment(
      this.state.count
    );
    data
      .collection("users")
      .doc("mvp")
      .update({ total_option2: increment_opt1 });
    if (this.state.count > 4) {
      data
        .collection("users")
        .doc("mvp")
        .update({ total_count: increment_opt2 });
      this.props.navigation.navigate("Final", { uid: this.state.uid2 });
    }
  }
  OnPressResult3() {
    const data = firebase.firestore();
    this.setState({
      count3: this.state.count3 + 1,
      count: this.state.count + 1,
    });
    data.collection("users").doc(this.state.uid2).update({
      option3_click: this.state.count3,
    });
    const increment_opt1 = firebase.firestore.FieldValue.increment(
      this.state.count3
    );
    const increment_opt2 = firebase.firestore.FieldValue.increment(
      this.state.count
    );
    data
      .collection("users")
      .doc("mvp")
      .update({ total_option3: increment_opt1 });
    if (this.state.count > 4) {
      data
        .collection("users")
        .doc("mvp")
        .update({ total_count: increment_opt2 });
      this.props.navigation.navigate("Final", { uid: this.state.uid2 });
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
            당신과 비슷했던 사람들 중 {"\n"}3명이 체중감량에 성공했어요!
          </Text>
        </View>
        <View style={styles.middle_layer_1}>
          <View style={styles.resultbox}>
            <Text style={styles.result}>
              {this.state.height}cm, {this.state.weight2}kg{"\n"} 엘사 님의
              2.8kg 감량 루틴
            </Text>
            <TouchableOpacity
              onPress={() => {
                this.OnPressResult1();
              }}
            >
              <View style={styles.signin_button}>
                <Text style={styles.signin}>확인하기</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.resultbox}>
            <Text style={styles.result}>
              {this.state.height2}cm, {this.state.weight}kg{"\n"} 안나 님의
              4.7kg 감량 루틴
            </Text>
            <TouchableOpacity
              onPress={() => {
                this.OnPressResult2();
              }}
            >
              <View style={styles.signin_button}>
                <Text style={styles.signin}>확인하기</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.resultbox}>
            <Text style={styles.result}>
              {this.state.height1}cm, {this.state.weight1}kg{"\n"} 올라프 님의
              5.9kg 감량 루틴
            </Text>
            <TouchableOpacity
              onPress={() => {
                this.OnPressResult3();
              }}
            >
              <View style={styles.signin_button}>
                <Text style={styles.signin}>확인하기</Text>
              </View>
            </TouchableOpacity>
          </View>
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
    flex: 5,
    justifyContent: "center",
    marginBottom: RFValue(50, 812),
  },

  question: {
    textAlign: "center",
    fontSize: RFValue(25, 812),
    fontWeight: "bold",
  },
  answer: {
    textAlign: "center",
    fontSize: RFValue(20, 812),
  },
  resultbox: {
    flex: 1,
    textAlign: "center",
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
    borderWidth: 1,
    width: "80%",
    borderColor: "gray",
  },

  result: {
    fontSize: 20,
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
    fontSize: 15,
    color: "white",
    textAlign: "center",
  },

  signin_button: {
    borderWidth: 0.5,
    borderColor: "gray",
    backgroundColor: "#113f67",
    width: 100,
    height: 30,
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
