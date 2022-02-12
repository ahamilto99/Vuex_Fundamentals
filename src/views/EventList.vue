<template>
  <h1>Events for {{ user.userInfo.name }}</h1>
  <div class="events">
    <EventCard v-for="event in event.events" :key="event.id" :event="event" />
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'EventList',
  components: {
    EventCard
  },
  async created() {
    try {
      await this.fetchEvents()
    } catch (e) {
      this.$router.push({ name: 'ErrorDisplay', params: { error: e } })
    }
  },
  computed: {
    ...mapState(['event', 'user']) // modules names
  },
  methods: {
    ...mapActions('event', ['fetchEvents'])
  }
}
</script>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
