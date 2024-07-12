import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "@/constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import { RootObject, ImageTrack } from "@/interface/data";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Props {
  item: any;
  index: number;
}

export default function TopTrack({ item, index }: Props) {
  const imageUrl = item.image.find((img: ImageTrack) => img.size === "medium")[
    "#text"
  ];

  const navigation = useNavigation();

  const handlePress = async () => {
    try {
      const storedTracks = await AsyncStorage.getItem("clickedTracks");
      const clickedTracks = storedTracks ? JSON.parse(storedTracks) : [];

      // Agregar el nuevo track al principio de la lista
      const updatedTracks = [item, ...clickedTracks];

      // Limitar la lista a 10 elementos
      if (updatedTracks.length > 10) {
        updatedTracks.pop();
      }

      // Guardar la lista actualizada en AsyncStorage
      await AsyncStorage.setItem(
        "clickedTracks",
        JSON.stringify(updatedTracks)
      );
    } catch (error) {
      console.error("Error saving track:", error);
    }
  };

  const handledPlay = (item: RootObject) => {
    console.log("Play song: ", item.name);
    handlePress();
    // @ts-ignore
    navigation.navigate("DetailsTrack", { item: item as RootObject });
  };

  return (
    <View style={styles.listContainer}>
      <Image style={styles.image} source={{ uri: imageUrl }} />
      <View style={styles.infoContainer}>
        <View>
          <Text style={styles.textTrack} numberOfLines={2} ellipsizeMode="tail">
            {item.name}
          </Text>
          <Text style={styles.textArtistname}>{item.artist.name}</Text>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => handledPlay(item)}
          >
            <AntDesign name="caretright" size={24} color={colors.blue} />
          </TouchableOpacity>
        </View>
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
  btnContainer: {
    width: "100%",
    alignItems: "flex-end",
  },
  btn: {
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
    width: 220,
    color: colors.white,
    fontSize: 20,
  },
  textArtistname: {
    color: colors.grey,
    fontSize: 14,
  },
});
