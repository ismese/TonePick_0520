import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const AfterNavigator = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <MaterialIcons name="arrow-forward" size={20} color="gray" />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 5, // 터치 영역을 약간 넓힘
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AfterNavigator;
