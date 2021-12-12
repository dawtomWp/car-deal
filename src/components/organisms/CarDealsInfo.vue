<template>
    <div class="wrapper">
         <svg class="svg1" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
             <path fill="#FF0066" d="M34.6,-50.2C46.8,-46.1,59.7,-39.7,70.3,-28.6C80.9,-17.5,89.1,-1.7,85.2,10.9C81.3,23.6,65.3,33.1,53.1,44.5C40.9,55.8,32.5,68.9,22.7,67.2C12.9,65.5,1.7,48.9,-12.8,44.3C-27.3,39.7,-45,47.1,-48.1,42.3C-51.1,37.6,-39.4,20.8,-38.8,7.2C-38.3,-6.4,-48.9,-16.8,-47.2,-22C-45.5,-27.1,-31.4,-27,-21.4,-32C-11.5,-37,-5.8,-47.2,2.8,-51.5C11.3,-55.8,22.5,-54.2,34.6,-50.2Z" transform="translate(100 100)" />
        </svg>
          <h2><span>K</span>im jesteśmy</h2>
          <p>CarDeals to portal dla sprzedawców, kurierów oraz klientów. 
              Naszym głównym założeniem jest możliwość zakupu pojazdu bez wychodzenia z domu, Nie ważne w jakiej części Polski mieszkasz, dzięki usługom kurierskim twój nowy samochód po potwierdzeniu zgodności opisu ze stanem faktycznym przyjedzie do ciebie. CarDeals to portal dla sprzedawców, kurierów oraz klientów. 
              Naszym głównym założeniem jest możliwość zakupu pojazdu bez wychodzenia z domu, Nie ważne w jakiej części Polski mieszkasz, dzięki usługom kurierskim twój nowy samochód po potwierdzeniu zgodności opisu ze stanem faktycznym przyjedzie do ciebie.
          </p>
           <p>CarDeals to portal dla sprzedawców, kurierów oraz klientów. 
              Naszym głównym założeniem jest możliwość zakupu pojazdu bez wychodzenia z domu, Nie ważne w jakiej części Polski mieszkasz, dzięki usługom kurierskim twój nowy samochód po potwierdzeniu zgodności opisu ze stanem faktycznym przyjedzie do ciebie.
          </p>
          <button>Więcej o CarDeals</button>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
     .wrapper {
         max-width: 1152px;
         display: flex;
         position:relative;
         flex-direction: column;
         align-items: center;
         margin: 40px auto;
         padding: 45px;
         button {
             margin-top: 30px;
             width:120px;
         }
         p {
             margin-top: 20px;
         }
         svg {
             position: absolute;
             opacity:.05;
             width:500px;
             left:-20%;
             top:0;
         }
     }
</style>