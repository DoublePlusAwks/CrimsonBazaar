import React, { Component } from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getItems } from 'actions/ItemActions';
import { getPreference, setPreference } from 'actions/PreferenceActions';
import SortableList from 'react-native-sortable-list';
import PreferenceCard from 'components/preference/PreferenceCard';

class Preference extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldUpdate: true
    };
  }

  componentWillMount() {
    const { getItems, getPreference, user } = this.props;
    const { auctionId } = this.props.navigation.state.params;
    getItems(auctionId);
    getPreference({ auction: auctionId, owner: user.uid });
  }

  componentWillReceiveProps(nextProps) {
    const {
      getItems, getPreference, setPreference,
      user, preferences, items
    } = nextProps;
    const { auctionId } = nextProps.navigation.state.params;

    const itemKeys = Object.keys(items[auctionId]);

    if (this._isEmptyObject(preferences)
        || this._isEmptyObject(preferences[auctionId])) {
      var preference = {};
      for (entry of itemKeys.entries()) {
        preference[entry[0]] = entry[1];
      }
      setPreference({
        auction: auctionId,
        owner: user.uid,
        preference
      });
    } else {
      preferenceKeys = Object.keys(preferences[auctionId]);
      let currPrefLen = preferenceKeys.length;
      if (preferenceKeys.length !== itemKeys.length) {
        const preference = preferences[auctionId];
        const preferredItems = {};
        for (itemId of Object.values(preferences[auctionId])) {
          preferredItems[itemId] = true;
        }
        for (itemId of itemKeys) {
          if (preferredItems[itemId] !== true) {
            preference[currPrefLen] = itemId;
            currPrefLen++;
          }
        }
        setPreference({
          auction: auctionId,
          owner: user.uid,
          preference
        });
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.shouldUpdate && JSON.stringify(this.props.preferences) !== JSON.stringify(nextProps.preferences);
  }

  _isEmptyObject(obj) {
    return obj.constructor === Object && Object.keys(obj).length === 0;
  }

  _getCardColor(item) {
    const { user } = this.props;
    if (item.owner === user.uid) {
      return 'steelblue';
    }
    return 'lightgray';
  }

  _renderPreferenceCards() {
    const { user, items, preferences } = this.props;
    const { auctionId } = this.props.navigation.state.params;
    if (!items[auctionId]
        || this._isEmptyObject(preferences)
        || this._isEmptyObject(preferences[auctionId])
        || Object.keys(preferences[auctionId]).length !== Object.keys(items[auctionId]).length) {
      return [];
    }
    const preference = preferences[auctionId];
    const orderedItems = [];
    const auctionItems = items[auctionId];
    let myItemPref = 0;
    Object.keys(preference).map(prefLevel => {
      const currItemId = preference[prefLevel];
      orderedItems[prefLevel] = currItemId;
    });
    const cards = [];
    console.log(myItemPref);
    for (entry of orderedItems.entries()) {
      const prefLevel = entry[0];
      const itemId = entry[1];
      cards.push(
        <PreferenceCard
          onTap={() => console.log(prefLevel)}
          key={itemId}
          item={auctionItems[itemId]}
          color={this._getCardColor(auctionItems[itemId])}
        />
      );
    }
    return cards;
  }

  _onDragRelease({ itemOrder }) {
    const { setPreference, user } = this.props;
    const { auctionId } = this.props.navigation.state.params;
    const preference = {};
    for (var i = 0; i < itemOrder.length; i++) {
      preference[i] = itemOrder[i].key;
    }
    setPreference({
      auction: auctionId,
      owner: user.uid,
      preference
    });
  }

  _renderRow({ key, index, data, disabled, active }) {
    const { user, items } = this.props;
    const { auctionId } = this.props.navigation.state.params;
    const auctionItems = items[auctionId];
    return (
      <PreferenceCard
        item={auctionItems[data]}
        color={this._getCardColor(auctionItems[data])}
      />
    );
  }

  _renderPrefList() {
    const { preferences, items } = this.props;
    const { auctionId } = this.props.navigation.state.params;
    let prefList = null;
    if (!items[auctionId]
        || this._isEmptyObject(preferences)
        || this._isEmptyObject(preferences[auctionId])
        || Object.keys(preferences[auctionId]).length !== Object.keys(items[auctionId]).length) {
      return prefList;
    } else {
      return (
        <SortableList
          data={preferences[auctionId]}
          renderRow={rowData => this._renderRow(rowData)}
          onChangeOrder={nextOrder => this._onChangeOrder(nextOrder)}
          onActivateRow={this.setState({ shouldUpdate: false })}
          onReleaseRow={this.setState({ shouldUpdate: true })}
        />
      );
    }
  }

  _onChangeOrder(nextOrder) {
    const { preferences, user, setPreference } = this.props;
    const { auctionId } = this.props.navigation.state.params;
    const newPreference = {};
    let prefLevel = 0;
    for (key of nextOrder) {
      newPreference[prefLevel] = preferences[auctionId][key];
      prefLevel++;
    }
    console.log(newPreference);
    setPreference({
      auction: auctionId,
      owner: user.uid,
      preference: newPreference
    });
  }

  render() {
    const { preferences } = this.props;
    const { auctionId } = this.props.navigation.state.params;
    console.log(preferences);
    const prefList = null;
    return (
      <ScrollView style={styles.container}>
        {this._renderPrefList()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject
  },
});

const mapStateToProps = state => {
  return {
    user: state.user,
    items: state.items,
    preferences: state.preferences
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    getItems,
    getPreference,
    setPreference
  }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Preference);
