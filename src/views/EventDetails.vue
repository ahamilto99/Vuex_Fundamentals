<template>
  <div v-if="event.currentEvent">
    <h1>{{ event.currentEvent.title }}</h1>
    <p>
      {{ event.currentEvent.time }} on {{ event.currentEvent.date }} @
      {{ event.currentEvent.location }}
    </p>
    <p>{{ event.currentEvent.description }}</p>
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
    ...mapActions('event', ['fetchEvent'])
  }
}
</script>
