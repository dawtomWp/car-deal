<template>
   <h2 v-if="!SEARCH_MODE"><span>N</span>ajnowsze oferty</h2>
  <div class="wrapper">
  

    <div v-if="ALL_OFFERS.length > 0" class="allOffers">
      <div v-for="(car, index) in ALL_OFFERS" :key="index">
        <CarCard :car="car" />
      </div>
    </div>

  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import CarCard from '../molecules/CarCard.vue';
export default {
  components: { CarCard },
  data() {
    return {};
  },
  computed: {
    ...mapState(["SEARCH_MODE",'ALL_OFFERS']),
  },
  methods: {
    ...mapActions(["GET_ALL_OFFERS"]),
  },
  mounted() {
    this.ALL_OFFERS < 1 && this.GET_ALL_OFFERS();
  },
};
</script>


<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.wrapper {
  position: relative;
  width: 80%;
  padding: 10px 50px;
  margin: 0px auto;

  @media(max-width:768px) {
    padding: 30px 20px;
    margin: 10px auto 30px;
  }

  h2 {
    color: $primaryTextColor;
    text-align: left;
    font-size: 48px;

    span {
      color: #fff;
      background: $secondaryColor;
    }
  }
  .allOffers {
      display: flex;
      flex-wrap: wrap;
        @media(max-width:768px) {
    justify-content: space-around;
    align-items: center;
  }
  }
}
</style>