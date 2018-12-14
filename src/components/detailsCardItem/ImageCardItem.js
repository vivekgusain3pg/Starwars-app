/**
 * Project - StarwasApp
 * Created by vivekgusain on 9/12/18
 */

import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { CardItem } from "native-base";

const imageCardItem = props => {
    const randomImages = [
        require('../../../resources/images/planets/planet-1.jpg'),
        require('../../../resources/images/planets/planet-2.jpg'),
        require('../../../resources/images/planets/planet-3.jpg'),
        require('../../../resources/images/planets/planet-4.jpg')
    ];

    return (
        <CardItem cardBody>
            <Image
                style={styles.image}
                source={props.imageSource ? props.imageSource : randomImages[Math.floor(Math.random()*randomImages.length)]}
            />
        </CardItem>
    )
};

const styles = StyleSheet.create({
    image: {
        flex: 1,
        height: 200,
        width: null
    }
});

export default imageCardItem;
