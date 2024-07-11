import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "@/constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import { RootObject, ImageTrack } from "@/interface/data";
import { useNavigation } from "@react-navigation/native";

interface Props {
  item: any;
  index: number;
}

export default function TopTrack({ item, index }: Props) {
  const imageUrl = item.image.find((img: ImageTrack) => img.size === "medium")[
    "#text"
  ];

  const navigation = useNavigation();

  const handledPlay = (item: RootObject) => {
    console.log("Play song: ", item.name);
    // @ts-ignore
    navigation.navigate("DetailsTrack", { item: item as RootObject });
  };

  return (
    <View style={styles.listContainer}>
      <Image style={styles.image} source={{ uri: imageUrl }} />
      <View style={styles.infoContainer}>
        <View>
          <Text style={styles.textTrack}>{item.name}</Text>
          <Text style={styles.textArtistname}>{item.artist.name}</Text>
        </View>
        <TouchableOpacity
          style={styles.playContainer}
          onPress={() => handledPlay(item)}
        >
          <AntDesign name="caretright" size={24} color={colors.blue} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: colors.black,
    borderRadius: 10,
    marginVertical: 10,
    padding: 5,
    flexDirection: "row",
    gap: 20,
  },
  image: {
    width: 130,
    height: 130,
    borderRadius: 7,
  },
  infoContainer: {
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  playContainer: {
    padding: 5,
    backgroundColor: colors.darkBlue,
    borderRadius: 3,
    alignItems: "center",
    width: 70,
  },
  numTop: {
    color: colors.white,
    fontSize: 16,
    width: 25,
    textAlign: "right",
  },
  textTrack: {
    color: colors.white,
    fontSize: 20,
  },
  textArtistname: {
    color: colors.grey,
    fontSize: 14,
  },
});
