<template>
    <div class="wrapper">
        <div class="info">
          <div class="merchantInfo">
            <h2>Merchant Name</h2>
            <p> 44-444 City</p>
            <p>street 99</p>
            <p>merchant@gmailcom</p>
            <p>987 654 321</p>
          </div>

          <div class="itemsInfo">
            <h2>Merchant Sales</h2>
            <p>All offers: 99</p>
            <p>Sold items: 54</p>
            <p>Active offers: 67</p>
          </div>
        </div>

        <div class="allOffers">
            <h2>Active merchant offers</h2>
            <div class="offersWrapper">
                 <div>
                     oferta 1
                 </div>

                 <div>
                     oferta 2
                 </div>

                 <div>
                     oferta 3
                 </div>

                 <div>
                     oferta 4
                 </div>

                 <div>
                     oferta 5
                 </div>

                 <div>
                     oferta 6
                 </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>

    .wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    
    .info {
        display: flex;
        width:100%;
        max-width: 1152px;
        justify-content: space-between;
        padding:25px;
        & > div {
            margin:20px;

            & > p {
                margin-top: 9px;
            }
        }
        .merchantInfo {
            text-align:left;
        }
        .itemsInfo {
            text-align: left;
        }
    }

    .allOffers {
        max-width: 1152px;

        .offersWrapper {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;

            & > div {
                width:300px;
                height: 250px;
                border:1px solid black;
                margin:20px;

            }
        }
    }

    @media(max-width:768px) {
        .info {
            flex-direction: column;
            align-items: center;
        }
    }
</style>