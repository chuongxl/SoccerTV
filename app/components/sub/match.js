import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../../actions/index.js'
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import * as setting from '../../config/appSetting'
class Match extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }
    _matchSelect(url) {
        if (url) {

            this.props.setMatchLink(url);
        } else {
            alert("Please refresh to update match info");
        }
    }

    render() {
        let matchColor = this.props.data.url ? '#008748' : '#0d0d0d';
        let keyIndex = this.props.num;

        let isSelected = this.props.matchIndex === keyIndex;

        if (this.props.matchIndex > setting.NumOfItemPerMatchView) {
            isSelected = (this.props.matchIndex % setting.NumOfItemPerMatchView) === keyIndex
        }

        return (
            <TouchableHighlight underlayColor="#242B33" style={{ borderColor: '#527CA8', borderTopWidth: 0.8 }}
                onPress={() => this._matchSelect(this.props.data.url)} >
                <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'flex-start', flexDirection: 'row' }}>
                    <View style={{ flexBasis: '30%', height: 40 }}>
                        <Text style={[{ marginLeft: 5, color: '#0d0d0d' },
                        isSelected && styles.highLightMatch
                        ]}>
                            {this.props.data.league}
                        </Text>
                    </View>
                    <View style={{ flexBasis: '10%', height: 40 }}>
                        <Text style={[{ color: 'red' },
                        isSelected && styles.highLightMatch
                        ]}>
                            {this.props.data.time}
                        </Text>
                    </View>
                    <View style={{
                        flexBasis: '60%', height: 40, flex: 1, flexDirection: 'row',
                        alignItems: 'stretch', justifyContent: 'flex-start'
                    }}>
                        <Text style={[{ color: matchColor, flexBasis: '45%' },
                        isSelected && styles.highLightMatch
                        ]
                        }>
                            {this.props.data.home}
                        </Text>
                        <Text style={{ flexBasis: '10%', color: 'red' }}>VS</Text>
                        <Text style={[{ color: matchColor, flexBasis: '45%' },
                        isSelected && styles.highLightMatch
                        ]}>
                            {this.props.data.away}
                        </Text>
                    </View>

                </View>
            </TouchableHighlight>
        );
    }
}
const styles = StyleSheet.create({

    highLightMatch:
        {
            fontWeight: 'bold',
            fontSize: 18,

        }

});
function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
    return {
        matchIndex: state.matchIndex
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Match);