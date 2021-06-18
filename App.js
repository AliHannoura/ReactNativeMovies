import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import MoviesList from "./src/screens/MoviesList";
import MovieDetail from "./src/screens/MovieDetail";

const navigator = createStackNavigator(
  {
    Movies: MoviesList,
    Details: MovieDetail,
  },
  {
    initialRouteName: "Movies",
  }
);

export default createAppContainer(navigator);
