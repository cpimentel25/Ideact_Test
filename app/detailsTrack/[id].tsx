import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function DetailsTrack({ route }: { route: any }) {
  const { item } = route.params;
  console.log("🚀 ~ DetailsTrack ~ item:", item);
  return (
    <View>
      <Text>{item.name}</Text>
      <Text>{item.artist.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
