import React, { useEffect, useState } from "react";
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
  const [isFavorite, setIsFavorite] = useState(false);
  const imageUrl = item.image.find((img: ImageTrack) => img.size === "medium")[
    "#text"
  ];

  const navigation = useNavigation();

  useEffect(() => {
    const checkIfFavorite = async () => {
      try {
        const storedArtists = await AsyncStorage.getItem("favoriteArtists");
        const favoriteArtists = storedArtists ? JSON.parse(storedArtists) : [];

        const artistExists = favoriteArtists.some(
          (artist: RootObject["artist"]) => artist.name === item.artist.name
        );

        setIsFavorite(artistExists);
      } catch (error) {
        console.error("Error loading favorite artists:", error);
      }
    };

    checkIfFavorite();
  }, [item.artist.name]);

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

  const handleFavoriteArtist = async () => {
    try {
      const storedArtists = await AsyncStorage.getItem("favoriteArtists");
      let favoriteArtists = storedArtists ? JSON.parse(storedArtists) : [];

      const artistIndex = favoriteArtists.findIndex(
        (artist: RootObject["artist"]) => artist.name === item.artist.name
      );

      if (artistIndex !== -1) {
        // Si el artista ya existe, eliminarlo de la lista
        favoriteArtists.splice(artistIndex, 1);
        setIsFavorite(false);
      } else {
        // Si el artista no existe, agregarlo a la lista
        favoriteArtists = [item.artist, ...favoriteArtists];
        setIsFavorite(true);
      }

      await AsyncStorage.setItem(
        "favoriteArtists",
        JSON.stringify(favoriteArtists)
      );
    } catch (error) {
      console.error("Error saving favorite artist:", error);
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
        <View style={styles.songContainer}>
          <Text style={styles.textTrack} numberOfLines={2} ellipsizeMode="tail">
            {item.name}
          </Text>
          <Text style={styles.textArtistname}>{item.artist.name}</Text>
        </View>
        <TouchableOpacity style={styles.btn} onPress={handleFavoriteArtist}>
          <AntDesign
            name={isFavorite ? "heart" : "hearto"}
            size={28}
            color={colors.orange}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => handledPlay(item)}>
          <AntDesign name="caretright" size={32} color={colors.blue} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: colors.black,
    borderTopStartRadius: 50,
    borderBottomStartRadius: 50,
    borderTopEndRadius: 20,
    borderBottomEndRadius: 20,
    marginVertical: 10,
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  songContainer: { width: 160 },
  btn: {
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
  },
  numTop: {
    color: colors.white,
    fontSize: 16,
    width: 25,
    textAlign: "right",
  },
  textTrack: {
    color: colors.white,
    fontSize: 19,
  },
  textArtistname: {
    color: colors.grey,
    fontSize: 12,
  },
});
