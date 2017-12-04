import React, { Component } from 'react';
import { Dimensions, TouchableOpacity, Image, View, Text, TextInput, StyleSheet } from 'react-native';
import { ImagePicker } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Spinner from 'react-native-loading-spinner-overlay';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation'
import { addItem } from 'actions/ItemActions';

class ItemForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      image: null,
      loading: false
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
    const { user, addItem } = this.props;
    const { auctionId } = this.props.navigation.state.params;
    const { navigate } = this.props.navigation;
    const { title, description, image } = this.state;
    this.setState({ loading: true });
    addItem({
      owner: user.uid,
      auction: auctionId,
      description,
      title,
      image
    }, () => {
      setTimeout(
        () => {
          this.setState({ loading: false });
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
      <View style={styles.container}>
        <Spinner visible={this.state.loading} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
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
        <KeyboardSpacer />
        <TouchableOpacity
          onPress={() => this._submit()}
        >
          <View
            style={styles.submitButton} >
            <Text style={styles.submitText}>
              SUBMIT
            </Text>
          </View>
        </TouchableOpacity>
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
});

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    addItem
  }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemForm);
