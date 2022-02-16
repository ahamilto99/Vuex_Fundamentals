import { mount } from '@vue/test-utils'
import EventList from '@/views/EventList.vue'
import store from '@/store'
import router from '@/router'

describe('EventList', () => {
  it('Render events', () => {
    // setup
    const wrapper = mount(EventList, {
      global: {
        plugins: [store, router]
      }
    })
    // find
    const title = wrapper.get('[data-testid="event-list-title"]')
    // no interact
    // assert
    expect(title.exists()).toBeTruthy()
    expect(title.text()).toContain('Events for Good')
  })
})
