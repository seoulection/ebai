import {render, wait} from '@testing-library/vue'
import { shallowMount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'
import About from '@/views/About.vue'
import Contacts from '@/views/Contacts.vue'
import { getContacts } from '../../src/api/contacts'

jest.mock('../../src/api/contacts.js')

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})

describe('About.vue', () => {
  it('renders the About page', () => {
    const expected = 'This is an about page'
    const wrapper = shallowMount(About)
    expect(wrapper.text()).toMatch(expected)
  })
})

describe('Contacts.vue', () => {
  it('renders the Contact page', async () => {
    let data = [{"id":1,"name":"Hello","relationship":"World"}]
    getContacts.mockResolvedValueOnce(data)

    const { getByText } = render(Contacts)
    
    await wait(() => { 
      const actual = getByText(/Hello/i).textContent
      expect(actual).toEqual("Hello is World")
    })
    
  })
})
