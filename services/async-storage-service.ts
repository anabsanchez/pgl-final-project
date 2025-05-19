import AsyncStorage from "@react-native-async-storage/async-storage";

const userToken = "user-token";

async function saveToken(token: string): Promise<void> {
  try {
    await AsyncStorage.setItem(userToken, token);
  } catch (e) {
    console.log(`AsyncStorage Error: ${e}`);
  }
}

async function getToken(): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(userToken);
  } catch (e) {
    console.log(`AsyncStorage Error: ${e}`);
    return null;
  }
}

async function removeToken(): Promise<void> {
  try {
    await AsyncStorage.removeItem(userToken);
  } catch (e) {
    console.log(`AsyncStorage Error: ${e}`);
  }
}

export const asyncStorageService = {
  userToken,
  setToken: saveToken,
  getToken,
  removeToken,
};
