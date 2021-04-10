/**
 * This is the Navigation Bar at the Bottom of the screen.
 * this is just temporarily (maybe)
 */

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";
import WeatherScreen from "../Weather/WeatherScreen";
import { createStackNavigator } from "@react-navigation/stack";


const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const ForecastStack = createStackNavigator();
const CalendarStack = createStackNavigator();
const NewsStack = createStackNavigator();
const appBackgroundColor = "#414141";

/**
 * Returns the rendering for the Navigation.
 */
export default function MainNavigation() {
    const colorScheme = useColorScheme();
    return (
        <Tab.Navigator
            initialRouteName="Home"
            tabBarOptions={
                {
                    activeTintColor: Colors[colorScheme].tint,
                    labelStyle:{
                        paddingBottom:5
                    }
                }
            }
        >
            <Tab.Screen
                name="Forecast"
                component={ForecastNavigator}
                options={{
                    tabBarLabel: "Forecast"
                }}
            />

            <Tab.Screen
                name="Home"
                component={HomeNavigator}
                options={{
                    tabBarLabel: "Home"
                }}
            />
            <Tab.Screen
                name="Calendar"
                component={CalendarStack}
                options={{
                    tabBarLabel: "Calendar",
                }}
            />
        </Tab.Navigator>
    );
}

/**
 * Navigator Stack for the HomeScreen.
 * @constructor
 */
function HomeNavigator() {
    return (
        <HomeStack.Navigator screenOptions={{
            cardStyle:{
                backgroundColor: appBackgroundColor
            }
        }
        }>
            <HomeStack.Screen
                name="HomeScreen"
                component={WeatherScreen}
                options={{ headerTitle: 'Good Morning',
                    headerTitleAlign: 'center',
                }}
            />
        </HomeStack.Navigator>
    );
}


/**
 * Navigator Stack for the Forecast Screen.
 * @constructor
 */
function ForecastNavigator() {
    return (
        <ForecastStack.Navigator screenOptions={{
            cardStyle:{
                backgroundColor: appBackgroundColor
            }
        }
        }>
            <ForecastStack.Screen
                name="Forecast"
                component={ForecastScreen}
                options={{ headerTitle: 'Weather Forecast',
                    headerTitleAlign: 'center',}}
            />
        </ForecastStack.Navigator>
    );
}

/**
 * Navigator Stack for the Calendar Screen.
 * @constructor
 */
function CalendarNavigator() {
    return (
        <CalendarStack.Navigator screenOptions={{
            cardStyle:{
                backgroundColor: appBackgroundColor
            }
        }
        }>
            <CalendarStack.Screen
                name="Calendar"
                component={CalendarScreen}
                options={{
                    headerTitle: 'Calendar',
                    headerTitleAlign: 'center',
                }}
            />
        </CalendarStack.Navigator>
    );
}

/**
 * Navigator Stack for the News Screen.
 * @constructor
 */
function NewsNavigator() {
    return (
        <NewsStack.Navigator screenOptions={{
            cardStyle:{
                backgroundColor: appBackgroundColor
            }
        }
        }>
            <NewsStack.Screen
                name="NewsScreen"
                component={TagsScreen}
                options={{
                    headerTitle: 'Your News',
                    headerTitleAlign: 'center',
                }}
            />
        </NewsStack.Navigator>
    );
}