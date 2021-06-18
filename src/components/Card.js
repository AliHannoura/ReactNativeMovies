import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
import { withNavigation } from "react-navigation";
import moment from "moment";

import Genres from "./Genres";

const screenHeight = Dimensions.get("window").height;

const Card = (props) => {
  return (
    <View style={styles.item}>
      <Image style={styles.pic} source={{ uri: props.poster }} />
      <View style={styles.info}>
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate("Details", {
              id: props.movieId,
              posterUrl: props.poster,
              title: props.movieTitle,
              rating: props.vote,
              detailsOverview: props.overview,
              detailsGenres: props.genres,
            })
          }
        >
          <Text style={styles.title}>{props.movieTitle}</Text>
        </TouchableOpacity>
        <Text style={styles.date}>
          {moment(props.releaseDate).format("MMMM D, YYYY")}
        </Text>
        <Genres genresArray={props.genres} genresPadding={"5%"} />
      </View>
      <Text style={styles.rating}>{props.vote}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    padding: "3%",
    backgroundColor: "white",
    marginHorizontal: "4%",
    marginVertical: "1%",
    borderRadius: 20,
    height: screenHeight / 4,
  },
  info: {
    width: "45%",
    marginHorizontal: "4%",
    justifyContent: "space-between",
  },
  pic: {
    alignSelf: "flex-start",
    height: "100%",
    width: "35%",
    borderRadius: 10,
  },
  title: {
    color: "dimgrey",
    fontSize: 17,
    fontWeight: "bold",
    marginHorizontal: "5%",
  },
  date: {
    color: "grey",
    fontSize: 12,
    fontWeight: "bold",
    marginHorizontal: "5%",
  },
  rating: {
    color: "limegreen",
    alignSelf: "flex-end",
    marginRight: "5%",
    fontSize: 17,
    fontWeight: "bold",
  },
});

export default withNavigation(Card);
