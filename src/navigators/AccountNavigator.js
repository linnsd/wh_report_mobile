import { createAppContainer, createSwitchNavigator } from "react-navigation";

import Login from '@screens/account/Login';
import RoutesApp from "../../src/routes/route_apps";


export default createAppContainer(
    createSwitchNavigator(
        {
            Login:{
                screen:Login
            },
           
            RoutesApp:{
              screen:RoutesApp
            },
        },
        {
            initialRouteName:"Login"
        }
    )
)