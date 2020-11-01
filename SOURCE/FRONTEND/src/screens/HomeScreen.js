import React, {
    Component
} from 'react';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Linking

} from 'react-native';
import reactotron from 'src/ReactotronConfig';
import axios from "axios";
import *as API from '@constants/Api'


export default class HomeScreen extends Component {
    render() {
        return (
            <View>
                <TouchableOpacity
                    onPress={() => {

                        API.requestGetUserInfo()

                        // var url = process.env.NODE_ENV !== "production"  ?
                        // 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/autocomplete/json?input=ha%20noi&key=AIzaSyDMw3EgsWHTOExuSV2xzt2xGSKGHR9VZMQ&language=vi&components=country:vn':
                        // "https://maps.googleapis.com/maps/api/place/autocomplete/json?input=ha%20noi&key=AIzaSyDMw3EgsWHTOExuSV2xzt2xGSKGHR9VZMQ&language=vi&components=country:vn"
                        // fetch(url, {
                        //   method: 'GET',
                        //   headers:{
                        //     'X-Requested-With': 'XMLHttpRequest'
                        //   }
                        // }).then(res => res.json())
                        // .then(response => reactotron.log('Success:', response))
                        // .catch(error => reactotron.error('Error:', error));

                    }}
                >
                    <Text
                        style={{
                            fontSize: 60
                        }}
                    >click me</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
