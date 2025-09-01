import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { colors } from "../Constants";
import Icon from "react-native-vector-icons/Feather";
import Slider from "@react-native-community/slider";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const AudioPlayerControls = ({
    currentTime,
    duration,
    onPlayPause,
    isPlaying,
    isFinished,
    onRewind,
    onForward,
    onRepeat,
    onSeek,
}) => {
    return (
        <View style={styles.container}>
            <Slider
                style={{ width: "100%", height: hp("2%") }}
                minimumValue={0}
                maximumValue={duration}
                value={currentTime}
                minimumTrackTintColor={colors.primary}
                maximumTrackTintColor={colors.bubbleBorder}
                thumbTintColor={colors.primary}
                onSlidingStart={() => {
                    // pause immediately when user starts sliding the slider
                    if (isPlaying) {
                        onPlayPause();
                    }
                }}
                onSlidingComplete={onSeek}
            />

            <View style={styles.controls}>
                <Text style={styles.time}>
                    {new Date(currentTime * 1000).toISOString().substr(14, 5)}
                </Text>

                <View style={styles.buttons}>
                    <TouchableOpacity onPress={onRewind}>
                        <Icon name="rewind" size={wp("7%")} color={colors.textPrimary} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.playButton}
                        onPress={onPlayPause}
                        activeOpacity={0.8}
                    >
                        <Icon
                            name={isPlaying && !isFinished ? "pause" : "play"}
                            size={wp("7%")}
                            color={colors.primary}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={onForward}>
                        <Icon name="fast-forward" size={wp("7%")} color={colors.textPrimary} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={onRepeat}>
                        <Icon name="rotate-ccw" size={wp("7%")} color={colors.textPrimary} />
                    </TouchableOpacity>
                </View>

                <Text style={styles.time}>
                    {new Date(duration * 1000).toISOString().substr(14, 5)}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { marginTop: hp("2%") },
    controls: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: hp("1%"),
    },
    buttons: {
        flexDirection: "row",
        alignItems: "center",
        gap: wp("6%"),
    },
    playButton: {
        backgroundColor: colors.background,
        borderRadius: wp("10%"),
        padding: wp("4%"),
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    time: { fontSize: wp("3.5%"), color: colors.textSecondary },
});

export default AudioPlayerControls;
