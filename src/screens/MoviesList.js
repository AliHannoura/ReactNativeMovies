import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

import Card from "../components/Card";
import tmdb from "../api/tmdb";

const MoviesList = () => {
  const [list, setList] = useState([]);
  const [listType, setListType] = useState("upcoming");

  let listRef;

  const tmdbApi = async (listType) => {
    try {
      const response = await tmdb.get(
        `/movie/${listType}?api_key=9b9b7f77c3f1ee7c999ffeb41a67f7c0&language=en-US&page=1`
      );
      setList(response.data.results);
    } catch (error) {
      console.log("Error");
    }
  };

  useEffect(() => {
    tmdbApi("upcoming");
  }, [styles.activeButton]);

  return (
    <>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={
            listType == "upcoming" ? styles.activeButton : styles.inactiveButton
          }
          onPress={() => {
            tmdbApi("upcoming");
            setListType("upcoming");
            listRef.scrollToOffset({ offset: 0 });
          }}
        >
          <Text
            style={
              listType == "upcoming" ? styles.activeText : styles.inactiveText
            }
          >
            Upcoming
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            listType == "popular" ? styles.activeButton : styles.inactiveButton
          }
          onPress={() => {
            tmdbApi("popular");
            setListType("popular");
            listRef.scrollToOffset({ offset: 0 });
          }}
        >
          <Text
            style={
              listType == "popular" ? styles.activeText : styles.inactiveText
            }
          >
            Popular
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            listType == "top_rated"
              ? styles.activeButton
              : styles.inactiveButton
          }
          onPress={() => {
            tmdbApi("top_rated");
            setListType("top_rated");
            listRef.scrollToOffset({ offset: 0 });
          }}
        >
          <Text
            style={
              listType == "top_rated" ? styles.activeText : styles.inactiveText
            }
          >
            Top Rated
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={list}
        extraData={list}
        keyExtractor={(movie) => movie.id.toString()}
        renderItem={({ item }) => {
          return (
            <Card
              poster={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
              movieTitle={item.title}
              releaseDate={item.release_date}
              genres={item.genre_ids}
              vote={item.vote_average}
              movieId={item.id}
              overview={item.overview}
            />
          );
        }}
        ref={(ref) => {
          listRef = ref;
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  activeButton: {
    backgroundColor: "limegreen",
    padding: "2%",
    margin: "2%",
    borderRadius: 60,
  },
  inactiveButton: {
    backgroundColor: "lightgrey",
    padding: "2%",
    margin: "2%",
    borderRadius: 60,
  },
  activeText: {
    color: "white",
    fontWeight: "bold",
  },
  inactiveText: {
    color: "black",
    fontWeight: "bold",
  },
});

export default MoviesList;
