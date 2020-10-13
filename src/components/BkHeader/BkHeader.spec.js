import { shallowMount, mount } from '@vue/test-utils';
import BkHeader from '@/components/BkHeader/BkHeader.vue';
import localVue from '@/config/tests';

describe('BkHeader component', () => {
  const defaultConfig = {
    localVue,
  };
  it('renders props.title when passed', () => {
    const title = 'New title';
    const wrapper = shallowMount(BkHeader, {
      ...defaultConfig,
      propsData: { title },
    });
    expect(wrapper.text()).toMatch(title);
  });
  it('Should be render correctly', () => {
    const wrapper = mount(BkHeader, defaultConfig);
    expect(wrapper.element).toMatchSnapshot();
  });
});
