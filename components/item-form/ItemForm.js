import React, { Component } from 'react';
import { Dimensions, TouchableOpacity, Image, View, Text, TextInput, StyleSheet } from 'react-native';
import { ImagePicker } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import KeyboardSpacer from 'react-native-keyboard-spacer';

class ItemForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      image: '',
    };
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  }

  render() {
    const { title, description, image } = this.state;
    var imgPlaceholder = <Ionicons name="md-camera" size={128} color="gray" />;
    if (image) {
      imgPlaceholder = (
        <Image
          source={{ uri: image }}
          style={{ width: 200, height: 200 }}
        />
      );
    }
    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <TouchableOpacity
            onPress={() => this._pickImage()} >
            <View style={styles.imgContainer}>
              {imgPlaceholder}
            </View>
          </TouchableOpacity>
          <View style={styles.textInputContainer}>
            <View style={styles.textContainer}>
              <TextInput
                underlineColorAndroid="transparent"
                placeholder="What is it?"
                onChangeText={title => this.setState({ title })}
                value={title}
              />
            </View>
            <View style={styles.textContainer}>
              <TextInput
                underlineColorAndroid="transparent"
                placeholder="Description"
                style={styles.descriptionInput}
                multiline = {true}
                numberOfLines = {4}
                onChangeText={description => this.setState({ description })}
                value={description}
              />
            </View>
          </View>
        </View>
        <KeyboardSpacer/>
      </View>
    );
  }
}

var { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    margin: 20,
    flex: 1,
    alignItems: 'center'
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  imgContainer: {
    width: 200,
    height: 200,
    backgroundColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInputContainer: {
    flex: 1,
    alignItems: 'stretch',
    width: width * 0.9
  },
  textContainer: {
    marginHorizontal: 10,
    borderRadius: 1,
    marginTop: 10,
    borderWidth: 2,
    borderColor: 'lightgray'
  }
});

export default ItemForm;
