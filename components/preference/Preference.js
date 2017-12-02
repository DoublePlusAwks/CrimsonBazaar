import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getItems } from 'actions/ItemActions';
import SortableGrid from 'react-native-sortable-grid'
import PreferenceCard from 'components/preference/PreferenceCard';

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
    return Object.keys(items).map(
      key => {
        return (
          <PreferenceCard
            key={key}
            item={items[key]}
            color="green"
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
  console.log(state);
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
