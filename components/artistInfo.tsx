import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { colors } from "@/constants/Colors";

export default function ArtistInfo({ item }: any) {
  const imageUrl = item.image.find((img: any) => img.size === "medium")[
    "#text"
  ];

  function formatNumber(numStr: string) {
    const num = parseInt(numStr, 10);

    if (isNaN(num)) {
      return "Invalid number";
    }

    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  }

  const handlePress = () => {
    Linking.openURL(item.url).catch((error) =>
      console.error("Error opening URL:", error)
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.artistContainer}>
        <View style={styles.imgContainer}>
          <Image style={styles.img} source={{ uri: imageUrl }} />
        </View>
        <Text style={styles.title}>{item.name}</Text>
      </View>
      <View style={styles.infoContainer}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={styles.textContainer}>
            <Text style={styles.subTitle}>Listeners</Text>
            <Text style={styles.num}>{formatNumber(item.stats.listeners)}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.subTitle}>Scrobbles</Text>
            <Text style={styles.num}>{formatNumber(item.stats.playcount)}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.btn} onPress={handlePress}>
          <Text style={{ color: colors.white }}>MORE INFORMATION</Text>
        </TouchableOpacity>
      </View>
      {/* <Text style={{ color: colors.white }}>{item.bio.summary}</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 10,
    padding: 10,
    gap: 10,
    alignItems: "center",
    // justifyContent: "space-between",
    backgroundColor: colors.darkGreen,
    borderRadius: 20,
  },
  artistContainer: {
    width: 150,
    alignItems: "center",
    gap: 10,
  },
  imgContainer: {
    borderWidth: 2,
    borderColor: colors.boredorange,
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: colors.blue,
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
  },
  title: {
    color: colors.white,
    fontSize: 18,
    textAlign: "center",
  },
  subTitle: {
    color: colors.grey,
    fontSize: 14,
  },
  num: {
    color: colors.white,
    fontSize: 18,
  },
  btn: {
    padding: 10,
    backgroundColor: colors.boredorange,
    borderRadius: 5,
    marginTop: 15,
  },
});
