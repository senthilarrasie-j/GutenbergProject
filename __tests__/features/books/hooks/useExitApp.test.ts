import { renderHook, act } from '@testing-library/react-native';
import { BackHandler } from 'react-native';
import { useExitApp } from '@/features/books/hooks/useExitApp';

// Mock BackHandler
const mockRemove = jest.fn();
const mockAddEventListener = jest.fn(() => ({ remove: mockRemove }));
const mockExitApp = jest.fn();

jest.spyOn(BackHandler, 'addEventListener').mockImplementation(mockAddEventListener as any);
jest.spyOn(BackHandler, 'exitApp').mockImplementation(mockExitApp);

beforeEach(() => {
  jest.clearAllMocks();
  mockAddEventListener.mockReturnValue({ remove: mockRemove });
});

describe('useExitApp', () => {
  it('exitModalVisible starts as false', async () => {
    const { result } = await renderHook(() => useExitApp());
    expect(result.current.exitModalVisible).toBe(false);
  });

  it('registers hardwareBackPress listener on mount', async () => {
    await renderHook(() => useExitApp());
    expect(BackHandler.addEventListener).toHaveBeenCalledWith(
      'hardwareBackPress',
      expect.any(Function),
    );
  });

  it('removes listener on unmount', async () => {
    const { unmount } = await renderHook(() => useExitApp());
    await unmount();
    expect(mockRemove).toHaveBeenCalledTimes(1);
  });

  it('back press sets exitModalVisible=true', async () => {
    const { result } = await renderHook(() => useExitApp());
    const backAction = (mockAddEventListener as any).mock.calls[0][1];
    await act(async () => {
      backAction();
    });
    expect(result.current.exitModalVisible).toBe(true);
  });

  it('handleCancelExit sets exitModalVisible=false', async () => {
    const { result } = await renderHook(() => useExitApp());
    const backAction = (mockAddEventListener as any).mock.calls[0][1];
    await act(async () => { backAction(); });
    await act(async () => { result.current.handleCancelExit(); });
    expect(result.current.exitModalVisible).toBe(false);
  });

  it('handleExitApp calls BackHandler.exitApp', async () => {
    const { result } = await renderHook(() => useExitApp());
    await act(async () => { result.current.handleExitApp(); });
    expect(BackHandler.exitApp).toHaveBeenCalledTimes(1);
  });
});
