<template>
  <h2 style="margin-top: 25px">Kup <span>teraz</span></h2>
  <div class="wrapper">
    <div class="left">
      <h3>Wypełnij formularz</h3>
      <form action="">
        <div>
          <input
            type="text"
            placeholder="Imię"
              :value="PROFILE_NAME"
          />
          <input
            type="text"
            placeholder="Nazwisko"
            :value="PROFILE_LASTNAME"
  
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="Telefon"
            :value="PROFILE_PHONE"
      
          />
          <input
            type="text"
            placeholder="Email"
            :value="PROFILE_EMAIL"
     
          />
        </div>
        <div>
          <input type="text" placeholder="Kod pocztowy" v-model="code" />
          <input type="text" placeholder="Miejscowość" v-model="city" />
        </div>
        <div>
          <input type="text" placeholder="Ulica" v-model="street" />
          <input
            type="text"
            placeholder="Numer lokalu/budynku"
            v-model="houseNumber"
          />
        </div>

        <div class="agreeSection">
          <input id="agree" type="checkbox" required/>
          <label for="agree"
            >Wyrażam zgodę na przetwarzanie moich danych osobowych przez firmę
            Car Deals w celu założenia i utrzymywania mojego konta użytkownika
            na warunkach opisanych w REGULAMINIE.</label
          >
        </div>

        <input
          type="submit"
          value="Kup"
          @click="updateStatusToBuy(currentCar.docId)"
        />
      </form>
      <h3>{{errorMsg && errorMsg}}</h3>
    </div>
    <div class="right">
      <h3>Informacje o produkcie</h3>
      <div class="info">
        <div class="ownerInfo">
          <p style="text-transform: capitalize; font-weight: 700">
            {{ currentCar.carBrand }} {{ currentCar.carModel }}
          </p>
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
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      currentCar: this.$store.state.CURRENT_CAR_ARRAY[0],
      code: null,
      city: null,
      street: null,
      houseNumber: null,
    };
  },
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
  methods: {
    ...mapActions(["UPDATE_STATUS_TO_BUY"]),

    updateStatusToBuy(docId) {
      if (
        this.street !== null &&
        this.city !== null &&
        this.code !== null &&
        this.houseNumber !== null
      ) {
        this.errorMsg = ""
        this.UPDATE_STATUS_TO_BUY(docId);
      // this.$router.go({name:'Home'});
      this.$router.push({ name: "Summary" });
      }
      this.errorMsg = "Wypełnij wszystkie pola"
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  width: 80%;
  margin: 40px auto;
  display: flex;
  .left {
    display: flex;
    flex: 2;
    flex-direction: column;
    align-items: flex-start;

    form div {
      display: flex;
      input {
        margin: 12px 8px;
      }
    }
    .agreeSection {
      margin-top: 20px;
      margin-bottom: 15px;
      label {
        font-size: 11px;
        max-width: 300px;
        text-align: left;
      }
      input[type="checkbox"] {
        box-shadow: none;
        width: 20px;
      }
    }
  }
  .right {
    display: flex;
    flex-direction: column;
    text-align: left;
    flex: 1;
    background: #efefef;
    padding: 20px 25px;
    margin-left: 30px;
  }
  .info div p {
    margin: 12px;
  }
}
input[type="submit"] {
  color: #fff;
  background: #c71d1d;
  font-weight: 700;
  cursor: pointer;
}
</style>