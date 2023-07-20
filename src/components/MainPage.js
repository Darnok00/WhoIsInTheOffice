import React, { useEffect, useState } from "react";
import { StyleSheet, Image, View, Text, Dimensions } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import {
  descriptionNegative,
  descriptionPlaceholder,
  descriptionPositive,
  dictCharactersImages,
  optionsCharacters,
} from "../constants/MainPageConstants";

const windowWidth = Dimensions.get("window").width;

export default function MainPage() {
  const [status, setStatus] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState("lewandowski");
  const [mainImg, setMainImg] = useState("../assets/images/lewandowski.jpg")

  const fetchStatus = async () => {
    const response = await fetch("https://testitp.best.krakow.pl/status", {
      method: "GET",
    });
    const data = await response.json();
    setStatus(data);
    console.log(status);
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  useEffect(() => {
    setMainImg(dictCharactersImages[selectedPerson]);
    console.log(mainImg);
  }, [selectedPerson]);



  return (
    <View style={styles.container}>
      <View style={styles.containerPicker}>
        <RNPickerSelect
          selectedValue={selectedPerson}
          style={pickerSelectStyles}
          useNativeAndroidPickerStyle={false}
          onValueChange={(itemValue, itemIndex) => setSelectedPerson(itemValue)}
          placeholder={{ label: descriptionPlaceholder, value: null }}
          items={optionsCharacters}
        />
      </View>
      <View style={styles.containerImage}>
        {status === true ? (
          <React.Fragment>
            <Image
              source={mainImg}
              style={[styles.image, styles.imageGreen]}
              itemStyle={{}}
            />
            <Image
              source={mainImg}
              style={[styles.image, styles.imageSecond]}
            />
            <Text style={styles.text}>{descriptionPositive.toString()}</Text>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Image
              source={mainImg}
              style={[styles.image, styles.imageRed]}
            />
            <Image
              source={mainImg}
              style={[styles.image, styles.imageSecond]}
            />
            <Text style={styles.text}>{descriptionNegative.toString()}</Text>
          </React.Fragment>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  containerPicker: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#002B5B",
    width: windowWidth,
  },
  containerImage: {
    flex: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageRed: {
    tintColor: "red",
    position: "absolute",
  },
  imageGreen: {
    tintColor: "green",
    position: "absolute",
  },
  imageSecond: {
    position: "absolute",
    opacity: 0.6,
  },
  text: {
    fontSize: 30,
    position: "absolute",
    top: "70%",
    textAlignVertical: "center",
    color: "white",
    backgroundColor: "#78C1F3",
    width: "80%",
    height: "12%",
    borderWidth: 1,
    textAlign: "center",
    borderRadius: 80,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
    fontSize: 30,
    textAlign: "center",
    borderWidth: 1,
    borderRadius: 80,
    borderColor: "white",
    backgroundColor: "#78C1F3",
    color: "white",
    paddingLeft: 80,
    paddingRight: 80,
    paddingBottom: 10,
    paddingTop: 10,
  },
});
