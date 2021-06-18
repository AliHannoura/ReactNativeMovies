import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  Dimensions,
  ScrollView,
  StyleSheet,
} from "react-native";
import tmdb from "../api/tmdb";

import Genres from "../components/Genres";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const MovieDetail = ({ navigation }) => {
  const [details, setDetails] = useState();

  const { id, posterUrl, title, rating, detailsOverview, detailsGenres } =
    navigation.state.params;

  const creditsApi = async (id) => {
    try {
      const response = await tmdb.get(
        `/movie/${id}/credits?api_key=9b9b7f77c3f1ee7c999ffeb41a67f7c0&language=en-US`
      );
      setDetails(response.data.cast);
    } catch (error) {
      console.log("Error");
    }
  };

  useEffect(() => {
    creditsApi(id);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Image style={styles.poster} source={{ uri: posterUrl }} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.rating}>{rating}</Text>
      <>
        <Text style={styles.header}>Overview</Text>
        <ScrollView>
          <Text style={styles.overview}>{detailsOverview}</Text>
          <Text style={styles.header}>Genres</Text>
          <Genres
            genresArray={detailsGenres}
            genresMargin={"2%"}
            genresPadding={"2%"}
          />
          <Text style={styles.header}>Credits</Text>
          <FlatList
            style={styles.list}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={details}
            keyExtractor={(result) => result.id.toString()}
            renderItem={({ item }) => {
              return (
                <View style={styles.singleCreditContainer}>
                  <Image
                    style={styles.creditPic}
                    source={{
                      uri: `https://image.tmdb.org/t/p/w500${item.profile_path}`,
                    }}
                  />
                  <Text style={styles.creditName}>{item.original_name}</Text>
                </View>
              );
            }}
          />
        </ScrollView>
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  poster: {
    borderRadius: 10,
    alignSelf: "center",
    margin: "4%",
    height: "30%",
    width: "35%",
  },
  title: {
    alignSelf: "center",
    marginBottom: "2%",
    fontSize: 20,
    fontWeight: "bold",
  },
  rating: {
    color: "limegreen",
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  header: {
    fontSize: 15,
    fontWeight: "bold",
    marginVertical: "1%",
    marginHorizontal: "3%",
  },
  overview: {
    color: "dimgrey",
    marginHorizontal: "3%",
  },
  list: {
    marginHorizontal: "3%",
  },
  singleCreditContainer: {
    marginRight: screenWidth / 20,
  },
  creditName: {
    fontSize: 11,
    fontWeight: "bold",
  },
  creditPic: {
    alignSelf: "center",
    borderRadius: 40,
    height: screenHeight / 13,
    width: screenWidth / 6,
  },
});

export default MovieDetail;
