import React, { Component } from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  TouchableOpacity,
  Image,
  View,
  Text,
  TextInput,
  StyleSheet
} from 'react-native';
import { ImagePicker } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation'
import { addItem } from 'actions/ItemActions';
import { setLoading } from 'actions/StatusActions';

class ItemForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      image: null,
    };
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      base64: true,
      quality: 0.3
    });

    if (!result.cancelled) {
      this.setState({ image: result });
    }
  }

  _submit() {
    const { user, addItem, setLoading } = this.props;
    const { auctionId } = this.props.navigation.state.params;
    const { navigate } = this.props.navigation;
    const { title, description, image } = this.state;
    setLoading(true);
    addItem({
      owner: user.uid,
      auction: auctionId,
      description,
      title,
      image
    }, () => {
      setTimeout(
        () => {
          setLoading(false);
          // https://github.com/react-community/react-navigation/issues/1127
          const resetAction = NavigationActions.reset({
            index: 1,
            key: null,
            actions: [
              NavigationActions.navigate({ routeName: 'Main' }),
              NavigationActions.navigate({ routeName: 'Preference', params: { auctionId } })
            ]
          });
          this.props.navigation.dispatch(resetAction);
        }, 2500);
      });

  }

  render() {
    const { title, description, image } = this.state;
    const { status } = this.props;
    var imgPlaceholder = <Ionicons name="md-camera" size={128} color="gray" />;
    if (image) {
      imgPlaceholder = (
        <Image
          source={{ uri: image.uri }}
          style={{ width: 200, height: 200 }}
        />
      );
    }
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
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
          <TouchableOpacity
            onPress={() => this._submit()}
            disabled={status.loading} >
            <View
              style={{
                ...styles.submitButton,
                backgroundColor: status.loading ?
                  '#B0C4DE' : 'steelblue' }} >
              <Text style={styles.submitText}>
                SUBMIT
              </Text>
            </View>
          </TouchableOpacity>
          <KeyboardSpacer />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

var { height, width } = Dimensions.get('window');

const styles = {
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
  },
  submitButton: {
    height: 40,
    width: width * 0.9,
    backgroundColor: 'steelblue',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitText: {
    color: 'white',
    fontWeight: 'bold'
  }
};

const mapStateToProps = state => {
  return {
    user: state.user,
    status: state.status
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    addItem,
    setLoading
  }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemForm);
