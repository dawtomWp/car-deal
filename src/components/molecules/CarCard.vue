<template>
<router-link :to="{name:'Car', params: {carId: car.carId}}">
  <div class="card">
      <div class="cardTop">
         <img :src="car.carImages[0]" alt="">
      </div>

      <div class="cardBody">
          <div class="soldCar" v-show="!car.forSale">Sprzedano</div>
          <h5>({{car.carOwner}})</h5>
        <h3>{{car.carBrand}} {{car.carModel}}</h3>
        <div class="carInfo">
            <p>Rocznik: {{car.carYear}}</p>
            <p>Przebieg: {{car.carMilleage}} km</p>
            <p>Paliwo: {{car.carFuel}}</p>
            <p>Silnik: {{car.carEngineCapacity}} cm3, {{car.carEnginePower}} KM</p>
        </div>
      </div>

      <div class="priceAndBuy">
          <h3>{{car.carPrice}} zł</h3>
          <a href="">Więcej</a>
      </div>
    
    
  </div>
</router-link>

</template>


<script>

export default {
    name: 'CarCard',
    props: ['car']
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,400;0,700;1,300&display=swap');
@import "../../assets/styles/_variables.scss"; //wymagne w kazdym komponencie 
  .card {
      width:250px;
      margin: 10px;
      position: relative;
      min-height: 300px;
      background-color: #FFF;
      box-shadow: 0px 7px 14px 1px rgb(201, 201, 201);

      .cardBody {
          padding: 10px;
          h3 {
              display: flex;
              align-self: flex-start;
              text-transform: capitalize;
          }
          h5 {
              text-align: left;
              color:$secondaryTextColor
          }
          p {
              font-size: 14px;
          }
      }

      & img {
          width:100%;
          height: 150px;
      }

      .carInfo {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: space-between;
          & p {
              margin-top: 7px;
          }
      }
      .priceAndBuy {
          color: $secondaryTextColor;
          font-size: 24px;
          text-align: left;
          padding: 10px;
          display: flex;
          justify-content: space-between;

          & a {
              background-color: $primaryTextColor;
              color:white;
              padding: 2px 8px;
              font-size: 18px;
              line-height: 30px;
              border-radius: 30px;
              box-shadow: 0px 9px 15px 1px rgb(95, 95, 95);
              font-weight: 400;
          }
      }
      .soldCar {
          position:absolute;
          top:0;
          left:0;
          width:100%;
          height: 100%;
          background-color: rgba(199, 6, 6, 0.616);
          color: white;
          line-height: 250px;
          font-size: 34px;
      }

  }
</style>
