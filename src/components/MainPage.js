import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Image,
  View,
  Text,
  Dimensions,
  Pressable,
  ImageBackground,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  descriptionNegative,
  descriptionPositive,
  dictCharactersImages,
  optionsCharacters,
  defaultCharacter,
} from "../constants/MainPageConstants";

const windowWidth = Dimensions.get("window").width;

export default function MainPage() {
  const [status, setStatus] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(defaultCharacter);
  const [mainImg, setMainImg] = useState(
    dictCharactersImages[defaultCharacter]
  );

  const mainImageStyle = status === true ? styles.imageGreen : styles.imageRed;
  const descriptionText =
    status === true ? descriptionPositive : descriptionNegative;

  const fetchStatus = async () => {
    try {
      const response = await fetch("https://testitp.best.krakow.pl/status", {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        setStatus(true);
      } else {
        console.error("Status response not OK:", response.status);
      }
    } catch (error) {
      console.error("Error fetching status:", error.message);
    }
  };

  const storeSelectedPerson = async (person) => {
    await AsyncStorage.setItem("@selectedPerson", person);
  };

  const retrieveSelectedPerson = async () => {
    const storedPerson = await AsyncStorage.getItem("@selectedPerson");
    if (storedPerson !== null) {
      setSelectedPerson(storedPerson);
    }
  };

  useEffect(() => {
    fetchStatus();
    retrieveSelectedPerson();
  }, []);

  useEffect(() => {
    setMainImg(Number(dictCharactersImages[selectedPerson]));
    storeSelectedPerson(selectedPerson);
  }, [selectedPerson]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/icons/splash.png")}
        resizeMode="cover"
      >
        <View style={[styles.container, styles.containerPicker]}>
          <RNPickerSelect
            selectedValue={selectedPerson}
            value={selectedPerson}
            style={pickerSelectStyles}
            useNativeAndroidPickerStyle={false}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedPerson(itemValue)
            }
            placeholder={{}}
            items={optionsCharacters}
          />
          <Pressable onPress={fetchStatus} style={styles.presser}>
            <Image
              style={styles.refreshButton}
              source={require("../assets/images/img.webp")}
            />
          </Pressable>
        </View>
        <View style={[styles.container, styles.containerImage]}>
          <Image source={mainImg} style={[styles.image, mainImageStyle]} />
          <Image source={mainImg} style={[styles.image, styles.imageSecond]} />
          <Text style={styles.text}>{descriptionText.toString()}</Text>
        </View>
      </ImageBackground>
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
    backgroundColor: "transparent",
    width: windowWidth,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: "5%",
    paddingRight: "15%",
  },
  containerImage: {
    flex: 5,
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
  refreshButton: {
    width: "100%",
    height: "100%",
  },
  presser: {
    width: "19.8%",
    height: "55%",
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
    paddingLeft: 50,
    paddingRight: 50,
    paddingBottom: 10,
    paddingTop: 10,
  },
});
