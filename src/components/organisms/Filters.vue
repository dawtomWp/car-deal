<template>
  <section>
    <h2><span>W</span>yszukiwarka</h2>
    <p>Znajdź interesujący Cię samochód</p>
    <div class="wrapper">
      <form action="">
        <h3>Czego szukasz??</h3>

        <div class="carType type">
          <div>
            <label for="BodyType">Nadwozie</label>
            <select
              name="BodyType"
              id="BodyType"
              v-model="filters.SEARCH_BY_BODY"
            >
              <option
                v-for="type of CAR_DETAILS.BodyType"
                :key="type"
                :value="type"
              >
                {{ type.toUpperCase() }}
              </option>
            </select>
          </div>

          <div>
            <label for="VehicleBrand">Marka</label>
            <select
              name="VehicleBrand"
              id="VehicleBrand"
              v-model="filters.SEARCH_BY_BRAND"
            >
              <option
                v-for="brand of CAR_DETAILS.VehicleBrand"
                :value="brand"
                :key="brand"
              >
                {{ brand.toUpperCase() }}
              </option>
            </select>
          </div>
        </div>
        <div class="carNameAndFuel type">
          <div>
            <label for="FuelType">Paliwo</label>
            <select
            class="extraInput"
              name="FuelType"
              id="FuelType"
              v-model="filters.SEARCH_BY_FUEL"
            >
              <option
                v-for="fuel of CAR_DETAILS.FuelType"
                :value="fuel"
                :key="fuel"
              >
                {{ fuel.toUpperCase() }}
              </option>
            </select>
          </div>
        </div>

        <div class="carPrice type">
          <div>
            <label for="MinPrice">Cena minimalna</label>
            <input
              type="number"
              id="MinPrice"
              placeholder="from"
              v-model="filters.SEARCH_BY_MIN_PRICE"
            />
          </div>
          <div>
            <label for="MaxPrice">Cena maksymalna</label>
            <input
              type="number"
              id="MaxPrice"
              placeholder="to"
              v-model="filters.SEARCH_BY_MAX_PRICE"
            />
          </div>
        </div>
        <div class="carMilleage type">
          <div>
            <label for="MinMilleage">Przebieg minimalny</label>
            <input
              type="number"
              id="MinMilleage"
              placeholder="from"
              v-model="filters.SEARCH_BY_MIN_MILL"
            />
          </div>
          <div>
            <label for="MaxMilleage">Przebieg maksymalny</label>
            <input
              type="number"
              id="MaxMilleage"
              placeholder="to"
              v-model="filters.SEARCH_BY_MAX_MILL"
            />
          </div>
        </div>
        <div class="carYearOfProd type">
          <div>
            <label for="MinYearOfProd">Rok minimalny</label>
            <input
              type="number"
              id="MinYearOfProd"
              placeholder="from"
              v-model="filters.SEARCH_BY_MIN_YEAR"
            />
          </div>
          <div>
            <label for="MaxYearOfProd">Rok maksymalny</label>
            <input
              type="number"
              id="MaxYearOfProd"
              placeholder="to"
              v-model="filters.SEARCH_BY_MAX_YEAR"
            />
          </div>
        </div>

        <button @click.prevent="searchModeActive" class="searchBtn">
          Szukaj
        </button>
      </form>
    </div>
  </section>

   <h2 v-show="filteredCars.length > 0">Wyniki <span>wyszukiwania</span></h2>
  <div class="filteredCars">

    <div v-for="car in filteredCars" :key="car.id">
      <CarCard :car="car"/>
    </div>
  </div>

</template>



<script>
import { mapActions, mapMutations, mapState } from "vuex";
import CarCard from '../molecules/CarCard.vue';
export default {
  components: { CarCard },
  data() {
    return {
      filters: {
        SEARCH_BY_BODY: null,
        SEARCH_BY_BRAND: null,
        SEARCH_BY_FUEL: null,
        SEARCH_BY_MIN_MILL: null,
        SEARCH_BY_MAX_MILL: null,
        SEARCH_BY_MIN_PRICE: null,
        SEARCH_BY_MAX_PRICE: null,
        SEARCH_BY_MIN_YEAR: null,
        SEARCH_BY_MAX_YEAR: null,
      },
      filteredCars: []
    };
  },

  computed: {
    ...mapState([
      "CAR_DETAILS",
      "ALL_OFFERS",
      "SEARCH_MODE",
      "SEARCH_BY_BODY",
      "SEARCH_BY_BRAND",
      "SEARCH_BY_FUEL",
      "SEARCH_BY_MIN_MILL",
      "SEARCH_BY_MAX_MILL",
      "SEARCH_BY_MIN_PRICE",
      "SEARCH_BY_MAX_PRICE",
      "SEARCH_BY_MIN_YEAR",
      "SEARCH_BY_MAX_YEAR",
    ]),
  },
  methods: {
    ...mapMutations(["TURN_ON_SEARCH_MODE", "SET_FILTERS"]),
    ...mapActions(["GET_SEARCH_RESULT", "GET_ALL_OFFERS"]),

    async searchModeActive() {
      this.TURN_ON_SEARCH_MODE;
      const filtered = this.ALL_OFFERS.filter((car) => {
        return (
         car.carBrand == this.filters.SEARCH_BY_BRAND &&
         car.carBody == this.filters.SEARCH_BY_BODY &&
         car.carFuel == this.filters.SEARCH_BY_FUEL &&
         car.carMilleage >= this.filters.SEARCH_BY_MIN_MILL &&
         car.carMilleage <= this.filters.SEARCH_BY_MAX_MILL &&
         car.carYear >= this.filters.SEARCH_BY_MIN_YEAR &&
         car.carYear <= this.filters.SEARCH_BY_MAX_YEAR &&
         car.carPrice >= this.filters.SEARCH_BY_MIN_PRICE &&
         car.carPrice <= this.filters.SEARCH_BY_MAX_PRICE
        );
      });
      this.filteredCars = filtered;
      console.log(this.filteredCars);
    },
  },
  updated() {
    this.SET_FILTERS(this.filters);
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";
.extraInput {
   width:459px;
   @media(max-width:1400px) {
     width:217px
   } 
}
section {
  background-image: url("../../assets/images/bannerImg3.jpg");
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
  padding: 100px 50px;
  margin: 60px 0;
  @media (max-width: 768px) {
    padding: 30px 20px;
    margin: 20px 0;
  }
  .searchBtn {
    background-color: #c71d1d;
    color: #fff;
    font-weight: 700;
    padding: 8px 12px;
    width: 160px;
    border: none;
    margin-top: 20px;
    cursor: pointer;
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
  p {
    text-align: left;
    margin-bottom: 40px;
    margin-top: 5px;
    font-weight: 600;
  }
}
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #efefef;
  box-shadow: 0px 5px 10px 1px rgba(126, 126, 126, 0.295);
  width: 40%;
  min-width: 300px;
  text-align: left;
  form {
    margin: 0 auto;
    padding: 25px;
    .type {
      display: flex;
      text-align: left;
      flex-wrap: wrap;

      div {
        display: flex;
        flex-direction: column;
        margin-right: 25px;
        margin-top: 10px;

        label {
          margin-bottom: 5px;
        }
      }
    }
  }
}
.filteredCars {
  width:80%;
  margin:0 auto;
  display: flex;
  flex-wrap: wrap;
  padding:10px 50px 10px;
    @media(max-width:768px) {
      justify-content: center;
    padding: 30px 20px;
    margin: 10px auto 30px;
  }
}
</style>