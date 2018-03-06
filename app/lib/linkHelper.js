import { Linking } from 'react-native';
import * as AppSetting from '../config/appSetting'
export const openAceStream = (link) => {
    Linking.canOpenURL(link).then(supported => {
        if (!supported) {
            Linking.openURL(
                AppSetting.AceStreamPlayStoreUrl
            );
        } else {
            return Linking.openURL(link);
        }
    }).catch((err) => {

        alert("An error occurred");
    });
}
export const openLink = (link) => {
    Linking.canOpenURL(link).then(supported => {
        if (supported) {
            return Linking.openURL(link);
        } else {
            alert("Sorry! We have not support to view this video yet.");
        }
    }).catch((err) => {

        alert("An error occurred");
    });
}

