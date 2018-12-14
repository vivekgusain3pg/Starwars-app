/**
 * Project - StarwasApp
 * Created by vivekgusain on 9/12/18
 */

import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

const mainActivityIndicator = props => (
    <View style={styles.activityIndicatorContainer}>
        <ActivityIndicator size="large" color="white"/>
    </View>
);

const styles = StyleSheet.create({
    activityIndicatorContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    }
});

export default mainActivityIndicator;
