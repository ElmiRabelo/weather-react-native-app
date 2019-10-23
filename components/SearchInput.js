import React, { Component } from "react";
import PropTypes from "prop-types";

import { View, TextInput, StyleSheet } from "react-native";

class SearchInput extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };
  }

  handleChangeText = text => {
    this.setState({ text });
  };

  handleSubmitEditing = () => {
    const { onSubmit } = this.props;
    const { text } = this.state;

    if (!text) return;

    onSubmit(text);
    this.setState({ text: "" });
  };

  render() {
    const { placeholder } = this.props;
    const { text } = this.state;
    return (
      <View style={styles.container} behavior="padding">
        <TextInput
          autoCorrect={false}
          placeholder={placeholder}
          placeholderTextColor="white"
          style={styles.textInput}
          clearButtonMode="always"
          underlineColorAndroid="transparent"
          value={text}
          onChangeText={this.handleChangeText}
          onSubmitEditing={this.handleSubmitEditing}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#666",
    color: "white",
    height: 40,
    width: 300,
    marginTop: 20,
    marginHorizontal: 40,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignSelf: "center"
  },
  textInput: {
    flex: 1,
    color: "white"
  }
});
export default SearchInput;
