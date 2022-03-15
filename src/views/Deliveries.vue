<template>
  <div class="container" style="width: 60%; margin: auto;">
    <div class="header">
      <h1 style="font-size: 1.8em; font-weight: bold;" @click="$router.push('/'); searchString='';">Магазин</h1>
    </div>
    <div class="goods" style="">
      <h2 style="font-size: 1.4em;">Заказы:</h2>
      <div class="deliveries" v-if="deliveries !== null">
        <DeliveryComponent v-for="delivery in deliveries" :delivery="delivery" :key="delivery.company_id + '-' + delivery.id"/>
      </div>
    </div>
    <div class="deliveries" v-if="deliveries === null || deliveries.size === 0">
      заказов нет.
    </div>
  </div>
</template>

<script>
import DeliveryComponent from "@/components/DeliveryComponent";
import {getDeliveries} from "@/hooks/deliveries";

export default {
  name: "DeliveriesPage",
  components: {DeliveryComponent},
  props: {},
  data() {
    return {
      deliveries: null,
      // определиться как выглядит  объект delivery
      // company_id, time, price, booking {item, price}
    }
  },
  methods: {
    fetchDeliveries() {
      this.deliveries = getDeliveries();
    },
  },
  mounted() {
    this.fetchDeliveries()
  }
}
</script>

<style scoped>

</style>
