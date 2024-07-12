import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  AntDesign,
  FontAwesome,
  FontAwesome5,
  Ionicons,
} from "@expo/vector-icons";
import { colors } from "@/constants/Colors";
import { ImageTrack } from "@/interface/data";
import * as Progress from "react-native-progress";
import { useNavigation } from "@react-navigation/native";
import Slider from "@react-native-community/slider";

export default function DetailsTrack({ route }: { route: any }) {
  const { item } = route.params;
  const [progress, setProgress] = useState(0);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [volume, setVolume] = useState(50); // Estado inicial del volumen

  const navigation = useNavigation();

  const [trackPlay, setTrackPlay] = useState(false);
  const [random, setRandom] = useState(false);
  const [retweet, setRetweet] = useState(false);

  const imageUrl = item.image.find((img: ImageTrack) => img.size === "large")[
    "#text"
  ];

  const totalDuration = item.duration;

  useEffect(() => {
    let interval: any;
    if (!trackPlay) {
      interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + 1 / totalDuration;
          if (newProgress >= 1) {
            clearInterval(interval);
            setTrackPlay(false);
            return 1;
          }
          return newProgress;
        });
        setSecondsElapsed((prev) => prev + 1);
      }, 1000);
    } else if (secondsElapsed >= totalDuration) {
      // clearInterval(interval);
      setProgress(0);
      setSecondsElapsed(0);
      setTrackPlay(true);
    }
    return () => clearInterval(interval);
  }, [trackPlay]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const handleGoBack = () => {
    navigation.goBack();
    console.log("Go back logic");
  };

  const handleVolumeChange = (value: number) => {
    setVolume(value); // Actualiza el estado del volumen
  };

  // console.log("🚀 ~ DetailsTrack ~ item:", item);

  return (
    <View style={styles.main}>
      <View style={{ width: "100%" }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <FontAwesome5 name="chevron-left" size={24} color={colors.grey} />
          </TouchableOpacity>
        </View>
        <View style={styles.imgContainer}>
          <Progress.Circle
            progress={progress}
            size={300}
            indeterminate={false}
            color={colors.orange}
            unfilledColor={colors.softBlack}
            borderWidth={0}
            style={styles.progressCircle}
          />
          <Image style={styles.image} source={{ uri: imageUrl }} />
        </View>
        <View style={styles.durationContainer}>
          <Text style={styles.textTrackDuration}>
            {formatTime(secondsElapsed)}
          </Text>
          <Text style={styles.textTrackDuration}>
            {formatTime(item.duration)}
          </Text>
        </View>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.textSoung} numberOfLines={2} ellipsizeMode="tail">
          {item.name}
        </Text>
        <Text style={styles.textArtits}>{item.artist.name}</Text>
      </View>
      <View>
        <View style={styles.trackControl}>
          <TouchableOpacity onPress={() => setRetweet(!retweet)}>
            <FontAwesome
              name="retweet"
              size={24}
              color={retweet ? colors.boredorange : colors.grey}
            />
          </TouchableOpacity>
          <AntDesign name="banckward" size={32} color={colors.grey} />
          <TouchableOpacity
            style={styles.btnPlay}
            onPress={() => setTrackPlay(!trackPlay)}
          >
            {trackPlay ? (
              <AntDesign name="caretright" size={40} color={colors.greyLight} />
            ) : (
              <AntDesign name="pause" size={40} color={colors.greyLight} />
            )}
          </TouchableOpacity>
          <AntDesign name="forward" size={32} color={colors.grey} />
          <TouchableOpacity onPress={() => setRandom(!random)}>
            <FontAwesome
              name="random"
              size={24}
              color={random ? colors.boredorange : colors.grey}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.volContainer}>
          <Ionicons name="volume-low-sharp" size={22} color={colors.grey} />
          <Slider
            style={{ flex: 1 }}
            minimumValue={0}
            maximumValue={100}
            value={volume}
            onValueChange={handleVolumeChange}
            minimumTrackTintColor={colors.orange}
            maximumTrackTintColor={colors.grey}
            thumbTintColor={colors.orange}
          />
          <Ionicons name="volume-medium" size={22} color={colors.grey} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.bgBlack,
    paddingTop: 60,
  },
  header: {
    marginHorizontal: 20,
    marginBottom: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  imgContainer: {
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 125,
    marginVertical: 20,
  },
  durationContainer: {
    marginHorizontal: 60,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  textSoung: {
    width: 300,
    color: colors.white,
    fontSize: 26,
    textAlign: "center",
  },
  textArtits: {
    color: colors.grey,
    fontSize: 16,
  },
  trackControl: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginVertical: 40,
    gap: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  btnPlay: {
    borderRadius: 50,
    backgroundColor: colors.boredorange,
    padding: 15,
  },
  progressCircle: {
    position: "absolute",
  },
  textTrackDuration: {
    color: colors.grey,
    fontSize: 18,
  },
  volContainer: {
    paddingHorizontal: 20,
    marginBottom: 40,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
