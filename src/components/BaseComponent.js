/**
 * Project - StarwasApp
 * Created by vivekgusain on 9/12/18
 */

import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { Container } from 'native-base';

const baseComponent = props => (
    <Container>
        <ImageBackground style={styles.imageBackground} source={props.imageBackgroundSource}>
            {props.children}
        </ImageBackground>
    </Container>
);

const styles = StyleSheet.create({
    imageBackground: {
        flex: 1,
        width: '100%'
    }
});

export default baseComponent;