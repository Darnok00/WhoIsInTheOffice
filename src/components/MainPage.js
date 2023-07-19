import React, { useEffect, useState } from "react";
import { StyleSheet, Image, View, Text } from "react-native";

export default function MainPage() {
  const description_negative = "Biuro puste :(";
  const description_positive = "Biuro otwarte :D";

  const [status, setStatus] = useState(false);

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

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        {status === true ? (
          <React.Fragment>
            <Image
              source={require("../assets/images/lewandowski.jpeg")}
              style={[styles.image, styles.image_green]}
            />
            <Image
              source={require("../assets/images/lewandowski.jpeg")}
              style={[styles.image, styles.image_second]}
            />
            <Text style={styles.text}>{description_positive.toString()}</Text>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Image
              source={require("../assets/images/lewandowski.jpeg")}
              style={[styles.image, styles.image_red]}
            />
            <Image
              source={require("../assets/images/lewandowski.jpeg")}
              style={[styles.image, styles.image_second]}
            />
            <Text style={styles.text}>{description_negative.toString()}</Text>
          </React.Fragment>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  image_red: {
    tintColor: "red",
    position: "absolute",
  },
  image_green: {
    tintColor: "green",
    position: "absolute",
  },
  image_second: {
    position: "absolute",
    opacity: 0.6,
  },
  text: {
    fontSize: 40,
    fontWeight: "bold",
    position: "absolute",
    top: "80%",
    color: "white",
    backgroundColor: "black",
    width: "100%",
    textAlign: "center",
  },
});
