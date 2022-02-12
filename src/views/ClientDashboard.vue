<template>
  <div class="dashboardInfo">
    <div class="companyInfo">
      <h2>Twoje <span>konto</span></h2>
      <p>{{ PROFILE_NAME }} {{ PROFILE_LASTNAME }}</p>
      <p>{{ PROFILE_EMAIL }}</p>
      <p>Tel: {{ PROFILE_PHONE }}</p>
      <!-- <img src='../assets/images/bannerImg.jpg' alt=""> -->
    </div>

  </div>

      <!-- <div class="yourBought">
        <h2 v-if="USER_BOUGHT">Zakupione samochody</h2>
        <h2 v-else>Nic nie kupiłeś</h2>
        <div v-if="USER_BOUGHT"></div>
    </div> -->
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  components: {},
  computed: {
    ...mapState([
      "PROFILE_PHONE",
      "PROFILE_EMAIL",
      "PROFILE_ID",
      "PROFILE_TYPE",
      "PROFILE_NAME",
      "PROFILE_LASTNAME",
      "USER_BOUGHT",
    ]),
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
  margin-bottom: 300px;

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
