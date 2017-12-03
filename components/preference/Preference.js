import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getItems } from 'actions/ItemActions';
import { getPreference, setPreference } from 'actions/PreferenceActions';
import SortableGrid from 'react-native-sortable-grid'
import PreferenceCard from 'components/preference/PreferenceCard';

class Preference extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetching: true
    };
  }

  componentWillMount() {
    const { getItems, getPreference, user } = this.props;
    const { auctionId } = this.props.navigation.state.params;
    getPreference(
      { auction: auctionId, owner: user.uid },
      () => this.setState({ fetching: false }));
    getItems(auctionId);
  }

  componentWillReceiveProps(nextProps) {
    const {
      getItems, getPreference, setPreference,
      user, preferences, items
    } = nextProps;
    const { auctionId } = nextProps.navigation.state.params;
    if (this.state.fetching || this._isEmpty(items) || this._isEmpty(items[auctionId])) {
      return;
    }
    const itemKeys = Object.keys(items[auctionId]);

    if (this._isEmpty(preferences)
        || this._isEmpty(preferences[auctionId])) {
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
    return (
      JSON.stringify(this.props.preferences) !== JSON.stringify(nextProps.preferences)
      || JSON.stringify(this.props.items) !== JSON.stringify(nextProps.items)
    );
  }

  _isEmpty(obj) {
    if (!obj) { return true; }
    return (obj.constructor === Object && Object.keys(obj).length === 0);
  }

  _getCardColor(item) {
    const { user } = this.props;
    if (item && item.owner === user.uid) {
      return 'steelblue';
    }
    return 'lightgray';
  }

  _renderPreferenceCards() {
    const { user, items, preferences } = this.props;
    const { auctionId } = this.props.navigation.state.params;
    const { navigate } = this.props.navigation;

    if (this._isEmpty(items)
        || this._isEmpty(items[auctionId])
        || this._isEmpty(preferences)
        || this._isEmpty(preferences[auctionId])
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
    console.log(orderedItems);
    const cards = [];
    for (entry of orderedItems.entries()) {
      const prefLevel = entry[0];
      const itemId = entry[1];
      cards.push(
        <PreferenceCard
          onTap={() => navigate('ItemView', { item: auctionItems[itemId] })}
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

  render() {
    const { auctionId } = this.props.navigation.state.params;
    const { auctions } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            Preferences for {auctions[auctionId].title}
          </Text>
        </View>
        <View style={styles.contentContainer}>
          <SortableGrid
            itemWidth={80}
            onDragRelease={itemOrder => this._onDragRelease(itemOrder)}
          >
            {this._renderPreferenceCards()}
          </SortableGrid>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    margin: 20
  },
  titleContainer: {
    borderBottomWidth: 2.5,
    paddingVertical: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold'
  },
  contentContainer: {
    marginTop: 15
  }
});

const mapStateToProps = state => {
  return {
    user: state.user,
    items: state.items,
    preferences: state.preferences,
    auctions: state.auctions
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
