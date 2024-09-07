import {StyleSheet} from 'react-native';
import {APP_COLORS} from '../../theme/colors';

export const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    color: APP_COLORS.primary,
    borderColor: APP_COLORS.gray,
    fontSize: 18,
  },
  container: {
    marginVertical: 15,
    width: '90%',
  },
});
