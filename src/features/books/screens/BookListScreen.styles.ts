import { StyleSheet } from 'react-native';
import { Theme } from '@/ui/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: Theme.colors.background,
  },
  backButton: {
    marginRight: 12,
  },
  backArrow: {
    fontSize: 32,
    fontFamily: Theme.fonts.semiBold,
    color: Theme.colors.primary,
  },
  title: {
    fontSize: 32,
    fontFamily: Theme.fonts.semiBold,
    color: Theme.colors.primary,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.greyLight,
    borderRadius: 4,
    marginHorizontal: 24,
    marginBottom: 16,
    paddingHorizontal: 12,
    height: 40,
  },
  searchIcon: {
    marginRight: 8,
    fontSize: 16,
    color: Theme.colors.greyMedium,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: Theme.fonts.regular,
    color: Theme.colors.greyDark,
    padding: 0,
  },
  clearButton: {
    padding: 4,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  row: {
    justifyContent: 'flex-start',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  errorText: {
    fontSize: 16,
    fontFamily: Theme.fonts.regular,
    color: 'red',
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    fontFamily: Theme.fonts.regular,
    color: Theme.colors.greyMedium,
  },
  footerLoader: {
    paddingVertical: 16,
    alignItems: 'center',
  },
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
  modalButton: {
    backgroundColor: Theme.colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 4,
  },
  modalButtonText: {
    fontSize: 16,
    fontFamily: Theme.fonts.semiBold,
    color: '#FFFFFF',
  },
  offlineBanner: {
    backgroundColor: '#FEE2E2',
    paddingVertical: 8,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#FCA5A5',
  },
  offlineText: {
    color: '#991B1B',
    fontFamily: Theme.fonts.semiBold,
    fontSize: 14,
    marginLeft: 6,
  },
});

