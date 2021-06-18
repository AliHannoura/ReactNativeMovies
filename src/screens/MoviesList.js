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
  const [upcomingButton, setUpcomingButton] = useState(styles.activeButton);
  const [popularButton, setPopularButton] = useState(styles.inactiveButton);
  const [topRatedButton, setTopRatedButton] = useState(styles.inactiveButton);
  const [upcomingText, setUpcomingText] = useState(styles.activeText);
  const [popularText, setPopularText] = useState(styles.inactiveText);
  const [topRatedText, setTopRatedText] = useState(styles.inactiveText);

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
          style={upcomingButton}
          onPress={() => {
            tmdbApi("upcoming");
            setUpcomingButton(styles.activeButton);
            setPopularButton(styles.inactiveButton);
            setTopRatedButton(styles.inactiveButton);
            setUpcomingText(styles.activeText);
            setPopularText(styles.inactiveText);
            setTopRatedText(styles.inactiveText);
            listRef.scrollToOffset({ offset: 0 });
          }}
        >
          <Text style={upcomingText}>Upcoming</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={popularButton}
          onPress={() => {
            tmdbApi("popular");
            setUpcomingButton(styles.inactiveButton);
            setPopularButton(styles.activeButton);
            setTopRatedButton(styles.inactiveButton);
            setUpcomingText(styles.inactiveText);
            setPopularText(styles.activeText);
            setTopRatedText(styles.inactiveText);
            listRef.scrollToOffset({ offset: 0 });
          }}
        >
          <Text style={popularText}>Popular</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={topRatedButton}
          onPress={() => {
            tmdbApi("top_rated");
            setUpcomingButton(styles.inactiveButton);
            setPopularButton(styles.inactiveButton);
            setTopRatedButton(styles.activeButton);
            setUpcomingText(styles.inactiveText);
            setPopularText(styles.inactiveText);
            setTopRatedText(styles.activeText);
            listRef.scrollToOffset({ offset: 0 });
          }}
        >
          <Text style={topRatedText}>Top Rated</Text>
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
