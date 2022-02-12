<template>
  <div class="dashboardInfo">
    <div class="companyInfo">
      <h2>Twoje konto <span>kuriera</span></h2>
      <p>{{ PROFILE_NAME }} {{ PROFILE_LASTNAME }}</p>
      <p>{{ PROFILE_EMAIL }}</p>
      <p>Tel: {{ PROFILE_PHONE }}</p>
      <p>Województwo {{ PROFILE_VOIVODESHIP }}</p>
      <!-- <img src='../assets/images/bannerImg.jpg' alt=""> -->
    </div>
  </div>

  <div style="background: #efefef">
    <h2 style="margin: 5px; margin-top: 25px">
      <span>Sprzedane</span> w twojej okolicy
    </h2>

    <div v-if="SOLD_IN_MY_LOCATION.length > 0" class="allOffers">
      <div v-for="(car, index) in SOLD_IN_MY_LOCATION" :key="index">
        <div class="soldCar">
          <h3>Model</h3>
          <p style="text-transform: capitalize">
            {{ car.carBrand }} {{ car.carModel }}
          </p>
          <p>Województwo: {{ car.carLocation }}</p>
          <p>Salon: {{ car.carOwnerPhone }}</p>
          <p>Cena: {{ car.carPrice }} zł</p>
          <h3>Kupujący</h3>
          <p>{{ car.buyerName }}</p>
          <p>Telefon: {{ car.buyerPhone }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import CarCard from "../components/molecules/CarCard.vue";
export default {
  components: { CarCard },
  data () {
    return {
      filteredByLocation: []
    }
  },
  computed: {
    ...mapState([
      "PROFILE_PHONE",
      "PROFILE_EMAIL",
      "PROFILE_ID",
      "PROFILE_TYPE",
      "PROFILE_NAME",
      "PROFILE_LASTNAME",
      "PROFILE_VOIVODESHIP",
      "USER_BOUGHT",
      "SOLD_IN_MY_LOCATION",
    ]),
  },
  methods: {
    ...mapActions(["GET_SOLD_OFFERS"]),
  },
  async mounted() {
    this.GET_SOLD_OFFERS();
  
  },
};
</script>

<style lang="scss" scoped>
.dashboardInfo {
  display: flex;
  width: 80%;
  margin: 30px auto;
  @media (max-width: 992px) {
    flex-direction: column;
  }
}
.yourBought {
  display: flex;
  width: 80%;
  margin: 30px auto;
}
.companyInfo {
  flex: 1;
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-bottom: 50px;

  h2 {
    margin-bottom: 30px;
  }
  p {
    padding: 8px 10px;
    background: #efefef94;
    margin: 5px;
    margin-top: 15px;
    font-weight: 700;
  }
}
.allOffers {
  display: flex;
  flex-wrap: wrap;
  width: 80%;
  margin: 20px auto;
}
.soldCar {
  background-color: #fff;
  width: 300px;
  padding: 20px;
  text-align: left;
  margin: 15px;
  border-radius: 20px;
  box-shadow: 0px 4px 15px 1px rgb(201, 201, 201);

  h3 {
    text-transform: capitalize;
    margin-bottom: 5px;
  }
}
</style>
