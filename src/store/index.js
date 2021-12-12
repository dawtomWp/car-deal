import { createStore } from "vuex";
import db from "../firebase/firebaseInit";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

export default createStore({
  state: {
    USER_LOGGED: null,
    SEARCH_MODE: null,
    ALL_DEALERS_NUM: 178,
    ALL_OFFERS_NUM: 636,
    ALL_USERS_NUM: 1179,

    CAR_DETAILS: {
      BodyType: ['coupe','cabriolet','suv','sedan','compact','combi','other'],
      VehicleBrand: ['bmw','opel','audi','volkswagen','ford','mercedes benz','renault','toyota','skoda','other'],
      FuelType: ['diesel','electric','petrol','lpg']
    }
  },
  mutations: {
     TURN_ON_SEARCH_MODE(state) {
       state.SEARCH_MODE = true;
     },
    //  SET_PROFILE_INFO(state, doc) {
    //   state.profileId = doc.id;
    //   state.profileEmail = doc.data().email;
    // },
  },
  actions: {
    // async GET_CURRENT_USER({ commit }) {
    //   const database = await db
    //     .collection("users")
    //     .doc(firebase.auth().currentUser.uid);
    //   const dbResults = await database.get();
    //   commit("SET_PROFILE_INFO", dbResults);
    // },
  },
  modules: {

  },
});
