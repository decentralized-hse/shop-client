<template>
  <div class="container" style="width: 60%; margin: auto;">
    <div class="header">
      <h1 style="font-size: 1.8em; font-weight: bold;" @click="$router.push('/'); searchString='';">Магазин</h1>
    </div>
    <div class="goods" style="">
      <h2 style="font-size: 1.4em;">Бронирования товаров:</h2>
      <div class="bookings" v-if="bookings !== null">
        <BookingComponent v-for="booking in bookings" :booking="booking" :key="booking.item.vendor_id + '-' + booking.id"/>
      </div>
    </div>
    <div class="bookings" v-if="bookings === null || bookings.size === 0">
      бронирований нет.
    </div>
  </div>
</template>

<script>
import BookingComponent from "@/components/BookingComponent";
import {getBookings} from "@/hooks/bookings";

export default {
  name: "BookingsPage",
  components: {BookingComponent},
  props: {},
  data() {
    return {
      vendor: this.$route.query.vendor,
      booking_id: this.$route.query.booking_id,
      bookings: null,
    }
  },
  methods: {
    fetchBookings() {
      let allBookings = getBookings()
      if (this.vendor !== undefined) {
        allBookings = allBookings.filter((booking) => (booking.item.vendor_id === this.vendor))
      }
      if (this.booking_id !== undefined) {
        allBookings = allBookings.filter((booking) => (booking.id === this.booking_id))
      }
      this.bookings = allBookings
    },
  },
  mounted() {
    this.fetchBookings()
  }
}
</script>

<style scoped>

</style>