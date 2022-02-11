import { createStore } from 'vuex'
import EventService from '@/services/EventService.js'

export default createStore({
  state: {
    user: 'Adam Jahr',
    events: []
  },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event)
    },
    SET_EVENTS(state, events) {
      state.events = events
    },
    SET_EVENT(state, event) {
      state.event = event
    }
  },
  actions: {
    // { commit } is the context obj
    async createEvent({ commit }, event) {
      try {
        await EventService.postEvent(event)
        // we are within the store so we don't need to access it as a global object
        commit('ADD_EVENT', event) // adds event to Vuex state (events[])
      } catch (e) {
        console.log(e)
      }
    },
    async fetchEvents({ commit }) {
      try {
        const response = await EventService.getEvents()
        commit('SET_EVENTS', response.data)
      } catch (e) {
        console.log(e)
      }
    },
    async fetchEvent({ commit, state }, id) {
      const existingEvent = state.events.find(event => event.id === id)
      if (existingEvent) {
        // don't need the API call
        commit('SET_EVENT', existingEvent)
      } else {
        try {
          const response = await EventService.getEvent(id)
          commit('SET_EVENT', response.data)
        } catch (e) {
          console.log(e)
        }
      }
    }
  },
  modules: {}
})
