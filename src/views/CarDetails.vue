<template>
<router-link class="back" :to="{ name: 'Home' }">Wróć</router-link>
  <div class="headerWrapper">
    <img :src="currentCar.carImages[0]" alt="" class="carMainImg" />
    <div class="info">
      <h2>
        {{ currentCar.carBrand }} <span>{{ currentCar.carModel }}</span>
      </h2>
      <div class="ownerInfo">
        <p>Sprzedający: {{ currentCar.carOwner }}</p>
        <p>Telefon: {{ currentCar.carOwnerPhone }}</p>
        <p>Email: {{ currentCar.carOwnerEmail }}</p>
      </div>

      <div class="carDetails">
        <p>
          Silnik: {{ currentCar.carEngineCapacity }} l
          {{ currentCar.carEnginePower }} kW
        </p>
        <p>Paliwo: {{ currentCar.carFuel }}</p>
        <p>Przebieg: {{ currentCar.carMilleage }} km</p>
        <p>Rocznik: {{ currentCar.carYear }}</p>
      </div>

      <div class="priceAndBuy">
        <h3>{{ currentCar.carPrice }} zł</h3>
        <router-link :to="{ name: 'Car' }">Kup teraz</router-link>
      </div>
    </div>
  </div>

  <div class="bodyWrapper">
    <h3>Więcej informacji</h3>
    <p>{{ currentCar.carInfo }}</p>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";

export default {
  name: "CarDetails",
  props: ["car"],

  data() {
    return {
      currentCar: null,
    };
  },

  methods: {
    ...mapMutations(["SET_CURRENT_CAR"]),
    ...mapActions([]),

    getCurrentCar() {
      this.SET_CURRENT_CAR(this.$route.params.carId);
      this.currentCar = this.$store.state.CURRENT_CAR_ARRAY[0];
      console.log(this.currentCar);
    },
  },
  created() {
    this.getCurrentCar();
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.headerWrapper, .bodyWrapper {
  display: flex;
  width: 80%;
  background-color: #efefef4d;
  padding: 30px 0px;
  margin: 10px auto 0;
  box-shadow: 0px 15px 15px 1px rgba(219, 219, 219, 0.562);
  @media(max-width:1200px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width:100%;
  }

  .priceAndBuy {
      display: flex;
      margin-top: 50px;
      h3 {
          margin-right: 20px;
          color:$secondaryColor;
          font-size: 34px;
      }
      a {
          background-color: $primaryColor;
          width:200px;
          line-height: 40px;
          color: white;
          border-radius: 30px;
            box-shadow: 0px 5px 15px 1px rgba(85, 85, 85, 0.562);
      }
  }

  .carMainImg {
    width: 700px;
      @media(max-width:1200px) {
    width:100%;
  }}

  .info {
    margin-left: 40px;

    h2 {
      text-transform: capitalize;
        @media(max-width:1200px) {
    margin-top: 30px;
  }
    }
  }
  .ownerInfo {
    text-align: left;
    font-size: 14px;
    font-weight: 700;
  }
  .carDetails {
    text-align: left;
    margin-top: 30px;

    p {
      font-size: 18px;
      font-weight: 700;
    }
  }
}
.bodyWrapper {
    flex-direction: column;
    align-items: flex-start;
}
.back {
    text-align: left;
    padding: 20px;
    color:$secondaryColor
}
</style>