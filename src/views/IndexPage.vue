<template>
  <div class="container" style="width: 60%; margin: auto;">
    <div class="header">
      <h1 style="font-size: 1.8em; font-weight: bold;" @click="$router.push('/'); searchString='';">Магазин</h1>
    </div>
    <div class="goods" style="">
      <h2 style="font-size: 1.4em;">Товары:</h2>
      <div class="search" style="width: max-content; margin-right: 0; margin-left: auto">
        <input v-model="searchString"/>
        <button @click="searchByString()">поиск</button>
      </div>
      <div class="items" v-if="items !== null">
          <ItemComponent v-for="item in items" :item="item" :key="item.vendor_id + '-' + item.id"/>
      </div>
    </div>
    <div class="items" v-if="items === null || items.size === 0">
      товаров не найдено.
    </div>
  </div>
</template>

<script>
import router from "@/router";
import ItemComponent from "@/components/ItemComponent";
import {getItemsByString} from "@/hooks/shopAPI";

export default {
  name: 'IndexPage',
  components: {ItemComponent},
  props: {},
  data() {
    return {
      searchString: this.$route.query.search === undefined ? '' : this.$route.query.search,
      items: null,
    }
  },
  methods: {
    searchByString() {
      if (this.searchString === undefined || this.searchString === '') {
        router.push("/")
      } else {
        router.push("?search=" + this.searchString)
      }
      this.fetchItems()
    },
    fetchItems() {
      const self = this
      getItemsByString(this.searchString).then((response) => {
        self.items = response
      })
    }
  },
  mounted() {
    this.fetchItems()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
