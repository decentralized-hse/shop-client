<template>
  <div class="delivery" style="width: 100%; min-height: 300px; margin: 20px 40px 20px 0; float: left;">
    <img :src="delivery.booking.item.image_url" style="max-width: 250px; height: 200px; float: left;"/>
    <div class="name"><b>наименование товара:</b> {{ delivery.booking.item.name }}</div>
    <div class="vendor"><b>поставщик:</b> {{ delivery.booking.item.vendor_id }}</div>
    <div class="price1"><b>цена товара:</b> {{ delivery.booking.price }}</div>
    <div class="price2"><b>цена доставки:</b> {{ delivery.price }}</div>
    <div class="summary"><b>итог:</b> {{ delivery.booking.price + delivery.price}}</div>
    <div class="div"><b>ожидаемое время прибытия:</b> {{ delivery.deliveryDate }}</div>
  </div>
</template>

<script>
export default {
  name: "BookingComponent",
  data() {
    return {
    };
  },
  props: {
    delivery: Object,
  },
}
</script>
<style scoped>

</style>
