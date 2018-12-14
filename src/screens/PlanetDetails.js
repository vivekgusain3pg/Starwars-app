/**
 * Project - StarwasApp
 * Created by vivekgusain on 9/12/18
 */

import React, {Component} from 'react';
import { StyleSheet } from 'react-native';
import { Content, Card } from "native-base";

import BaseComponent from '../components/BaseComponent';
import MainActivityIndicator from '../components/MainActivityIndicator';
import DetailsCardItem from '../components/detailsCardItem/DetailsCardItem';
import Planet_Details_Background from '../../resources/images/planet_details.jpg'

export default class PlanetDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            data: {
                planet: this.props.navigation.state.params.item,
                residents: [],
                films: []
            }
        }
    }

    componentDidMount() {
        this.fetchRelevantData();
    }

    fetchRelevantData = () => {
        const promiseArray = [];
        const residents = this.state.data.planet.residents;
        const films = this.state.data.planet.films;
        const urls = residents.concat(films);

        urls.map(url => {
            promiseArray.push(this.fetchData(url));
        });

        Promise.all(promiseArray).then((data) => {
            this.updateDataState(data);
            this.toggleIsLoadingState();
        }).catch(error => console.log('Error:', error));
    };

    fetchData = (url) => {
        return fetch(url).then(response => {
            return response.json();
        }).then(responseJson => {
            console.log('Response: ', responseJson);
            return responseJson
        }).catch(error => console.log('Error fetching data:', error));
    };

    toggleIsLoadingState = () => {
        this.setState(previousState => {
            return {
                ...previousState,
                isLoading: !previousState.isLoading
            }
        });
    };

    updateDataState = (data) => {
        const residents = data.filter((item) => {
            return item.url.includes('people');
        });
        const films = data.filter((item) => {
            return item.url.includes('films');
        });

        this.setState(previousState => {
            return {
                data: {
                    ...previousState.data,
                    residents: residents,
                    films: films
                }
            }
        });
    };

    render() {
        console.log('State:', this.state);
        let content = null;

        if (this.state.isLoading) {
            content = (
                <MainActivityIndicator />
            );
        } else {
            content = (
                <Card>
                    <DetailsCardItem
                        cardItemContentType='planet'
                        cardItemHeaderText='Planet Details'
                        cardItemContent={this.state.data.planet}
                    />
                    <DetailsCardItem
                        cardItemContentType='person'
                        cardItemHeaderText={`Residents(${this.state.data.residents.length})`}
                        cardItemContent={this.state.data.residents}
                    />
                    <DetailsCardItem
                        cardItemContentType='film'
                        cardItemHeaderText={`Films(${this.state.data.films.length})`}
                        cardItemContent={this.state.data.films}
                    />
                </Card>
            );
        }

        return (
            <BaseComponent imageBackgroundSource={Planet_Details_Background}>
                <Content padder contentContainerStyle={this.state.isLoading ? styles.content : {}}>
                    {content}
                </Content>
            </BaseComponent>
        );
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: 90
    }
});