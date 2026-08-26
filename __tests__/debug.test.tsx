import { renderHook } from '@testing-library/react-native';

describe('test', () => {
  it('renderHook', async () => {
    const resHook = await renderHook(() => 1);
    console.log('AWAITED RENDERHOOK KEYS:', Object.keys(resHook));
    console.log('AWAITED RENDERHOOK RESULT:', resHook.result);
  });
});
