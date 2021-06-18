import React from "react";
import { View, Text, StyleSheet } from "react-native";

import genresData from "../data/genresData";

const genreFinder = (genreResult) => {
  return genresData.find((genre) => genre.id == genreResult).name;
};

const Genres = ({ genresArray, genresMargin, genresPadding }) => {
  return (
    <View
      style={{
        ...styles.genresContainer,
        ...{ marginHorizontal: genresMargin },
      }}
    >
      <Text
        style={{ ...styles.genres, ...{ paddingHorizontal: genresPadding } }}
      >
        {genreFinder(genresArray[0])}
      </Text>
      {genresArray.length > 1 ? (
        <Text
          style={{ ...styles.genres, ...{ paddingHorizontal: genresPadding } }}
        >
          {genreFinder(genresArray[1])}
        </Text>
      ) : null}
      {genresArray.length > 2 ? (
        <Text
          style={{ ...styles.genres, ...{ paddingHorizontal: genresPadding } }}
        >
          {genreFinder(genresArray[2])}
        </Text>
      ) : null}
    </View>
  );
};

styles = StyleSheet.create({
  genresContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "flex-start",
  },
  genres: {
    backgroundColor: "lightgrey",
    fontSize: 12,
    borderRadius: 8,
    overflow: "hidden",
    margin: "1%",
  },
});

export default Genres;
