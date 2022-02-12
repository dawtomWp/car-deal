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
    ALL_OFFERS_NUM: 22,
    ALL_USERS_NUM: 1179,
    CURRENT_MERCHANT_OFFERS: [],
    CARS_LOADED: null,
    CURRENT_CAR_ARRAY: null,
    ALL_OFFERS: [],
    USER_BOUGHT: [],
    warningModal: false,
    confirmDelete: null,

    SOLD_IN_MY_LOCATION: [],

    SEARCH_RESULTS: [],
    SEARCH_BY_BODY: null,
    SEARCH_BY_BRAND: null,
    SEARCH_BY_FUEL: null,
    SEARCH_BY_MIN_MILL: null,
    SEARCH_BY_MAX_MILL: null,
    SEARCH_BY_MIN_PRICE: null,
    SEARCH_BY_MAX_PRICE: null,
    SEARCH_BY_MIN_YEAR: null,
    SEARCH_BY_MAX_YEAR: null,

    CAR_DETAILS: {
      BodyType: [
        "coupe",
        "cabriolet",
        "suv",
        "sedan",
        "compact",
        "combi",
        "other",
      ],
      VehicleBrand: [
        "bmw",
        "opel",
        "audi",
        "volkswagen",
        "ford",
        "mercedes",
        "renault",
        "toyota",
        "skoda",
        "dacia",
        "citroen",
        "mitsubishi",
        "volvo"
      ],
      FuelType: ["Diesel", "Elektryczny", "Benzyna", "LPG"],
    },
  },
  mutations: {
    TURN_ON_SEARCH_MODE(state) {
      state.SEARCH_MODE = true;
    },
    SET_PROFILE_INFO(state, doc) {
      state.ALL_OFFERS_NUM = "+1000";
      state.ALL_USERS_NUM = "+3000";
      state.ALL_DEALERS_NUM = "+50";
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
      state.USER_BOUGHT = doc.data().buys;
    },
    UPDATE_USER(state, payload) {
      state.user = payload;
    },
    SET_INITIALS(state) {
      const firstletter = state.PROFILE_NAME.substring(0, 1);
      const secondletter = state.PROFILE_LASTNAME.substring(0, 1);
      state.PROFILE_INITIALS = firstletter + secondletter;
    },
    SET_CURRENT_MERCHANT_CARS_DATA(state, payload) {
      state.CURRENT_MERCHANT_OFFERS.push(payload);
      console.log(state.CURRENT_MERCHANT_OFFERS, "eee");
    },
    SET_ALL_CARS_DATA(state, payload) {
      state.ALL_OFFERS.push(payload);
      //   console.log(state.ALL_OFFERS);
    },
    SET_CARS_LOADED(state) {
      state.CARS_LOADED = true;
    },
    SET_CURRENT_CAR(state, payload) {
      state.CURRENT_CAR_ARRAY = state.ALL_OFFERS.filter((car) => {
        return car.carId === payload;
      });
    },
    SET_SEARCH_RESULTS(state, payload) {
      state.SEARCH_RESULTS.push(payload);
      console.log(state.SEARCH_RESULTS, payload, "ee");
    },
    SET_SOLD_CARS(state, payload) {
      if(state.PROFILE_VOIVODESHIP == payload.carLocation) {
        state.SOLD_IN_MY_LOCATION.push(payload);
      }
      
      console.log(state.SOLD_IN_MY_LOCATION), "EEEE";
    },
    SET_FILTERS(state, payload) {
      state.SEARCH_BY_BODY = payload.SEARCH_BY_BODY;
      state.SEARCH_BY_BRAND = payload.SEARCH_BY_BRAND;
      state.SEARCH_BY_FUEL = payload.SEARCH_BY_FUEL;
      state.SEARCH_BY_MIN_MILL = payload.SEARCH_BY_MIN_MILL;
      state.SEARCH_BY_MAX_MILL = payload.SEARCH_BY_MAX_MILL;
      state.SEARCH_BY_MIN_PRICE = payload.SEARCH_BY_MIN_PRICE;
      state.SEARCH_BY_MAX_PRICE = payload.SEARCH_BY_MAX_PRICE;
      state.SEARCH_BY_MIN_YEAR = payload.SEARCH_BY_MIN_YEAR;
      state.SEARCH_BY_MAX_YEAR = payload.SEARCH_BY_MAX_YEAR;
      // console.log(payload, state)
    },
    TOGGLE_WARNING_MODAL(state) {
      state.warningModal = !state.warningModal;
    },
    DELETE_CURRENT_OFFER(state, payload) {
      state.CURRENT_MERCHANT_OFFERS = state.CURRENT_MERCHANT_OFFERS.filter(
        (offer) => offer.docId != payload
      );
    },
    UPDATE_STATUS_TO_BUY(state, payload) {
      state.ALL_OFFERS.forEach((car) => {
        if (car.id === payload) {
          car.saled = true;
          car.forSale = false;
          car.buyerName =  `${state.PROFILE_NAME} ${state.PROFILE_LASTNAME}`,
          car.buyerPhone = state.PROFILE_PHONE
        }
      });
    },
  },
  actions: {
    async GET_CURRENT_USER({ commit }) {
      const database = await db
        .collection("users")
        .doc(firebase.auth().currentUser.uid);
      const dbResults = await database.get();
      commit("SET_PROFILE_INFO", dbResults);
      commit("SET_INITIALS");
      //console.log(dbResults);
    },
    async GET_SOLD_OFFERS({ commit, state }) {
      const results = await db
        .collection("cars")
        //  .where("carVoivodeship","==",state.PROFILE_VOIVODESHIP)
        .where("saled", "==", true)
        .get();
      results.forEach((doc) => {
        if (
          !state.SOLD_IN_MY_LOCATION.some((car) => car.docId === doc.id)
        ) {
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
            saled: doc.data().saled,
            carLocation: doc.data().carLocation,
            buyerPhone: doc.data().buyerPhone,
            buyerName: doc.data().buyerName
          };
          commit("SET_SOLD_CARS", data);
        }
      });
    },
    async GET_CURRENT_MERCHANT_OFFERS({ commit, state }) {
      const results = await db
        .collection("cars")
        .where("carOwner", "==", state.COMPANY_NAME)
        .get();
      results.forEach((doc) => {
        if (
          !state.CURRENT_MERCHANT_OFFERS.some((car) => car.docId === doc.id)
        ) {
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
            saled: doc.data().saled,
            carLocation: doc.data().carLocation,
            buyerPhone: doc.data().buyerPhone,
            buyerName: doc.data().buyerName
          };
          commit("SET_CURRENT_MERCHANT_CARS_DATA", data);
        }
      });
      commit("SET_CARS_LOADED");
    },
    async GET_ALL_OFFERS({ commit, state }) {
      const results = await db
        .collection("cars")
        .where("forSale", "==", true)
        .get();
      results.forEach((doc) => {
        if (
          !state.CURRENT_MERCHANT_OFFERS.some((car) => car.docId === doc.id)
        ) {
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
            saled: doc.data().saled,
            carLocation: doc.data().carLocation,
            buyerPhone: doc.data().buyerPhone,
            buyerName: doc.data().buyerName
          };
          commit("SET_ALL_CARS_DATA", data);
        }
      });
      commit("SET_CARS_LOADED");
    },
    async DELETE_OFFER({ commit }, docId) {
      const getOffers = db.collection("cars").doc(docId);
      await getOffers.delete();
      commit("DELETE_CURRENT_OFFER", docId);
    },
    async UPDATE_STATUS_TO_BUY({ commit,state }, docId) {
      const getOffers = db.collection("cars").doc(docId);
      await getOffers.update({
        forSale: false,
        saled: true,
        buyerName: `${state.PROFILE_NAME} ${state.PROFILE_LASTNAME}`,
        buyerPhone: state.PROFILE_PHONE
      });
      commit("UPDATE_STATUS_TO_BUY", docId);
    },
  },
  modules: {},
});
