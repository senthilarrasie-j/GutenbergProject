import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { CustomModal } from '@/features/books/components/CustomModal';

describe('CustomModal', () => {
  it('renders title and message when visible', async () => {
    const { getByText } = await render(
      <CustomModal
        visible={true}
        title="Error"
        message="Something went wrong"
        onClose={jest.fn()}
      />,
    );
    expect(getByText('Error')).toBeTruthy();
    expect(getByText('Something went wrong')).toBeTruthy();
  });

  it('renders default Close button when no buttons prop', async () => {
    const { getByText } = await render(
      <CustomModal
        visible={true}
        title="Test"
        message="Test message"
        onClose={jest.fn()}
      />,
    );
    expect(getByText('Close')).toBeTruthy();
  });

  it('calls onClose when default Close button pressed', async () => {
    const onClose = jest.fn();
    const { getByText } = await render(
      <CustomModal
        visible={true}
        title="Test"
        message="Test message"
        onClose={onClose}
      />,
    );
    fireEvent.press(getByText('Close'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('renders custom buttons', async () => {
    const { getByText } = await render(
      <CustomModal
        visible={true}
        title="Exit App"
        message="Do you want to exit?"
        onClose={jest.fn()}
        buttons={[
          { text: 'Cancel', onPress: jest.fn(), type: 'cancel' },
          { text: 'Exit', onPress: jest.fn(), type: 'primary' },
        ]}
      />,
    );
    expect(getByText('Cancel')).toBeTruthy();
    expect(getByText('Exit')).toBeTruthy();
  });

  it('calls correct onPress for each custom button', async () => {
    const onCancel = jest.fn();
    const onExit = jest.fn();
    const { getByText } = await render(
      <CustomModal
        visible={true}
        title="Exit App"
        message="Do you want to exit?"
        onClose={jest.fn()}
        buttons={[
          { text: 'Cancel', onPress: onCancel, type: 'cancel' },
          { text: 'Exit', onPress: onExit, type: 'primary' },
        ]}
      />,
    );
    fireEvent.press(getByText('Cancel'));
    expect(onCancel).toHaveBeenCalledTimes(1);
    expect(onExit).not.toHaveBeenCalled();

    fireEvent.press(getByText('Exit'));
    expect(onExit).toHaveBeenCalledTimes(1);
  });
});
