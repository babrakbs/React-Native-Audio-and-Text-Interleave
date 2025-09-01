import { StyleSheet } from "react-native";
import { colors } from "../../Constants";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      paddingHorizontal: widthPercentageToDP(3),
    },
    chatContainer: {
      paddingVertical: heightPercentageToDP(2),
    },
  });
  