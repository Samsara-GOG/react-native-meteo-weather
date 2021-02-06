import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import {
  useResponsiveHeight,
  useResponsiveWidth,
} from "react-native-responsive-dimensions";

export default function Today(props) {
  let height = useResponsiveHeight(25);
  let width = useResponsiveWidth(25);

  return (
    <View style={(height, width, styles.header)}>
      <View style={styles.left}>
        <Text style={(height, width, styles.date)}>{props.date}</Text>
        <Text style={(height, width, styles.temperature)}>
          {props.temperature}°
        </Text>
        <Text style={(height, width, styles.tempMin)}>
          {props.temperatureMin}°
        </Text>
      </View>
      <View style={(height, width, styles.right)}>
        <View style={styles.centerR}>
          <Image style={(height, width, styles.stretch)} source={props.iconDay} />
          <Text style={(height, width, styles.condition)}>{props.condition}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "#1E4BD2",
    alignSelf: "stretch",
    paddingTop: 10,
    height: 270,
  },
  date: {
    fontSize: 19,
    color: "white",
    textTransform: "capitalize",
  },
  temperature: {
    fontSize: 64,
    color: "white",
  },
  tempMin: {
    fontSize: 28,
    color: "white",
  },
  left: {
    paddingLeft: 20,
  },
  right: {
    paddingRight: 20,
    paddingBottom: 10,
  },
  centerR: {
    alignItems: 'center',
  },
  condition: {
    textTransform: "capitalize",
    color: "white",
    fontSize: 16,
  },
  stretch: {
    width: 130,
    height: 130,
    resizeMode: "stretch",
  },
});