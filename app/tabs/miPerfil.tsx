import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import { colors } from "@/constants/Colors";
import { useGlobalStyles } from "@/hooks/useGlobalStyles";
import { RootObject } from "@/interface/data";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlashList } from "@shopify/flash-list";
import TopTrack from "@/components/topTrack";
import { useFocusEffect } from "@react-navigation/native";
import ArtistLike from "@/components/artistLike";

export default function MiPerfil() {
  const { mainContainer } = useGlobalStyles();
  const [loading, setLoading] = useState(true);
  const [clickedTracks, setClickedTracks] = useState<RootObject[]>([]);
  const [option, setOption] = useState(true);

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
        {/* <Text style={styles.subTitle}>Últimas canciones reproducidas</Text> */}
      </View>
      <View style={styles.optionContaioner}>
        <TouchableOpacity
          style={[
            styles.option,
            option
              ? { borderBottomColor: colors.orange }
              : { borderBottomColor: colors.softBlack },
          ]}
          onPress={() => setOption(true)}
        >
          <Text
            style={[
              styles.opText,
              option ? { color: colors.white } : { color: colors.grey },
            ]}
          >
            Canciones Reproducidas
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.option,
            option
              ? { borderBottomColor: colors.softBlack }
              : { borderBottomColor: colors.orange },
          ]}
          onPress={() => setOption(false)}
        >
          <Text
            style={[
              styles.opText,
              option ? { color: colors.grey } : { color: colors.white },
            ]}
          >
            Artistas Favoritos
          </Text>
        </TouchableOpacity>
      </View>
      {option ? (
        <FlashList
          data={loading ? [] : clickedTracks}
          ref={listRef}
          keyExtractor={(item: RootObject, index) => String(index)}
          renderItem={renderRow}
          ListEmptyComponent={
            <View style={[mainContainer, { justifyContent: "center" }]}>
              <Text style={{ color: colors.white, textAlign: "center" }}>
                No tracks clicked yet.
              </Text>
            </View>
          }
          estimatedItemSize={10}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <ArtistLike />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 30,
  },
  optionContaioner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    justifyContent: "space-between",
    marginBottom: 10,
  },
  option: {
    width: "50%",
    alignItems: "center",
    height: 50,
    borderBottomWidth: 4,
  },
  opText: {
    width: 110,
    textAlign: "center",
    color: colors.white,
    fontSize: 16,
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
