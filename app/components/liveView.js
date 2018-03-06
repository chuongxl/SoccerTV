import React from 'react';
import { Text, View, SectionList, TouchableHighlight, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions/index.js'
import Match from './sub/match.js'
import MatchLink from './sub/matchLink'
import Loading from './sub/loading'
import * as AppSetting from '../config/appSetting.js';

class LiveView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
  }
  componentDidMount() {
    this.props.getLiveMatchs(AppSetting.LiveMatchUrl);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ isLoading: false })
  }
  _renderHeaderSection = (item) => {
    return (
      <View Key={"sh_" + item.key} style={{ backgroundColor: '#527CA8', paddingTop: 3, paddingBottom: 3, paddingLeft: 3 }}>
        <Text style={{ color: '#fff' }}>
          {item.title}
        </Text>
      </View>
    )
  };
  _keyExtractor = (item, index) => "m" + index;
  render() {
    const sectionData = this.props.liveMatchs.map((x, index) =>
      Object.assign({}, {
        data: x.matchs.filter((y, dx) =>
          this.props.matchIndex > AppSetting.NumOfItemPerMatchView ?
            dx >= this.props.matchIndex - (this.props.matchIndex % AppSetting.NumOfItemPerMatchView)
            : dx >= 0
        ),
        title: x.livedate, key: "sc_" + index
      })
    );

    const loadingElement = this.state.isLoading && (<Loading />);

    const dataGrid = this.props.liveMatchs && this.props.liveMatchs.length > 0 &&
      (

        <SectionList
          style={{ backgroundColor: '#FFF' }}
          renderSectionHeader={({ section }) => this._renderHeaderSection(section)}
          renderItem={({ item, index }) => <Match data={item} num={index} />}
          sections={sectionData}
          keyExtractor={this._keyExtractor}
        />
      );
    return (this.props.selectedMatch ? <MatchLink /> :

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',flexDirection:'column' }}>
        <View>
          {loadingElement}
          {dataGrid}
        </View>
      </View>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    liveMatchs: state.liveMatchs,
    selectedMatch: state.selectedMatch,
    matchIndex: state.matchIndex
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(LiveView);