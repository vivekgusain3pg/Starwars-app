/**
 * Project - StarwasApp
 * Created by vivekgusain on 9/12/18
 */

import React, {Component} from 'react';
import {FlatList, Alert, StyleSheet, View, AsyncStorage} from 'react-native';
import {Header, Item, Input, Icon, Card, CardItem, Body, Text} from 'native-base';
import BaseComponent from '../components/BaseComponent';
import search_background from '../../resources/images/search_background.jpeg';
import MainActivityIndicator from '../components/MainActivityIndicator';

type Props = {};
export default class SearchPlanets extends Component<Props> {
    constructor(props){
        super(props);

        this.state = {
            username: "",
            isLoading: false,
            search: {
                disableSearchBar: false,
                searchesPerMinute: 0
            },
            data: {
                planets: []
            },
            minPopulation: 0,
            maxPopulation: 0
        };
    }

    _setUsername = async () => {
        const userName = await AsyncStorage.getItem('userName');
        this.setState({username : userName});
    };

    _logoutHandler = async () => {
       await AsyncStorage.removeItem('userName');
       this.props.navigation.navigate('AuthLoading')
    };

    componentDidMount() {
        this._setUsername();
        this.interval = setInterval(() => {
            const searchBarWasDisabled = this.state.search.disableSearchBar;
            this.updatedisableSearchBarState(true, () => {
                if (searchBarWasDisabled) {
                    const title = 'Search has been enabled';
                    const message = 'You can make 5 consecutive searches in a minute.';
                    Alert.alert(title, message);
                }
            });
        }, 60000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    toggleIsLoadingState = () => {
        this.setState(previousState => {
            return {
                isLoading: !previousState.isLoading
            }
        });
    };

    flatListOnEndReachedHandler = () => {
        if (this.state.data.nextUrl !== '') {
            this.fetchData(this.state.data.nextUrl).then((data) => {
                this.updateDataState(data, false);
            }).catch(error => console.log('Error:', error));
        }
    };

    fetchData = (url) => {
        return fetch(url).then(response => {
            return response.json();
        }).then(responseJson => {
            return responseJson
        }).catch(error => console.log('Error fetching data:', error));
    };

    searchInputOnChangeTextHandler = (searchStr) => {
        if (searchStr !== '') {
            if (this.state.username !== ('Luke Skywalker').toLowerCase()) {
                this.updatedisableSearchBarState(false, () => {
                    if (this.state.search.disableSearchBar) {
                        const title = 'Search limit exceeded!!!';
                        const message = 'You have made 5 searches in less than a minute, search will be enabled soon.';
                        alert(title, message);
                    }
                });
            }
            let url = `https://swapi.co/api/planets/?search=${searchStr}`;
            this.toggleIsLoadingState();
            this.fetchData(url).then((data) => {
                this.updateDataState(data, true);
                this.toggleIsLoadingState();
            }).catch((error) => {
                console.log('Error:', error);
                this.toggleIsLoadingState();
            });
        } else {
            this.updateDataState({next: '', results: []}, true);
        }
    };

    cardItemOnPressHandler = (item) => {
        this.props.navigation.navigate('PlanetDetails',{item:item})
    };

    updatedisableSearchBarState = (overwrite, callback) => {
        this.setState(previousState => {
            return {
                search: {
                    disableSearchBar: !overwrite && previousState.search.searchesPerMinute + 1 === 5,
                    searchesPerMinute: !overwrite ? previousState.search.searchesPerMinute + 1 : 0
                }
            }
        }, () => callback());
    };

    updateDataState = (data, overwrite) => {
        this.setState(previousState => {
            const nextUrl = data.next;
            const planets = this.getFilteredPlanetsArray(previousState.data.planets , data.results, overwrite);
            const planetPopulations = this.getPopulationNumbersArray(planets);
            return {
                data: {
                    nextUrl: nextUrl ? nextUrl : '',
                    planets: planets
                },
                minPopulation: planetPopulations.length ? Math.min(...planetPopulations): 0,
                maxPopulation: planetPopulations.length ? Math.max(...planetPopulations): 0
            }
        });
    };

    getFilteredPlanetsArray = (previousStatePlanetsData, planetsData, overwrite) => {
        let planets = planetsData;
        if (overwrite === false) {
            const allPlanets = previousStatePlanetsData.concat(planetsData);
            const planetNames = allPlanets.map(planet => planet.name);
            planets = allPlanets.filter((planet, index) => {
                return planetNames.indexOf(planet.name) === index;
            });
        }
        return planets;
    };

    getPopulationNumbersArray = (planets) => {
        return planets.map(planet => planet.population)
            .filter((stringPopulation) => stringPopulation !== 'unknown')
            .map((stringPopulation) => parseInt(stringPopulation));
    };

    getTextFontSize = (population) => {
        const minFontSize = 16;
        const maxFontSize = 40;
        let textFontSize = minFontSize;
        if(typeof population !== 'unknown')
        {
            const numerator = (parseInt(population) - this.state.minPopulation) * (maxFontSize - minFontSize);
            const denominator = this.state.maxPopulation - this.state.minPopulation;
            textFontSize = Math.round(minFontSize + numerator / denominator);
        }
        return textFontSize;
    };

    render(){
        let content = null;

        if (this.state.isLoading) {
            content = (
                <MainActivityIndicator />
            );
        } else {
            content = (
                <FlatList
                    data={this.state.data.planets}
                    keyExtractor={item => item.name}
                    renderItem={({item}) => (
                        <Card>
                            <CardItem button onPress={() => this.cardItemOnPressHandler(item)}>
                                <Body>
                                <Text style={{fontSize: this.getTextFontSize(item.population)}}>
                                    {item.name}
                                </Text>
                                </Body>
                            </CardItem>
                        </Card>
                    )}
                    onEndReachedThreshold={0.2}
                    onEndReached={this.flatListOnEndReachedHandler}
                />
            );
        }

        return(
            <BaseComponent imageBackgroundSource={search_background}>
                <Header transparent searchBar rounded>
                    <Item>
                        <Icon name="ios-search" />
                        <Input placeholder="Search Planets" onChangeText={this.searchInputOnChangeTextHandler}
                               autoCapitalize='none'
                               autoCorrect={false}
                               disabled={this.state.search.disableSearchBar} />
                    </Item>
                </Header>
                <Text style={{textAlign: "right", marginRight: 10, fontSize: 15, fontWeight: 'bold', color: 'white'}}
                      onPress={this._logoutHandler}>Logout</Text>
                <View style={this.state.isLoading ? styles.content : styles.flatListContainer}>
                    {content}
                </View>
            </BaseComponent>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    flatListContainer: {
        padding: 20
    }
});