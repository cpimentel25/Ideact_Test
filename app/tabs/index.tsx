import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useGlobalStyles } from "@/hooks/useGlobalStyles";
import { useLastFM } from "@/hooks/useLastFm";
import { colors } from "@/constants/Colors";
import { FlashList } from "@shopify/flash-list";
import TopTrack from "@/components/topTrack";
import { RootObject } from "@/interface/data";

export default function Home() {
  const { mainContainer, text } = useGlobalStyles();
  const { fetchTopTracks } = useLastFM();

  const [loading, setLoading] = useState(true);
  const [topTracks, setTopTracks] = useState<RootObject[]>([]);
  //   console.log("🚀 ~ Index ~ topTracks:", topTracks[0]);

  const listRef = useRef<FlashList<RootObject>>(null);

  useEffect(() => {
    const getTopTrack = async () => {
      const top = await fetchTopTracks();
      setTopTracks(top);
      setLoading(false);
    };
    getTopTrack();
  }, []);

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
      <FlashList
        data={loading ? [] : topTracks}
        ref={listRef}
        renderItem={renderRow}
        estimatedItemSize={100}
        keyExtractor={(item: RootObject, index) => item.name || String(index)}
        ListEmptyComponent={<Text>Not found or Empty section</Text>}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
