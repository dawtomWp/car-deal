<template>
  <div class="dashboardInfo">
    <div class="companyInfo">
      <h2>Panel <span>{{ COMPANY_NAME }}</span></h2>
      <p>{{ PROFILE_NAME }} {{ PROFILE_LASTNAME }}</p>
      <p>{{ PROFILE_EMAIL }}</p>
      <p>{{ PROFILE_VOIVODESHIP }}</p>
      <p>NIP: {{ COMPANY_NIP }}</p>
      <p>Tel: {{ PROFILE_PHONE }}</p>
      <p>{{ COMPANY_ADDRESS }}, {{ COMPANY_CITY }}</p>
      <!-- <img src='../assets/images/bannerImg.jpg' alt=""> -->
    </div>

    <div class="carForm">
        <CarModal />
    </div>

    
  </div>
<div style="background:#efefef">

<h2 style="margin:5px; margin-top:25px"><span>Twoje</span> oferty</h2>

    
  <div v-if="CURRENT_MERCHANT_OFFERS.length > 0" class="allOffers">


    <div v-for="(car, index) in CURRENT_MERCHANT_OFFERS" :key="index">
      <CarCard :car="car" />
    </div>
  </div>
  </div>
</template>

<script>
import CarModal from "../components/organisms/CarModal.vue";
import { mapActions, mapState } from "vuex";
import CarCard from "../components/molecules/CarCard.vue";

export default {
  components: {
    CarModal,
    CarCard,
  },
  computed: {
    ...mapState([
      "CURRENT_MERCHANT_OFFERS",
      "PROFILE_PHONE",
      "COMPANY_ADDRESS",
      "COMPANY_NAME",
      "PROFILE_EMAIL",
      "PROFILE_ID",
      "PROFILE_TYPE",
      "PROFILE_NAME",
      "PROFILE_LASTNAME",
      "PROFILE_VOIVODESHIP",
      "COMPANY_NIP",
      "COMPANY_CITY",
    ]),
  },
  methods: {
    ...mapActions(["GET_CURRENT_MERCHANT_OFFERS"]),
  },
  mounted() {
    this.GET_CURRENT_MERCHANT_OFFERS();
  },
};
</script>

<style lang="scss" scoped>
.allOffers {
  display: flex;
  flex-wrap: wrap;
  width: 80%;
  margin: 0 auto;
  padding: 10px 50px 50px;
    @media(max-width:992px) {
    justify-content: center;
  }
}
.dashboardInfo {
   display:flex;
   width:80%;
   margin:30px auto;
  @media(max-width:992px) {
    flex-direction: column;
  }
}
.carForm {
    flex:2;
    justify-content: center;
    align-items: center;
    display: flex;
}
.companyInfo {
    flex:1;
    display:flex;
    flex-direction: column;
    text-align: left;

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
</style>

