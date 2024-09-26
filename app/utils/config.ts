import { NativeModules } from "react-native";
import Config from "react-native-config";
import { getBuildNumber } from "react-native-device-info";

export const apiBaseUrl = __DEV__ ? Config.API_DEVELOPMENT_BASE_URL.replace('@<scriptUrlHost>', new URL(NativeModules.SourceCode.scriptURL).hostname).replace('@<buildnumber>', getBuildNumber()) : Config.API_PRODUCTION_BASE_URL.replace('@<buildnumber>', getBuildNumber())