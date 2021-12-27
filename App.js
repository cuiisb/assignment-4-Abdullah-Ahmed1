import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Button,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

function WorldStatisticsScreen({ navigation }) {
  const [confirmedCases, setConfirmedCases] = useState();
  const [worldPopulation, setWorldPopulation] = useState();
  React.useEffect(() => {
    fetch("https://covid-19-data.p.rapidapi.com/totals", {
      method: "GET",
      headers: {
        "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
        "x-rapidapi-key": "7333042294mshccf262fd41bdb78p1daf5ajsn155b40f9549c",
      },
    })
      .then((response) => response.json())
      .then((res) => {
        setConfirmedCases(res[0].confirmed);
        console.log("data", res[0].confirmed);
      })
      .catch((error) => {
        console.error(error);
      });

    //--------------------------------------------------------------------
    fetch("https://world-population.p.rapidapi.com/worldpopulation", {
      method: "GET",
      headers: {
        "x-rapidapi-host": "world-population.p.rapidapi.com",
        "x-rapidapi-key": "7333042294mshccf262fd41bdb78p1daf5ajsn155b40f9549c",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("world population", responseJson);
        setWorldPopulation(responseJson.body.world_population);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Total Confirmed Cases: {confirmedCases}</Text>
      <Text>Total world population is : {worldPopulation}</Text>
    </View>
  );
}
function CountryStaticsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>this is country statistics screen</Text>
    </View>
  );
}

function FavoriteCountryScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}
const Drawer = createDrawerNavigator();

function App({ navigation }) {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="World Statistics Screen">
        <Drawer.Screen
          name="World Statistics"
          component={WorldStatisticsScreen}
        />
        <Drawer.Screen
          name="Country statistics"
          component={CountryStaticsScreen}
        />
        <Drawer.Screen
          name="Favorite Countries"
          component={FavoriteCountryScreen}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
