import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useRef, useState } from "react";
import { colors } from "@/constants/Colors";
import { useGlobalStyles } from "@/hooks/useGlobalStyles";
import { RootObject } from "@/interface/data";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlashList } from "@shopify/flash-list";
import TopTrack from "@/components/topTrack";
import { useFocusEffect } from "@react-navigation/native";

export default function MiPerfil() {
  const { mainContainer } = useGlobalStyles();
  const [loading, setLoading] = useState(true);
  const [clickedTracks, setClickedTracks] = useState<RootObject[]>([]);

  const listRef = useRef<FlashList<RootObject>>(null);

  useFocusEffect(
    React.useCallback(() => {
      const fetchClickedTracks = async () => {
        try {
          const storedTracks = await AsyncStorage.getItem("clickedTracks");
          if (storedTracks) {
            setClickedTracks(JSON.parse(storedTracks));
          } else {
            console.log("No stored tracks found");
          }
          setLoading(false);
        } catch (error) {
          console.error("Error fetching clicked tracks:", error);
        }
      };
      fetchClickedTracks();
    }, [])
  );

  const renderRow = ({ item, index }: { item: RootObject; index: number }) => (
    <TopTrack item={item} index={index} />
  );

  if (loading) {
    return (
      <View style={[mainContainer, { justifyContent: "center" }]}>
        <ActivityIndicator size="large" color={colors.blue} />
      </View>
    );
  }

  return (
    <View style={mainContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Mi Perfil</Text>
        <Text style={styles.subTitle}>Últimas canciones reproducidas</Text>
      </View>
      <FlashList
        data={loading ? [] : clickedTracks}
        ref={listRef}
        keyExtractor={(item: RootObject, index) => String(index)}
        renderItem={renderRow}
        ListEmptyComponent={<Text>No tracks clicked yet.</Text>}
        estimatedItemSize={10}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 30,
  },
  title: {
    color: colors.white,
    fontSize: 24,
    fontWeight: "bold",
  },
  subTitle: {
    color: colors.grey,
    fontSize: 18,
  },
});
