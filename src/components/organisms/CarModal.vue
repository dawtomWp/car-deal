<template>
  <div class="carForm">
    <form action="">
      <div>
        <select v-model="carBrand" name="" id="" required>
          <option value="audi">Audi</option>
          <option value="bmw">BMW</option>
          <option value="mercedes">Mercedes</option>
          <option value="opel">Opel</option>
          <option value="skoda">Skoda</option>
          <option value="renault">Renault</option>
          <option value="peugeot">Peugeot</option>
          <option value="toyota">Toyota</option>
          <option value="lexus">Lexus</option>
          <option value="nissan">Nissan</option>
          <option value="mitsubishi">Mitsubishi</option>
          <option value="seat">Seat</option>
          <option value="volkswagen">Volkswagen</option>
          <option value="jaguar">Jaguar</option>
          <option value="alfa">Alfa Romeo</option>
          <option value="fiat">Fiat</option>
          <option value="volvo">Volvo</option>
          <option value="chevrolet">Chevrolet</option>
          <option value="dodge">Dodge</option>
        </select>

        <input type="text" placeholder="Model" v-model="carModel" />
      </div>

      <div>
        <select name="" id="" v-model="carBody">
          <option value="sedan">Sedan</option>
          <option value="combi">Kombi</option>
          <option value="coupe">Coupe</option>
          <option value="compact">Kompakt</option>
          <option value="suv">SUV</option>
          <option value="small">Auto małe</option>
        </select>

        <select name="" id="" v-model="carFuel">
          <option value="Benzyna">Benzyna</option>
          <option value="LPG">Benzyna + LPG</option>
          <option value="Diesel">Diesel</option>
          <option value="Elektryczny">Elektryczny</option>
        </select>
      </div>

      <div>
        <input
          type="text"
          v-model="carEngineCapacity"
          placeholder="Pojemność silnika"
        />
        <input
          type="number"
          v-model="carEnginePower"
          placeholder="Moc silnika"
        />
      </div>

      <div>
        <input type="number" placeholder="Przebieg" v-model="carMilleage" />
        <input type="number" placeholder="Rok produkcji" v-model="carYear" />
      </div>

      <div>
        <input
          style="flex: 1"
          type="number"
          placeholder="Cena"
          v-model="carPrice"
        />
      </div>

      <div>
        <input
          style="display: none"
          type="file"
          id="photo"
          @change="uploadImage"
        />
        <label class="addPhotoLabel" for="photo">Wybierz zdjęcie</label>
        <div class="previewImages" v-for="image in carImages" :key="image">
          <img :src="image" alt="" style="width: 200px" />
        </div>
      </div>

      <div>
        <textarea
          style="flex: 1"
          name=""
          id=""
          cols="30"
          rows="10"
          v-model="carInfo"
        ></textarea>
      </div>

      <input
        class="submitBtn"
        type="submit"
        value="Wystaw na sprzedaż"
        @click.prevent="addCar"
      />
    </form>
  </div>
</template>


<script>
import db from "../../firebase/firebaseInit";
import { uid } from "uid";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import { mapActions } from "vuex";

export default {
  name: "CardModal",
  data() {
    return {
      carBody: null,
      carBrand: null,
      carModel: null,
      carFuel: null,
      carPrice: null,
      carEngineCapacity: null,
      carEnginePower: null,
      carMilleage: null,
      carYear: null,
      carInfo: null,
      carImages: [],
      error: false,
      errorMsg: "",
      carOwner: null,
      carOwnerPhone: null,
      carOwnerEmail: null,
      carOwnerWebsite: null,
      forSale: true,
      saled: false,
    };
  },
  methods: {
    ...mapActions(["GET_CURRENT_MERCHANT_OFFERS"]),
    resetCreator() {
      this.carBrand = null;
      this.carBody = null;
      this.carModel = null;
      this.carFuel = null;
      this.carPrice = null;
      this.carMilleage = null;
      this.carYear = null;
      this.carInfo = null;
      this.carEnginePower = null;
      this.carEngineCapacity = null;
    },
    uploadImage(e) {
      if (e.target.files[0]) {
        let file = e.target.files[0];
        console.log(file.name);
        const storageRef = firebase.storage().ref("cars/" + file.name);

        let uploadTask = storageRef.put(file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            console.log(snapshot.bytesTransferred);
          },
          (error) => {
            console.log(error.message);
          },
          () => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              this.carImages.push(downloadURL);
              console.log("File available at", downloadURL, this.carImages);
            });
          }
        );
      }
    },
    async addCar() {
      if (
        this.carBrand !== null &&
        this.carBody !== null &&
        this.carModel !== null &&
        this.carFuel !== null &&
        this.carPrice !== null &&
        this.carMilleage !== null &&
        this.carYear !== null &&
        this.carInfo !== null &&
        this.carEnginePower !== null &&
        this.carEngineCapacity !== null
      ) {
        this.error = false;
        this.errorMsg = "";

        const database = db.collection("cars").doc();
        await database.set({
          carId: uid(6),
          carBrand: this.carBrand,
          carBody: this.carBody,
          carModel: this.carModel,
          carFuel: this.carFuel,
          carPrice: this.carPrice,
          carMilleage: this.carMilleage,
          carYear: this.carYear,
          carInfo: this.carInfo,
          carEngineCapacity: this.carEngineCapacity,
          carEnginePower: this.carEnginePower,
          owner: this.$store.state.user.uid,
          carImages: [...this.carImages],
          carOwner: this.$store.state.COMPANY_NAME,
          carOwnerPhone: this.$store.state.PROFILE_PHONE,
          carOwnerEmail: this.$store.state.PROFILE_EMAIL,
          forSale: this.forSale,
          saled: this.saled,
        });
        this.resetCreator();
        this.GET_CURRENT_MERCHANT_OFFERS();
        this.$route.reload();
      }
      this.error = true;
      this.errorMsg = "Nie podano wszystkich wymaganych informacji";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";
.carForm {
  width: 450px;
  display: flex;
  flex-direction: column;
  @media (max-width: 992px) {
    width: 320px;
  }
  select,
  input {
    margin-top: 15px;
    @media (max-width: 768px) {
      width: 150px;
    }
  }
  div {
    display: flex;

    input,
    select,
    textarea {
      margin-left: 15px;
    }
    textarea {
      display: block;
      padding: 10px 0px 10px 9px;
      border: none;
      width: 217px;
      background-color: #fafafa;
      box-shadow: 0px 5px 10px 1px rgb(236, 236, 236);
    }
  }
  .submitBtn {
    background-color: $secondaryColor;
    color: #fff;
    font-weight: 700;
  }
  .addPhotoLabel {
    flex: 1;
    padding: 10px;
    margin: 14px;
    cursor: pointer;
    color: $secondaryColor;
    text-align: left;
  }
}
</style>
