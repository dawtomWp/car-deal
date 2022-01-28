import { createStore } from "vuex";
import db from "../firebase/firebaseInit";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

export default createStore({
  state: {
    USER_LOGGED: null,
    SEARCH_MODE: null,
    PROFILE_EMAIL: null,
    PROFILE_ID: null,
    PROFILE_TYPE: null,
    PROFILE_NAME: null,
    PROFILE_LASTNAME: null,
    PROFILE_INITIALS: null,
    PROFILE_VOIVODESHIP: null,
    COMPANY_NAME: null,
    COMPANY_NIP: null,
    COMPANY_ADDRESS: null,
    COMPANY_CITY: null,
    PROFILE_PHONE: null,
    ALL_DEALERS_NUM: 178,
    ALL_OFFERS_NUM: 656,
    ALL_USERS_NUM: 1179,
    CURRENT_MERCHANT_OFFERS: [],
    CARS_LOADED: null,
    CURRENT_CAR_ARRAY: null,
    ALL_OFFERS: [],

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
     SET_PROFILE_INFO(state, doc) {
      state.PROFILE_ID = doc.id;
      state.PROFILE_EMAIL = doc.data().email;
      state.PROFILE_TYPE = doc.data().type;
      state.PROFILE_NAME = doc.data().name;
      state.PROFILE_LASTNAME = doc.data().lastname;
      state.PROFILE_VOIVODESHIP = doc.data().voivodeship;
      state.COMPANY_NAME = doc.data().companyName;
      state.COMPANY_NIP = doc.data().companyNip;
      state.COMPANY_ADDRESS = doc.data().companyAddress;
      state.COMPANY_CITY = doc.data().companyCity;
      state.PROFILE_PHONE = doc.data().phone;
      state.USER_LOGGED = true;
    },
    UPDATE_USER(state, payload) {
      state.user = payload;
    },
    SET_INITIALS(state) {
      const firstletter = state.PROFILE_NAME.substring(0,1);
      const secondletter = state.PROFILE_LASTNAME.substring(0,1);
      state.PROFILE_INITIALS = firstletter + secondletter;
    },
    SET_CURRENT_MERCHANT_CARS_DATA(state,payload) {
      state.CURRENT_MERCHANT_OFFERS.push(payload);
      console.log(state.CURRENT_MERCHANT_OFFERS, "eee")
    },
    SET_ALL_CARS_DATA(state,payload) {
      state.ALL_OFFERS.push(payload);
      console.log(state.ALL_OFFERS, payload)
    },
    SET_CARS_LOADED(state) {
      state.CARS_LOADED = true;
    },
    SET_CURRENT_CAR(state,payload) {
      state.CURRENT_CAR_ARRAY = state.ALL_OFFERS.filter((car) => {
        return car.carId === payload;
      })
    }
  },
  actions: {
    async GET_CURRENT_USER({ commit }) {
      const database = await db
        .collection("users")
        .doc(firebase.auth().currentUser.uid);
      const dbResults = await database.get();
      commit("SET_PROFILE_INFO", dbResults);
      commit('SET_INITIALS');
      console.log(dbResults)
    },
    async GET_CURRENT_MERCHANT_OFFERS({commit, state}) {
      const results = await db.collection('cars').where("carOwner", "==", state.COMPANY_NAME).get();
      results.forEach((doc) => {
        if(!state.CURRENT_MERCHANT_OFFERS.some((car) => car.docId === doc.id)) {
          const data = {
            docId: doc.id,
            carBrand: doc.data().carBrand,
            carBody: doc.data().carBody,
            carEngineCapacity: doc.data().carEngineCapacity,
            carEnginePower: doc.data().carEnginePower,
            carFuel: doc.data().carFuel,
            carImages: doc.data().carImages,
            carInfo: doc.data().carInfo,
            carMilleage: doc.data().carMilleage,
            carModel: doc.data().carModel,
            carPrice: doc.data().carPrice,
            carYear: doc.data().carYear,
            carOwner: doc.data().carOwner,
            carOwnerEmail: doc.data().carOwnerEmail,
            carOwnerPhone: doc.data().carOwnerPhone,
            carId: doc.data().carId,
            forSale: doc.data().forSale,
            saled: doc.data().saled
          };
          commit("SET_CURRENT_MERCHANT_CARS_DATA", data)
        }
      });
      commit("SET_CARS_LOADED")
    },
    async GET_ALL_OFFERS({commit, state}) {
      const results = await db.collection('cars').where("forSale", "==", true).get();
      results.forEach((doc) => {
        if(!state.CURRENT_MERCHANT_OFFERS.some((car) => car.docId === doc.id)) {
          const data = {
            docId: doc.id,
            carBrand: doc.data().carBrand,
            carBody: doc.data().carBody,
            carEngineCapacity: doc.data().carEngineCapacity,
            carEnginePower: doc.data().carEnginePower,
            carFuel: doc.data().carFuel,
            carImages: doc.data().carImages,
            carInfo: doc.data().carInfo,
            carMilleage: doc.data().carMilleage,
            carModel: doc.data().carModel,
            carPrice: doc.data().carPrice,
            carYear: doc.data().carYear,
            carOwner: doc.data().carOwner,
            carOwnerEmail: doc.data().carOwnerEmail,
            carOwnerPhone: doc.data().carOwnerPhone,
            carId: doc.data().carId,
            forSale: doc.data().forSale,
            saled: doc.data().saled
          };
          commit("SET_ALL_CARS_DATA", data)
        }
      });
      commit("SET_CARS_LOADED")
    }
  },
  modules: {

  },
});
