import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../../actions/index.js'
import { Text, View, TouchableHighlight, StyleSheet } from 'react-native';
import * as AppSetting from '../../config/appSetting'
import Loading from './loading'
import * as LinkHelper from '../../lib/linkHelper'
class MatchLink extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }
    componentDidMount() {
        this.props.getMatchLinkInfo(this.props.selectedMatch);
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ isLoading: false })
    }

    _onPressLink = (link) => {
        return LinkHelper.openAceStream(link.ace)

    }

    _renderLink = (link, index) => {
        return (
            <View key={"ma_" + index} style={{
                height: 160,
                width: 160,
                flexShrink: 1,
                backgroundColor: '#FF7535',
                margin: 2,
                alignItems: 'center',
                justifyContent: 'center'

            }}>
                <TouchableHighlight onPress={() => this._onPressLink(link)} key={"link_" + index} style={{

                }}>
                    <Text style={[
                        { color: '#FFFFFF', alignSelf: 'center', textAlign: 'center' },
                        this.props.matchLinkIndex === index && styles.highLightLink
                    ]}>{link.lable} {index}</Text>
                </TouchableHighlight>
            </View>
        )
    }
    render() {
        let items = this.props.matchLinkInfo && this.props.matchLinkInfo.map((x, index) => {
            return this._renderLink(x, index)
        });
        const loading = this.state.isLoading && (<Loading />);
        return (
            <View style={{
                flex: 1, flexDirection: 'column', alignItems: 'flex-start',
                justifyContent: 'center', flexWrap: 'wrap'
            }}>
                {loading}
                {items}
            </View>
        );
    }
}
const styles = StyleSheet.create({

    highLightLink:
        {
            fontWeight: 'bold',
            fontSize: 22,

        }

});
function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {

    return {
        selectedMatch: state.selectedMatch,
        matchLinkInfo: state.matchLinkInfo,
        matchLinkIndex: state.matchLinkIndex
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(MatchLink);