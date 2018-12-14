/**
 * Project - StarwasApp
 * Created by vivekgusain on 12/12/18
 */

import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import SearchPlanets from "./screens/SearchPlanets";
import PlanetDetails from "./screens/PlanetDetails";
import LoginScreen from "./screens/LoginScreen";
import AuthLoadingScreen from "../src/screens/AuthLoadingScreen"

const AppStack = createStackNavigator({
    SearchPlanets: {
        screen: SearchPlanets,
        navigationOptions: {
            header: null
        }
    },
    PlanetDetails: {
        screen: PlanetDetails,
        navigationOptions: {
            header: null
        }
    }
});

const AuthStack = createStackNavigator({
    Login: {
        screen: LoginScreen,
        navigationOptions: {
            header: null
        }
    }
});

export default createAppContainer(createSwitchNavigator(
    {
        AuthLoading: AuthLoadingScreen,
        App: AppStack,
        Auth: AuthStack,
    },
    {
        initialRouteName: 'AuthLoading',
    }
));