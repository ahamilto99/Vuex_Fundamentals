<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
    <p>{{ event.description }}</p>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  props: ['id'],
  async created() {
    try {
      await this.fetchEvent(this.id)
    } catch (e) {
      this.$router.push({ name: 'ErrorDisplay', params: { error: e } })
    }
  },
  computed: {
    ...mapState(['event'])
  },
  methods: {
    ...mapActions(['fetchEvent'])
  }
}
</script>
