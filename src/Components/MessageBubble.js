import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { colors } from "../Constants";

const MessageBubble = ({ speaker, text, highlight, disabled }) => {
  const isUser = speaker === "John"; // message alignment by user name

  return (
    <View
      style={[
        styles.container,
        isUser ? styles.rightContainer : styles.leftContainer,
      ]}
    >
      {!isUser && (
        <Text
          style={[
            styles.speaker,
            highlight && { color: colors.highlightText },
          ]}
        >
          {speaker}
        </Text>
      )}

      <View
        style={[
          styles.bubble,
          isUser ? styles.rightBubble : styles.leftBubble,
          highlight && { backgroundColor: colors.highlightBackground },
        ]}
      >
        <Text
          style={[
            styles.text,
            disabled && { color: colors.disabledText },
            highlight && { color: colors.highlightText, fontWeight: "600" },
          ]}
        >
          {text}
        </Text>
      </View>

      {isUser && (
        <Text
          style={[
            styles.speaker,
            highlight && { color: colors.highlightText },
          ]}
        >
          {speaker}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: hp("0.7%"),
    maxWidth: "80%",
  },
  leftContainer: {
    alignSelf: "flex-start",
    alignItems: "flex-start",
  },
  rightContainer: {
    alignSelf: "flex-end",
    alignItems: "flex-end",
  },
  speaker: {
    fontSize: wp("3.5%"),
    color: colors.textPrimary,
    marginBottom: hp("0.3%"),
    fontWeight: "500",
  },
  bubble: {
    borderRadius: wp("3%"),
    borderWidth: 1,
    paddingVertical: hp("1%"),
    paddingHorizontal: wp("4%"),
  },
  leftBubble: {
    backgroundColor: colors.bubbleBackground,
    borderColor: colors.bubbleBorder,
  },
  rightBubble: {
    backgroundColor: colors.background ,
    borderColor: colors.bubbleBorder,
  },
  text: {
    fontSize: wp("4%"),
    color: colors.textPrimary,
  },
});

export default MessageBubble;
