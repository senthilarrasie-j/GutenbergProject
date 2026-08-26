import { StyleSheet } from 'react-native';
import { Theme } from '@/ui/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  header: {
    paddingTop: 16,
    paddingBottom: 24,
    backgroundColor: Theme.colors.background,
  },
  title: {
    fontSize: 48,
    fontFamily: Theme.fonts.semiBold,
    color: Theme.colors.primary,
    lineHeight: 52,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: Theme.fonts.regular,
    color: Theme.colors.greyDark,
    lineHeight: 22,
  },
  list: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  card: {
    backgroundColor: '#FFFFFF',
    height: 50,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 12,
    // iOS shadow
    shadowColor: 'rgb(211, 209, 238)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    // Android shadow
    elevation: 3,
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 20,
    fontFamily: Theme.fonts.regular,
    color: Theme.colors.greyDark,
  },
  arrow: {
    fontSize: 18,
    color: Theme.colors.primary,
    fontFamily: Theme.fonts.semiBold,
  },
});

export const exitStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: Theme.fonts.semiBold,
    color: Theme.colors.primary,
    marginBottom: 12,
  },
  modalText: {
    fontSize: 16,
    fontFamily: Theme.fonts.regular,
    color: Theme.colors.greyDark,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 4,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  cancelButton: {
    backgroundColor: Theme.colors.greyLight,
  },
  confirmButton: {
    backgroundColor: Theme.colors.primary,
  },
  cancelButtonText: {
    fontSize: 16,
    fontFamily: Theme.fonts.semiBold,
    color: Theme.colors.greyDark,
  },
  confirmButtonText: {
    fontSize: 16,
    fontFamily: Theme.fonts.semiBold,
    color: '#FFFFFF',
  },
});
