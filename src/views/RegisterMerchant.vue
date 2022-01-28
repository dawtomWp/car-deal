<template>
    <div class="wrapper">
        <div class="left">
            <h1>New Merchant</h1>
            <RegisterType/>
            <form >
                <div class="formBox">
                    <input v-model="companyName" type="text" placeholder="Nazwa firmy">
                    <input v-model="companyNip" type="number" placeholder="Numer NIP">
                </div>

                <div class="formBox">
                    <input v-model="userName" type="text" placeholder="Imię">
                   <input v-model="userLastName" type="text" placeholder="Nazwisko">
                </div>

                <div class="formBox">
                    <input v-model="userEmail" type="text" placeholder="Adres Email">
                   <input v-model="userTelephone" type="number" placeholder="Numer telefonu">
                </div>

                <div class="formBox">
                     <input v-model="companyAddress" type="text" placeholder="Ulica i numer"/>
               
                </div>

                <div class="formBox">
                   
                    <input  v-model="companyCity" type="text" placeholder="Miasto">
                                    <select v-model="voivodeship">
                     <option value="lower-silesia">Lower Silesia</option>
                     <option value="kuyavian-pomeranian">Kuyavian-Pomeranian</option>
                     <option value="lublin">Lublin</option>
                     <option value="lubusz">Lubusz</option>
                     <option value="lodz">Łódź</option>
                     <option value="lesser-poland">Lesser Poland</option>
                     <option value="masovian">Masovian</option>
                     <option value="opole">Opole</option>
                     <option value="subcarpathian">Subcarpathian</option>
                     <option value="podlaskie">Podlaskie</option>
                     <option value="pomeranian">Pomeranian</option>
                     <option value="silesian">Silesian</option>
                     <option value="holy-cross">Holy Cross</option>
                     <option value="warmian-masurian">Warmian Masurian</option>
                     <option value="greater-poland">Greater Poland</option>
                     <option value="west-pomeranian">West Pomeranian</option>
                 </select>
                </div>

                <div class="formBox">
                   <input v-model="userPassword" type="password" placeholder="Hasło">
                </div>

                 



               
               
               

                 
                <button @click.prevent="register" type="submit">Zarejestruj</button>
            </form>

            
            <p v-show="error">{{errorMsg}}</p>
            <p>Masz już konto? <router-link class="link" :to="{name:'Login'}">Zaloguj się</router-link></p>
        </div>
        <div class="right"></div>
    </div>
  
</template>

<script>
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import RegisterType from '../components/molecules/RegisterType.vue';
import db from '../firebase/firebaseInit'

export default {
    data() {
        return {
            companyName: null,
            companyNip: null,
            userName: null,
            userLastName: null,
            userEmail: null,
            userPassword: null,
            userType: null,
            userTelephone: null,
            error: null,
            errorMsg: null,
            type: 'merchant',
            voivodeship: null
        }
    },
    components: {
        RegisterType
    },
    computed: {

    },
    methods: {
        async register() {
            if(
                this.companyName !== "" &&
                this.companyNip !== "" &&
                this.companyAddress !== "" &&
                this.userName !== "" &&
                this.userLastName !== "" &&
                this.userEmail !== "" &&
                this.userPassword !== "" &&
                this.userPassword.length > 8 &&
                this.voivodeship !== null
            ) {
                this.error = false;
                this.errorMsg = "";

                const firebaseAuth = await firebase.auth();
                const createUser = await firebaseAuth.createUserWithEmailAndPassword(this.userEmail,this.userPassword);
                const result = await createUser;
                const database = db.collection("users").doc(result.user.uid);
                await database.set({
                    companyName: this.companyName,
                    companyNip: this.companyNip,
                    companyAddress: this.companyAddress,
                    companyCity: this.companyCity,
                    name: this.userName,
                    lastname: this.userLastName,
                    email: this.userEmail,
                    type: this.type,
                    phone: this.userTelephone,
                    voivodeship: this.voivodeship
                })
                this.$router.push({name:"Home"});
                return;
            }
            this.error = true;
            this.errorMsg = "Some fields are empty or password is too short"
        }
    
    }
}
</script>


<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,400;0,700;1,300&display=swap');
@import "../assets/styles/_variables.scss"; //wymagne w kazdym komponencie 
   .wrapper {
       display: flex;

       .left {
           flex:1;
           display: flex;
           flex-direction: column;
           align-items: center;
           justify-content: center;
           & form {
               margin: 30px 0;

               & .formBox {
                   display: flex;
                   align-items: center;
                   & input {
                       margin-left: 9px;
                       flex:1
                   }
                   & select {
                      border-radius: 30px;
                      background-color: #e6e3e3;
                      height: 40px;
                      margin-left: 9px;
                      flex:1
                   }
               }

               & input {
                   margin: 15px 0;
                   width:250px;
                   height: 40px;
                   border-radius: 30px;
                   background-color:#e6e3e3;
               }
               & button[type=submit] {
                   background-color: $secondaryColor;
                   color:#fff;
                   width:170px;
                   margin: 0 auto;
                   font-size: 14px;
                   height: 35px;
                   border:none;
                   border-radius: 30px;
                   font-weight: 700;
                   cursor:pointer;
               }
           }
           a {
               color: $secondaryColor;
           }

       }
       .right {
           flex:1;
           position: relative;
           height: 100vh;
           background-image: url(../assets/images/bannerImg4.jpg);
           background-repeat: no-repeat;
           background-size: cover;
           background-position: center;

           &::before {
               position: absolute;
               width:100%;
               top:0;
               left:0;
               opacity: .6;
               content:"";
               height: 100%;
               background-color:$secondaryColor;
           }
       }
   }
</style>