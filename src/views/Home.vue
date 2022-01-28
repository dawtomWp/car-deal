<template>
  <div class="home">
    <Banner/>
    <CarDealsInfo/>
    <Filters/>
    <OffersRecord/>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Banner from '../components/organisms/Banner.vue'
import CarDealsInfo from '../components/organisms/CarDealsInfo.vue';
import Filters from '../components/organisms/Filters.vue';
import OffersRecord from '../components/organisms/OffersRecord.vue';
export default {
  name: "Home",
  components: {
    Banner,
    Filters,
    OffersRecord,
    CarDealsInfo
  },
  methods: {
    ...mapActions(['GET_ALL_OFFERS'])
  },
};
</script>
