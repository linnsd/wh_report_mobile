import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import DrawerMenu from "@components/shared/Menus/DrawerMenu";
import HomeScreen from "@screens/Home";
import CreateReport from "@screens/reports/CreateReport";
import DailyReport from "@screens/reports/DailyReport";
import ReportDetail from "@screens/reports/ReportDetail";
import FuelOrder from "@screens/reports/FuelOrder";
import OrderDetail from "@screens/reports/OrderDetail";
import ChangePassword from "@screens/account/ChangePassword";
import Logout from "@screens/account/Logout";
import Login from "@screens/account/Login";
import Language from "@screens/account/Language";
import Profile from "@screens/account/Profile";
import NotiList from "@screens/notification/NotiList";
import NotiDetail from "@screens/notification/NotiDetail";

const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();

function RoutesDrawerMenu() {
  return (
    <Drawer.Navigator
      drawerStyle={{ width: 300 }}
      overlayColor="#1F2430"
      drawerContent={(props) => <DrawerMenu {...props} />}
      screenOptions={{ headerShown: false }}
      initialRouteName="Home"
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="DailyReport" component={DailyReport} />
      <Drawer.Screen name="ReportDetail" component={ReportDetail} />
      <Drawer.Screen name="FuelOrder" component={FuelOrder} />
      <Drawer.Screen name="OrderDetail" component={OrderDetail} />
      <Drawer.Screen name="NotiList" component={NotiList} />
      <Drawer.Screen name="NotiDetail" component={NotiDetail} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Login" component={Login} />
    </Drawer.Navigator>
  );
}

export default function Home() {
  return (
    <Stack.Navigator
      initialRouteName="RoutesDrawerMenu"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="RoutesApp" component={RoutesDrawerMenu} />
      <Stack.Screen name="CreateReport" component={CreateReport} />
      <Stack.Screen name="DailyReport" component={DailyReport} />
      <Stack.Screen name="FuelOrder" component={FuelOrder} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="NotiList" component={NotiList} />
      <Stack.Screen name="Logout" component={Logout} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Language" component={Language} />
    </Stack.Navigator>
  );
}
