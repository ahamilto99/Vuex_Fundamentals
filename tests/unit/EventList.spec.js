import EventList from '@/views/EventList'
import { mount } from '@vue/test-utils'
import router from '@/router'
import { createStore } from '@/store'
// imports test events from "json-server db"
import { events as mockEvents } from '../../db.json'

// either mock EventService or the store's initial state (code below uses this)
function mountEventList(config = {}) {
  config.mountOptions = config.mountOptions || {}
  config.plugins = config.plugins || {}
  return mount(EventList, {
    global: {
      plugins: [createStore(config.plugins.store), router]
    },
    ...config.mountOptions
  })
}

let wrapper

describe('EventList', () => {
  beforeEach(() => {
    wrapper = mountEventList()
  })

  describe('events', () => {
    it('renders list of events', () => {
      // setup
      wrapper = mountEventList({
        plugins: {
          store: {
            state: () => ({
              events: mockEvents
            })
          }
        }
      })
      // find
      const events = wrapper.findAll('[data-testid=event]')
      // no interact
      // asserts
      expect(events).toHaveLength(mockEvents.length)
      events.forEach((event, i) => {
        const eventText = event.text()
        expect(eventText).toContain(mockEvents[i].title)
        expect(eventText).toContain(mockEvents[i].date)
      })
    })
  })

  describe('page title', () => {
    it('is rendered with the correct text', () => {
      const title = wrapper.find('[data-testid=event-list-title]')
      expect(title.exists()).toBeTruthy()
      expect(title.text()).toContain('Events for Good')
    })
  })
})
