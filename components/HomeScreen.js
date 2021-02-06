import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { WEATHER_API_KEY } from "react-native-dotenv";
import { colors } from "../utils/index";

import * as Location from "expo-location";

import axios from "axios";

import Today from "./Today";
import OtherDay from "./OtherDay";

import moment from "moment";
import "moment/locale/fr";

// let latitude = 50.446;
// let longitude = 2.901;

// https://api.openweathermap.org/data/2.5/onecall?lat=50.446&lon=2.901&appid=27d368348c8c19ef439a7407b82d0808&units=metric&lang=fr&exclude=minutely,hourly,alerts

const BASE_WEATHER_URL = "https://api.openweathermap.org/data/2.5/onecall?";

export default function HomeScreen({ navigation, route }) {
  const [data, setData] = useState({});

  useEffect(() => {
    let city = !route.params?.post ? "Harnes" : route.params?.post;

    let URL1 = `https://nominatim.openstreetmap.org/search?city=${city}&format=json&limit=1`;
  
    axios
    .get(URL1)
    .then((res) => res.data)
    .then((data) => {
      const latitude = data[0].lat;
      const longitude = data[0].lon;

      let URL2 = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric&lang=fr&exclude=minutely,hourly,alerts`;
    
      axios.get(URL2).then((res) => {
        setData(res.data);
      })
    })
    .catch((err) => {
      if (err)
        console.error("Ne parviens pas à récupérer les données météo à partir de l'API, ", err);
    });
  }, [route.params?.post]);

  if (Object.keys(data).length !== 0) {
    // Météo d"Aujourd"hui
    const temperature = data.current?.temp;
    const temperatureMin = data.daily[0]?.temp.min;
    const condition = data.current?.weather[0].description;
    const weatherIcon = data.current?.weather[0].icon;
    const iconDay = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
    const dayName = moment(data.current?.dt * 1000).format("dddd Do MMM YYYY");

    // Météo des jours prochains
    const daysJSX = data.daily.map((day, index) => {
      const otherDayName = moment(day.dt * 1000).format("dddd Do MMM YYYY");
      const iconDays = `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;
      const temperatures = day.temp.day;
      const tempMins = day.temp.min;
      const conditions = day.weather[0].description;

      // éviter de répéter le jour d'aujourd"hui dans les autres jours
      let checkIndexIsNotZero = (n) => n !== 0;

      return (
        <View
          key={index}
          style={[
            styles.option,
            { display: checkIndexIsNotZero(index) ? "flex" : "none" },
          ]}
        >
          <OtherDay
            iconDay={{ uri: iconDays }}
            date={otherDayName}
            temperature={Math.round(temperatures)}
            condition={conditions}
            temperatureMin={Math.round(tempMins)}
          />
        </View>
      );
    });

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Today
            date={dayName}
            temperature={Math.round(temperature)}
            temperatureMin={Math.round(temperatureMin)}
            condition={condition}
            iconDay={{ uri: iconDay }}
          />
          <View style={styles.middle}>
            <Text style={styles.city}>{!route.params?.post ? "Harnes" : route.params?.post}</Text>
            <Button
              title="Changer la ville"
              onPress={() => navigation.navigate("CreatePost")}
            />
          </View>
          <View>{daysJSX}</View>
          <StatusBar style="auto" />
        </ScrollView>
      </SafeAreaView>
    );
  } else {
    // Sinon j"affiche un loading
    return <Text style={styles.loading}>Chargement de la météo...</Text>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "stretch",
  },
  city: {
    fontSize: 40,
    color: "white",
    textTransform: "capitalize",
    paddingBottom: 15,
  },
  middle: {
    backgroundColor: "#1E4BD2",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
    marginTop: -50,
    paddingBottom: 25,
  },
  loading: {
    flex: 1,
    textAlign: "center",
    alignItems: "center",
  },
  option: {
    display: "flex",
  },
  welcome: {
    fontSize: 20,
    borderWidth: 1,
    borderRadius: 10,
    height: 40,
    width: 230,
    paddingLeft: 10,
    backgroundColor: "#fff",
    marginBottom: 15,
    textTransform: "capitalize",
  },
});
