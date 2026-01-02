import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useEvent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import { useVideoPlayer, VideoView } from 'expo-video';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, icons } from '../constants';

const videoSource =
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
  
const VideoCallHistoryDetailsPlayRecordings = () => {
    const navigation = useNavigation<NavigationProp<any>>();
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});

    const player = useVideoPlayer(videoSource, player => {
    player.loop = true;
    player.play();
  });

  const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });

    return (
        <SafeAreaView style={styles.area}>
            <View style={styles.container}>
                <StatusBar
                    hideTransitionAnimation="fade"
                    style="light"
                />
                <View style={styles.headerContainer}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}>
                        <Image
                            source={icons.back}
                            resizeMode='contain'
                            style={styles.arrowBackIcon}
                        />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}></Text>
                </View>
                <VideoView style={styles.video} player={player} allowsFullscreen allowsPictureInPicture />
            </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    area: {
        flex: 1,
        backgroundColor: "black",
    },
    container: {
        flex: 1,
        backgroundColor: "black",
    },
    arrowBackIcon: {
        width: 24,
        height: 24,
        tintColor: COLORS.white
    },
    headerTitle: {
        fontSize: 16,
        fontFamily: "bold",
        color: COLORS.white,
        textAlign: "center",
        marginLeft: 16
    },
    headerContainer: {
        position: "absolute",
        top: 16,
        left: 16,
        flexDirection: "row",
        alignItems: "center",
        zIndex: 9999
    },
    video: {
        width: "100%",
        height: "100%"
    }
})

export default VideoCallHistoryDetailsPlayRecordings