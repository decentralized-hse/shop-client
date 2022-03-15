<template>
  <div class="booking" style="width: 100%; min-height: 300px; margin: 20px 40px 20px 0; float: left;">
    <img :src="booking.item.image_url" style="max-width: 250px; height: 200px; float: left;"/>
    <div class="name"><b>наименование товара:</b> {{ booking.item.name }}</div>
    <div class="vendor"><b>поставщик:</b> {{ booking.item.vendor_id }}</div>
    <div class="price"><b>цена товара:</b> {{ booking.quantity }} x {{ booking.item.price }} = {{ booking.price }}</div>
    <button @click="getDeliveries()">рассчитать доставку</button>
    <button @click="cancelBooking()">отменить бронь</button>

    <div v-if="deliveries !== null">
      <br>
      <select v-model="delivery_index">
        <option v-for="(delivery, index) in deliveries" :key="delivery.company_id + '-' + delivery.id" :value="index">
          <b>служба доставки:</b> {{delivery.company_id}} <b>цена доставки:</b> {{ delivery.price }} <b>время доставки:</b> {{ delivery.deliveryDate }}
        </option>
      </select>
      <button @click="approvePurchase()">подтвердить покупку и выбрать доставку</button>
    </div>
  </div>
</template>

<script>

import {cancelBooking, confirmPurchase} from "@/hooks/shopAPI";
import {confirmDelivery, getDeliveries} from "@/hooks/deliveryAPI";
import {addDelivery} from "@/hooks/deliveries";
import {deleteBooking} from "@/hooks/bookings";
import router from "@/router";

export default {
  name: "BookingComponent",
  data() {
    return {
      deliveries: null,
      delivery_index: null,
    };
  },
  props: {
    booking: Object,
  },
  methods: {
    getDeliveries() {
      let weight = this.booking.item.weight * this.booking.quantity
      let volume = this.booking.item.volume * this.booking.quantity
      let fromAddress = this.booking.address
      let toAddress = "55.66,37.28"
      let time = this.booking.available_date
      const self = this

      getDeliveries(weight, volume, fromAddress, toAddress, time).then((response) => {
        self.deliveries = response
      })
    },
    cancelBooking() {
      deleteBooking(this.booking.item.vendor_id, this.booking.id)
      cancelBooking(this.booking.item.vendor_id, this.booking.id)
    },
    approvePurchase() {
      let delivery = this.deliveries[this.delivery_index]
      delivery.booking = this.booking
      try {
        confirmPurchase(delivery.booking.item.vendor_id, delivery.booking.id)
        confirmDelivery(delivery.company_id, delivery.id)
        deleteBooking(this.booking.item.vendor_id, this.booking.id)
        addDelivery(delivery)
        router.push("/deliveries")
      } catch (err) {
        alert("неизвестная ошибка. попробуй обновить страницу.")
      }
    }
  }
}
</script>
<style scoped>

</style>
