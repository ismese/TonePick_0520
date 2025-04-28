import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons"; 
const BeforeNavigator = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Ionicons name="arrow-back" size={24} color="black" />
      
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: "center",
    top: 0, 
    left: 10, 
    padding: 5,
    zIndex: 10, 
  },
});

export default BeforeNavigator;
