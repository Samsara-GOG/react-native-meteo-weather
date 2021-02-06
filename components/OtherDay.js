import React from "react";
import { StyleSheet, Image, Text, View } from "react-native";

import {
  useResponsiveHeight,
  useResponsiveWidth,
} from "react-native-responsive-dimensions";

export default function OtherDay(props) {
  let height = useResponsiveHeight(25);
  let width = useResponsiveWidth(25);

  return (
    <View style={(height, width, styles.otherDay)}>
      <View style={(height, width, styles.left)}>
        <Image style={(height, width, styles.stretch)} source={props.iconDay} />
      </View>
      <View style={(height, width, styles.middle)}>
        <Text style={(height, width, styles.date)}>{props.date}</Text>
        <Text style={(height, width, styles.condition)}>{props.condition}</Text>
      </View>
      <View style={(height, width, styles.right)}>
        <Text style={styles.temperature}>{props.temperature}°</Text>
        <Text style={styles.temperatureMin}>{props.temperatureMin}°</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  otherDay: {
    flex: 1,
    backgroundColor: "#EFFBFE",
    color: "black",
    flexDirection: "row",
    justifyContent: "center",
    height: 100,
    borderBottomWidth: 1,
    borderBottomColor: "#C3D2FF",
  },
  condition: {
    paddingTop: 1,
    textTransform: "capitalize",
  },
  date: {
    textTransform: "capitalize",
    fontSize: 18,
  },
  left: {
    flex: 1.6,
    flexDirection: "row",
  },
  middle: {
    textTransform: "capitalize",
    flex: 3.8,
    alignSelf: "center",
    flexDirection: "column",
    marginLeft: 15,
  },
  right: {
    flex: 0.8,
    alignSelf: "center",
    paddingLeft: 5,
    paddingRight: 10,
  },
  stretch: {
    width: 100,
    height: 100,
    resizeMode: "stretch",
  },
  temperature: {
    fontSize: 18,
  },
  temperatureMin: {
    fontSize: 14,
  },
});
