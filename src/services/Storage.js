import AsyncStorage from "@react-native-async-storage/async-storage";

export const getItem = async (key) => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(key)
      .then((res) => {
        if (res !== null) {
          resolve(res);
        } else {
          resolve(null);
        }
      })
      .catch((err) => reject(err));
  });
};

export const setItem = async (key, value) => {
  return new Promise((resolve, reject) => {
    AsyncStorage.setItem(key, value)
      .then((res) => {
        if (res !== null) {
          resolve(res);
        } else {
          resolve(null);
        }
      })
      .catch((err) => reject(err));
  });
};
