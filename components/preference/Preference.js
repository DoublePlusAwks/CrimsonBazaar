import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getItems } from 'actions/ItemActions';
import SortableGrid from 'react-native-sortable-grid'
import PreferenceCard from 'components/preference/PreferenceCard';

const GREEN = '#4CAF50';
const RED = '#F44336';
const GRAY = '#9E9E9E';

class Preference extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { auctionId } = this.props.navigation.state.params;
    this.props.getItems(auctionId);
  }

  _renderPreferenceCards() {
    const { items } = this.props;
    const { auctionId } = this.props.navigation.state.params;
    if (!items[auctionId]) {
      return [];
    }
    const auctionItems = items[auctionId];
    return Object.keys(auctionItems).map(
      key => {
        return (
          <PreferenceCard
            onTap={() => console.log(key)}
            key={key}
            item={auctionItems[key]}
            color="#8BC34A"
          />
        );
      }
    );
  }

  render() {
    const { auctionId } = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <SortableGrid>
          {this._renderPreferenceCards()}
        </SortableGrid>
      </View>
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
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    getItems
  }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Preference);
