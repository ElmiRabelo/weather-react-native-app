import React, { Component, Fragment } from "react";
import {
  StyleSheet,
  Text,
  ImageBackground,
  View,
  KeyboardAvoidingView,
  ActivityIndicator,
  StatusBar,
  Platform
} from "react-native";

import getImageForWeather from "./utils/getImageForWeather";
import { fetchLocationId, fetchWeather } from "./utils/api";

import SearchInput from "./components/SearchInput";

class App extends Component {
  constructor() {
    super();
    this.state = {
      location: "",
      weather: "",
      temperature: 0,
      loading: false,
      error: false
    };
  }

  componentDidMount() {
    this.handleUpdateLocation("São Paulo");
  }

  handleUpdateLocation = async city => {
    if (!city) return;

    this.setState({ loading: true }, async () => {
      try {
        //Fetch com a weather api e obtendo os dados necessários para api, por fim, configurando state local.
        const locationId = await fetchLocationId(city);
        const { location, weather, temperature } = await fetchWeather(
          locationId
        );

        this.setState({
          loading: false,
          error: false,
          location,
          weather,
          temperature
        });
      } catch (err) {
        this.setState({ error: true, loading: false });
      }
    });
  };

  render() {
    const { location, weather, temperature, loading, error } = this.state;
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <StatusBar barStyle="light-content" />
        <ImageBackground
          source={getImageForWeather("Clear")}
          style={styles.imageContainer}
          imageStyle={styles.image}
        >
          <View style={styles.detailsContainer}>
            {error ? (
              <Text style={[styles.textStyle, styles.errorMessage]}>
                Houve um erro ao consultar essa cidade
              </Text>
            ) : (
              <Fragment>
                <Text style={[styles.largeText, styles.textStyle]}>
                  {location}
                </Text>
                <Text style={[styles.smallText, styles.textStyle]}>
                  {weather}
                </Text>
                <Text style={[styles.largeText, styles.textStyle]}>
                  {Math.round(temperature)}
                </Text>
              </Fragment>
            )}
            {!loading ? (
              <SearchInput
                placeholder="Search for a city"
                onSubmit={this.handleUpdateLocation}
              />
            ) : (
              <ActivityIndicator
                animating={loading}
                color="white"
                size="large"
              />
            )}
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#34495E"
  },
  imageContainer: {
    flex: 1
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
    paddingHorizontal: 20
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "cover"
  },
  textStyle: {
    textAlign: "center",
    fontFamily: Platform.OS === "ios" ? "AvenirNext-Regular" : "Roboto",
    color: "white"
  },
  largeText: {
    fontSize: 44
  },
  smallText: {
    fontSize: 18
  },
  errorMessage: {
    fontSize: 18,
    color: "#ff1021"
  }
});

export default App;
