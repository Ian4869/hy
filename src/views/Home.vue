<template>
  <div class="home">
    <Bill></Bill>
  </div>
</template>

<script>
// @ is an alias to /src
import Bill from '@/views/tools/bill.vue'

export default {
  name: 'Home',
  components: {
    Bill
  }
}
</script>
