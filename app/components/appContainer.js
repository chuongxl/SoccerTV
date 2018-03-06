import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions/index.js'
import { StyleSheet, Text, View, TouchableHighlight, BackHandler, Alert } from 'react-native';
import LiveView from './liveView.js'
import * as AppSetting from '../config/appSetting.js';
import KeyEvent from 'react-native-keyevent';
import * as LinkHelper from '../lib/linkHelper'

class AppContainer extends Component {

    constructor(props) {
        super(props);

    }

    //up button
    _upButton() {
        if (this.props.selectedMatch) {
            if (this.props.matchLinkInfo && this.props.matchLinkInfo.length > 0
                && this.props.matchLinkIndex > 0) {
                var linkIndex = parseInt(this.props.matchLinkIndex - 1);
                this.props.setMatchLinkIndex(linkIndex);
            }
        } else {
            if (this.props.liveMatchs.length > 0 && this.props.matchIndex > 0) {
                var newIndex = parseInt(this.props.matchIndex - 1);
                this.props.setMatchIndex(newIndex);

            }
        }

    }

    //end up button
    //down button
    _downButton() {
        if (this.props.selectedMatch) {
            if (this.props.matchLinkInfo &&
                this.props.matchLinkIndex < this.props.matchLinkInfo.length - 1) {
                var linkIndex = parseInt(this.props.matchLinkIndex + 1);
                this.props.setMatchLinkIndex(linkIndex);
            }
        } else {
            if (this.props.liveMatchs.length > 0 &&
                this.props.matchIndex < this.props.liveMatchs[0].matchs.length - 1) {

                var newIndex = parseInt(this.props.matchIndex + 1);

                this.props.setMatchIndex(newIndex);
            }
        }
    }

    _selectButton() {
        if (this.props.selectedMatch) {
            if (this.props.matchLinkInfo && this.props.matchLinkInfo.length > 0 &&
                this.props.matchLinkIndex >= 0) {
                var item = this.props.matchLinkInfo[this.props.matchLinkIndex];
                if (item) {
                    LinkHelper.openAceStream(item.ace)
                }
            }
        } else {

            if (this.props.liveMatchs.length > 0 &&
                this.props.matchIndex >= 0 && this.props.liveMatchs[0].matchs.length > 0) {
                var item = this.props.liveMatchs[0].matchs[this.props.matchIndex];
                if (item) {
                    if (item.url) {
                        this.props.setMatchLink(item.url);
                    } else {
                        alert("Please refresh to update match info");
                    }

                }
            }
        }
    }
    componentDidMount() {

        // if you want to react to keyDown
        KeyEvent.onKeyDownListener((keyEvent) => {
            var code = keyEvent.keyCode;
            // var action = keyEvent.action;
            switch (code) {
                case AppSetting.KeyDown:
                    this._downButton();
                    break;
                case AppSetting.KeyUp:
                    this._upButton();
                    break;
                case AppSetting.KeyLeft:
                    break;
                case AppSetting.KeyRight:
                    break;
                case AppSetting.KeySelect:
                case AppSetting.KeyEnter:
                    this._selectButton()
                    break;
            }
        });

        // if you want to react to keyUp
        KeyEvent.onKeyUpListener((keyEvent) => {
            //console.log(`onKeyUp keyCode: ${keyEvent.keyCode}`);
            //console.log(`Action: ${keyEvent.action}`);
        });

        // if you want to react to keyMultiple
        KeyEvent.onKeyMultipleListener((keyEvent) => {
            // console.log(`onKeyMultiple keyCode: ${keyEvent.keyCode}`);
            //console.log(`Action: ${keyEvent.action}`);
            //console.log(`Characters: ${keyEvent.characters}`);
        });

    }
    _backpress() {
        if (this.props.selectedMatch) {
            this.props.getLiveMatchs(AppSetting.LiveMatchUrl);
            this.props.setMatchLink(null);
        } else {
            Alert.alert(
                'Soccer TV',
                'Do you want to close this app Or Reload ?',
                [
                    { text: 'Reload', onPress: () => { 
                        this.props.getLiveMatchs(AppSetting.LiveMatchUrl);
                        this.props.setMatchIndex(0);
                        return false;
                       
                     }, style: 'cancel' },
                    { text: 'OK', onPress: () => BackHandler.exitApp() }
                ],
                {
                    onDismiss: () => { return true }
                },

            );
        }
    }

    componentWillMount() {
        var me = this;
        BackHandler.addEventListener('hardwareBackPress', function () {

            me._backpress();
            return true;
        });
    }

    componentWillUnmount() {

        // if you are listening to keyDown
        KeyEvent.removeKeyDownListener();
        // if you are listening to keyUp
        KeyEvent.removeKeyUpListener();
        // if you are listening to keyMultiple
        KeyEvent.removeKeyMultipleListener();

        BackHandler.removeEventListener('hardwareBackPress')
    }

    render() {

        return (
            <View style={styles.container}>
                <View style={[styles.content]}>
                    <LiveView />
                </View>
            </View >
        );
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#CCCCCC',
        alignItems: 'flex-start',
        justifyContent: 'center',
        flexDirection: 'row'

    },
    content:
        {
            alignItems: 'center',
            justifyContent: 'center',
        },
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
    return Object.assign({}, state);
}
export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);