import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import firebase from "firebase";
import "firebase/firestore";

export default class Third extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid2: this.props.route.params.uid,
      gender: "",
      height: null,
      weight: null,
      age: null,
    };
    this.handleChange_gender = this.handleChange_gender.bind(this);
    this.handleChange_height = this.handleChange_height.bind(this);
    this.handleChange_weight = this.handleChange_weight.bind(this);
    this.handleChange_age = this.handleChange_age.bind(this);
  }
  handleChange_gender(newText) {
    this.setState({
      gender: newText,
    });
  }
  handleChange_height(newText) {
    this.setState({
      height: newText,
    });
  }
  handleChange_weight(newText) {
    this.setState({
      weight: newText,
    });
  }
  handleChange_age(newText) {
    this.setState({
      age: newText,
    });
  }

  OnInsertPress() {
    const data = firebase.firestore();
    data
      .collection("users")
      .doc(this.state.uid2)
      .update({
        gender: this.state.gender,
        height: this.state.height,
        weight: this.state.weight,
        age: this.state.age,
      })
      .then(() => {
        this.props.navigation.navigate("Fourth", { uid: this.state.uid2 });
      })
      .catch((error) => {
        console.log(error);
      });
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
          <Text style={styles.question2}>
            신장과 체중, 성별과 나이를 입력해주세요.{"\n"}
          </Text>
        </View>
        <View style={styles.middle_layer_1}>
          <View style={styles.inputinfo}>
            <Text style={styles.question}>성별 : </Text>
            <TextInput
              style={styles.inputbox}
              placeholder="여자/남자"
              onChangeText={this.handleChange_gender}
            ></TextInput>
          </View>
          <View style={styles.inputinfo}>
            <Text style={styles.question}>신장 : </Text>
            <TextInput
              style={styles.inputbox}
              placeholder="ex)165"
              onChangeText={this.handleChange_height}
            ></TextInput>
          </View>
          <View style={styles.inputinfo}>
            <Text style={styles.question}>체중 : </Text>
            <TextInput
              style={styles.inputbox}
              placeholder="ex)50"
              onChangeText={this.handleChange_weight}
            ></TextInput>
          </View>
          <View style={styles.inputinfo}>
            <Text style={styles.question}>나이 : </Text>
            <TextInput
              style={styles.inputbox}
              placeholder="ex)24"
              onChangeText={this.handleChange_age}
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
              <Text style={styles.signin}>다음</Text>
            </View>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
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
    marginBottom: RFValue(30, 812),
  },
  answer: {
    textAlign: "center",
    fontSize: RFValue(20, 812),
  },
  inputinfo: {
    marginBottom: RFValue(20, 812),
    marginTop: RFValue(10, 812),
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
    width: RFValue(150, 812),
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
    width: 200,
    height: 50,
    alignSelf: "center",
    marginTop: 80,
    marginHorizontal: 40,
    marginBottom: 30,
    borderRadius: 25,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },
});
