import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { colors, moodColors } from "~/utils/colors"; // Assuming you have predefined mood colors
export type MoodData = Record<
  string,
  "veryGood" | "good" | "normal" | "bad" | "veryBad"
>;

const getDaysInMonth = (month: number, year: number) =>
  new Date(year, month, 0).getDate();

const Calendar: React.FC<{ moodData: MoodData }> = ({ moodData }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const days = getDaysInMonth(currentMonth + 1, currentYear);

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const renderDays = () => {
    return Array.from({ length: days }).map((_, index) => {
      const day = index + 1;
      const mood =
        moodData[`${currentYear}-${currentMonth + 1}-${day}`] || "normal"; // Default mood if not set
      return (
        <TouchableOpacity
          key={day}
          style={[styles.day, { backgroundColor: moodColors[mood] }]}
        >
          <Text style={styles.dayText}>{day}</Text>
        </TouchableOpacity>
      );
    });
  };

  return (
    <View
      style={{ backgroundColor: colors.white, padding: 15, borderRadius: 16 }}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={handlePrevMonth}>
          <Image source={require("assets/vectors/left-arrow.png")} />
        </TouchableOpacity>
        <Text style={styles.headerText}>{`Tháng ${
          currentMonth + 1
        }, ${currentYear}`}</Text>
        <TouchableOpacity onPress={handleNextMonth}>
          <Image source={require("assets/vectors/right-arrow.png")} />
        </TouchableOpacity>
      </View>
      <View style={styles.calendar}>{renderDays()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  headerText: {
    padding: 10,
    color: colors.primary,
    fontSize: 20,
    fontWeight: "bold",
  },
  calendar: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 10,
  },
  day: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    borderRadius: 5,
  },
  dayText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Calendar;
