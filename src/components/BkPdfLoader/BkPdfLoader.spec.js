import { mount } from '@vue/test-utils';
import BkPdfLoader from '@/components/BkPdfLoader/BkPdfLoader.vue';
import localVue from '@/config/tests';

describe('BkPdfLoader component', () => {
  const defaultConfig = {
    localVue,
  };
  it('Should be render correctly', () => {
    const wrapper = mount(BkPdfLoader, defaultConfig);
    expect(wrapper.element).toMatchSnapshot();
  });
});
