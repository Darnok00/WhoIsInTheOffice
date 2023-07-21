import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from 'react-native';
import MainPage from "./src/components/MainPage";

export default function App() {

  const [status, setStatus] = useState(true);

  const fetchStatus = async () => {
    const response = await fetch("https://testitp.best.krakow.pl/status", {
      method: "GET",
    });
    const data = await response.json();
    console.log(data);
    setStatus(data);
    console.log(status);
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  return (
    <View style={styles.container}>
        <MainPage/>
    </View>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
