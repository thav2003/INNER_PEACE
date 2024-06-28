import React, { useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";
import { colors, moodColors } from "../utils/colors";

const moodImages = [
  require("assets/mood1.png"),
  require("assets/mood2.png"),
  require("assets/mood3.png"),
  require("assets/mood4.png"),
  require("assets/mood5.png"),
];

const moodDescriptions = ["Rất tệ", "Buồn", "Bình thường", "Tốt", "Rất tốt"];

const moodStyles = [
  moodColors.bad,
  moodColors.normal,
  moodColors.good,
  moodColors.veryGood,
];

const MoodSlider: React.FC = () => {
  const [moodIndex, setMoodIndex] = useState(2);

  const handleSliderChange = (value: number) => {
    const roundedValue = Math.round(value);
    setMoodIndex(roundedValue);
  };

  return (
    <View style={styles.container}>
      <Image source={moodImages[moodIndex]} style={styles.image} />
      <Text style={styles.moodText}>{moodDescriptions[moodIndex]}</Text>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={4}
        step={1}
        value={moodIndex}
        onValueChange={handleSliderChange}
        minimumTrackTintColor={moodStyles[moodIndex - 1]}
        maximumTrackTintColor={colors.grey}
        thumbImage={require("assets/moodSliderThumb.png")}
      />
    </View>
  );
};

export default MoodSlider;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    height: 300,
  },
  image: {
    position: "absolute",
    top: 30,
  },
  moodText: {
    fontSize: 18,
    marginTop: 150,
    fontWeight: "bold",
    color: colors.primary,
  },
  slider: {
    width: "80%",
    marginTop: 10,
  },
});
