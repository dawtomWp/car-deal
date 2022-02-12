<template>
  <div class="modal" v-show="showModal">
    <h3>Czy na pewno chcesz usunąć tą ofertę?</h3>
    <div>
    <button @click="showModal = !showModal">Wróc</button>
    <button @click="confirmDeleteOffer(carToDelete)">Tak</button>
    </div>

  </div>

  <div class="dashboardInfo">
    <div class="companyInfo">
      <h2>
        Panel <span>{{ COMPANY_NAME }}</span>
      </h2>
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
  <div style="background: #efefef">
    <h2 style="margin: 5px; margin-top: 25px"><span>Twoje</span> oferty</h2>

    <div v-if="CURRENT_MERCHANT_OFFERS.length > 0" class="allOffers">
      <div v-for="(car, index) in CURRENT_MERCHANT_OFFERS" :key="index">
        <CarCard :car="car" />
        <button @click="deleteOffer(car)" class="deleteBtn">Usuń ofertę</button>
      </div>
    </div>
  </div>
</template>

<script>
import CarModal from "../components/organisms/CarModal.vue";
import { mapActions, mapMutations, mapState } from "vuex";
import CarCard from "../components/molecules/CarCard.vue";

export default {
  components: {
    CarModal,
    CarCard,
  },
  data() {
    return {
      showModal: false,
      carToDelete: null,
    };
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
      "warningModal",
    ]),
  },
  methods: {
    ...mapMutations([
      "TOGGLE_WARNING_MODAL",
      ,
      "TOGGLE_CONFIRM_DELETE",
      "DELETE_CURRENT_OFFER",
    ]),
    ...mapActions(["GET_CURRENT_MERCHANT_OFFERS", "DELETE_OFFER"]),

    async deleteOffer(car) {
      this.showModal = !this.showModal;
      this.carToDelete = car;
      console.log(car.docId);
    },
    async confirmDeleteOffer(car) {
      console.log(car);
      await this.DELETE_OFFER(car.docId);
       this.showModal = !this.showModal;
    },
  },
  mounted() {
    this.GET_CURRENT_MERCHANT_OFFERS();
    this.showModal = false;
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/_variables.scss"; //wymagne w kazdym komponencie 
.deleteBtn {
      display: block;
    padding: 10px 0px 10px 9px;
    border: none;
    width: 217px;
    background-color: #c71d1d;
    color: #fff;
    font-weight: 700;
    margin:0 auto;
    cursor:pointer
}

  .modal {
   position: fixed;
    top: 50%;
    z-index:1000;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #31373c;
    width: 400px;
    height: 300px;
    color: #fff;
    padding: 25px;
        display: flex;
    flex-direction: column;
    justify-content: space-around;

    button {
      padding:6px 12px;
      width:70px;
      border:none;
      margin: 12px;
      font-weight: 700;
      cursor:pointer
    }
  }
.allOffers {
  display: flex;
  flex-wrap: wrap;
  width: 80%;
  margin: 0 auto;
  padding: 10px 50px 50px;
  @media (max-width: 992px) {
    justify-content: center;
  }
}
.dashboardInfo {
  display: flex;
  width: 80%;
  margin: 30px auto;
  @media (max-width: 992px) {
    flex-direction: column;
  }
}
.carForm {
  flex: 2;
  justify-content: center;
  align-items: center;
  display: flex;
}
.companyInfo {
  flex: 1;
  display: flex;
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

