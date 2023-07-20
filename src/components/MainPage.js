import React, { useEffect, useState } from "react";
import { StyleSheet, Image, View, Text, Dimensions } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import {
  descriptionNegative,
  descriptionPlaceholder,
  descriptionPositive,
  dictCharactersImages,
  optionsCharacters,
  defaultCharacter
} from "../constants/MainPageConstants";

const windowWidth = Dimensions.get("window").width;

export default function MainPage() {
  const [status, setStatus] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(defaultCharacter);
  const [mainImg, setMainImg] = useState(dictCharactersImages[defaultCharacter]);

  const mainImageStyle = status === true ? styles.imageGreen : styles.imageRed;
  const descriptionText =
    status === true ? descriptionPositive : descriptionNegative;

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
    setMainImg(Number(dictCharactersImages[selectedPerson]));
  }, [selectedPerson]);

  return (
    <View style={styles.container}>
      <View style={styles.containerPicker}>
        <RNPickerSelect
          selectedValue={selectedPerson}
          style={pickerSelectStyles}
          useNativeAndroidPickerStyle={false}
          onValueChange={(itemValue, itemIndex) => setSelectedPerson(itemValue)}
          placeholder={{ label: descriptionPlaceholder, value: defaultCharacter}}
          items={optionsCharacters}
        />
      </View>
      <View style={styles.containerImage}>
        <Image source={mainImg} style={[styles.image, mainImageStyle]} />
        <Image source={mainImg} style={[styles.image, styles.imageSecond]} />
        <Text style={styles.text}>{descriptionText.toString()}</Text>
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
