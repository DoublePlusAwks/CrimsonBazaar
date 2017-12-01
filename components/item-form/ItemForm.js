import React, { Component } from 'react';
import { TouchableOpacity, Image, View, Text } from 'react-native';
import { ImagePicker } from 'expo';
import { Ionicons } from '@expo/vector-icons';

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
    const { image } = this.state;
    return (
      <View>
        <TouchableOpacity
          onPress={() => this._pickImage()}
        >
          <View>
            {image ?
              <Image
                source={{ uri: image }}
                style={{ width: 200, height: 200 }}
              />
              :
              <Ionicons name="md-camera" size={128} color="gray" />
            }
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default ItemForm;
