import { mount } from '@vue/test-utils';
import BkCollapse from '@/components/BkCollapse/BkCollapse.vue';
import localVue from '@/config/tests';

describe('BkCollapse component', () => {
  const defaultConfig = {
    localVue,
  };
  it('Should be render correctly', () => {
    const wrapper = mount(BkCollapse, defaultConfig);
    expect(wrapper.element).toMatchSnapshot();
  });
});
