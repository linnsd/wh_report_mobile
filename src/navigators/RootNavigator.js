import { createAppContainer, createSwitchNavigator } from "react-navigation";

import RoutesApp from "../../src/routes/route_apps";
import Login from '@screens/account/Login';
export default createAppContainer(
  createSwitchNavigator(
    {
      RoutesApp: {
        screen: RoutesApp,
      },
    },
    {
      initialRouteName: "RoutesApp",
    }
  )
);
