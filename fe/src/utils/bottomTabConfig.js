import ChatScreen from "../screens/ChatScreen/ChatScreen";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import DashboardScreen from "../screens/ManagerScreen/DashboardScreen";
import ManagerChatScreen from "../screens/ManagerScreen/ManagerChatScreen";
import ManagerHomeScreen from "../screens/ManagerScreen/ManagerHomeScreen";
import ManagerSettingsScreen from "../screens/ManagerScreen/ManagerSettingsScreen";
import MediationManagementScreen from "../screens/ManagerScreen/MediationManagementScreen";
import MediationScreen from "../screens/MediationScreen/MediationScreen";
import RoutineScreen from "../screens/RoutineScreen/RoutineScreen";
import SettingsScreen from "../screens/SettingsScreen/SettingsScreen";
import ThirdPartyManagementScreen from "../screens/AdminScreen/ThirdPartyManagementScreen";
import UserManagementScreen from "../screens/AdminScreen/UserManagementScreen";

export const userScreens = [
  { name: "HomeTab", component: HomeScreen },
  { name: "MediationTab", component: MediationScreen },
  { name: "RoutineTab", component: RoutineScreen },
  { name: "ChatTab", component: ChatScreen },
  { name: "SettingsTab", component: SettingsScreen },
];

export const managerScreens = [
  { name: "ManagerHome", component: ManagerHomeScreen },
  { name: "ManagerMediation", component: MediationManagementScreen },
  { name: "Dashboard", component: DashboardScreen },
  { name: "ManagerChat", component: ManagerChatScreen },
  { name: "ManagerSettings", component: ManagerSettingsScreen },
];

export const adminScreens = [
  { name: "UserManagementScreen", component: UserManagementScreen },
  { name: "ThirdParty", component: ThirdPartyManagementScreen },
];

export const userIcons = [
  {
    default: require("../assets/icons/home.png"),
    focused: require("../assets/icons/home-sharp.png"),
  },
  {
    default: require("../assets/icons/mediation.png"),
    focused: require("../assets/icons/mediation-sharp.png"),
  },
  {
    default: require("../assets/icons/routine.png"),
    focused: require("../assets/icons/routine-sharp.png"),
  },
  {
    default: require("../assets/icons/chat.png"),
    focused: require("../assets/icons/chat-sharp.png"),
  },
  {
    default: require("../assets/icons/settings.png"),
    focused: require("../assets/icons/settings-sharp.png"),
  },
];

export const managerIcons = [
  {
    default: require("../assets/icons/home.png"),
    focused: require("../assets/icons/home-sharp.png"),
  },
  {
    default: require("../assets/icons/mediation-management.png"),
    focused: require("../assets/icons/mediation-management-sharp.png"),
  },
  {
    default: require("../assets/icons/dashboard.png"),
    focused: require("../assets/icons/dashboard-sharp.png"),
  },
  {
    default: require("../assets/icons/chat.png"),
    focused: require("../assets/icons/chat-sharp.png"),
  },
  {
    default: require("../assets/icons/settings.png"),
    focused: require("../assets/icons/settings-sharp.png"),
  },
];

export const adminIcons = [
  {
    default: require("../assets/icons/user-mng.png"),
    focused: require("../assets/icons/user-mng-sharp.png"),
  },
  {
    default: require("../assets/icons/thirdparty-mng.png"),
    focused: require("../assets/icons/thirdparty-mng-sharp.png"),
  },
];
