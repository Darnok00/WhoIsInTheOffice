import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Image,
  View,
  Text,
  Dimensions,
  Pressable,
  ImageBackground,
  RefreshControl,
  ScrollView,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  descriptionNegative,
  descriptionPositive,
  dictCharactersImages,
  optionsCharacters,
  defaultCharacter,
  errorDescription,
} from "../constants/MainPageConstants";

const windowWidth = Dimensions.get("window").width;

export default function MainPage() {
  const [status, setStatus] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(defaultCharacter);
  const [refreshing, setRefreshing] = useState(false);
  const [mainImg, setMainImg] = useState(
    dictCharactersImages[defaultCharacter]
  );
  const [descriptionText, setDescrpitionText] = useState(descriptionNegative);

  const mainImageStyle = status === true ? styles.imageGreen : styles.imageRed;

  const fetchStatus = async () => {
    try {
      setRefreshing(true);
      const response = await fetch("https://testitp.best.krakow.pl/status", {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        setStatus(data);
        setDescrpitionText(
          status === true ? descriptionPositive : descriptionNegative
        );
      } else {
        setMainImg(dictCharactersImages["error"]);
        setDescrpitionText(errorDescription);
        console.error("Status response not OK:", response.status);
      }
    } catch (error) {
      console.error("Error fetching status:", error.message);
    } finally {
      setRefreshing(false);
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
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={fetchStatus} />
      }
    >
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
          </View>
          <View style={[styles.container, styles.containerImage]}>
            <Image source={mainImg} style={[styles.image, mainImageStyle]} />
            <Image
              source={mainImg}
              style={[styles.image, styles.imageSecond]}
            />
            <Text style={styles.text}>{descriptionText.toString()}</Text>
          </View>
        </ImageBackground>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  containerPicker: {
    backgroundColor: "#D76A03",
    width: windowWidth,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: "10%",
    paddingRight: "10%",
  },
  containerImage: {
    flex: 7,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageRed: {
    tintColor: "#BF3100",
    position: "absolute",
  },
  imageGreen: {
    tintColor: "#8EA604",
    position: "absolute",
  },
  imageSecond: {
    position: "absolute",
    opacity: 0.5,
  },
  text: {
    fontSize: 30,
    position: "absolute",
    top: "70%",
    textAlignVertical: "center",
    color: "white",
    backgroundColor: "#EC9F05",
    width: "100%",
    height: "12%",
    borderWidth: 1,
    textAlign: "center",
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
    backgroundColor: "#F5BB00",
    color: "white",
    paddingBottom: 10,
    paddingTop: 10,
    width: windowWidth * 0.8,
    top: "20%",
  },
});
