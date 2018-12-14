/**
 * Project - StarwasApp
 * Created by vivekgusain on 9/12/18
 */

import React from 'react';
import { CardItem, Text, Body } from "native-base";

const filmDetailsCardItem = props => (
    <CardItem bordered>
        <Body>
        <Text> Title: {props.data.title} </Text>
        <Text> Episode ID: {props.data.episode_id} </Text>
        <Text> Director: {props.data.director} </Text>
        <Text> Producer: {props.data.producer} </Text>
        <Text> Release Date: {props.data.release_date} </Text>
        </Body>
    </CardItem>
);

export default filmDetailsCardItem;
