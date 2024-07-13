import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useRef, useState } from "react";
import { useLastFM } from "@/hooks/useLastFm";
import { FlashList } from "@shopify/flash-list";
import { useGlobalStyles } from "@/hooks/useGlobalStyles";
import { colors } from "@/constants/Colors";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ArtistLike() {
  const { mainContainer } = useGlobalStyles();
  const { fetchArtist } = useLastFM();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const listRef = useRef(null);

  const renderRow = ({ item, index }: { item: any; index: number }) => (
    <Text style={{ color: colors.white }}>{item}</Text>
  );

  useFocusEffect(
    React.useCallback(() => {
      const fetchFavoriteArtists = async () => {
        try {
          const storedArtists = await AsyncStorage.getItem("favoriteArtists");
          const favoriteArtists = storedArtists
            ? JSON.parse(storedArtists)
            : [];
          //   setData(favoriteArtists);
          // Extraer solo los nombres de los artistas
          const artistNames = favoriteArtists.map(
            (artist: { name: string }) => artist.name
          );
          setData(artistNames);
        } catch (error) {
          console.error("Error fetching favorite artists:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchFavoriteArtists();
    }, [])
  );

  if (loading) {
    return (
      <View style={[mainContainer, { justifyContent: "center" }]}>
        <ActivityIndicator size="large" color={colors.blue} />
      </View>
    );
  }

  return (
    <FlashList
      data={loading ? [] : data}
      ref={listRef}
      keyExtractor={(item, index) => String(index)}
      renderItem={renderRow}
      ListEmptyComponent={
        <View style={[mainContainer, { justifyContent: "center" }]}>
          <Text style={{ color: colors.white, textAlign: "center" }}>
            No tracks clicked yet.
          </Text>
        </View>
      }
      estimatedItemSize={100}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({});
