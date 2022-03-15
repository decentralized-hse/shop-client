
<template>
  <div class="item" style="width: 300px; height: 300px; margin: 20px 40px 20px 0; float: left;">
    <img :src="item.image_url" style="max-width: 250px; height: 200px;"/>
    <div class="name">{{ item.name }}</div>
    <div class="addr">{{ item.street_address }}</div>
    <div class="price">{{ item.price }} гривен</div>
    <input v-model="quantity" style="width: 30px;"/><button @click="book()">купить</button>
  </div>
</template>

<script>
import {bookItem} from "@/hooks/shopAPI";
import {addBooking} from "@/hooks/bookings";
import router from "@/router";

export default {
  name: "ItemComponent",
  data() {
    return {
      quantity: 1,
    };
  },
  props: {
    item: Object,
  },
  methods: {
    book() {
      try {
        bookItem(this.item.vendor_id, this.item.id, this.quantity).then((response) => {
          let bookingInfo = response
          bookingInfo.item = this.item;
          bookingInfo.quantity = this.quantity;
          bookingInfo.price = this.quantity * this.item.price;
          addBooking(bookingInfo)
          // router.push("/bookings?vendor=" + bookingInfo.item.vendor_id + "&booking_id=" + bookingInfo.id)
          router.push("/bookings")
        })
      } catch (err) {
        alert("неизвестная ошибка. попробуй обновить страницу.")
      }
    }
  }
}
</script>
<style scoped>

</style>