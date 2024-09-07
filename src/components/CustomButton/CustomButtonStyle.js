import {StyleSheet} from 'react-native';
import {APP_COLORS} from '../../theme/colors';

export const styles = StyleSheet.create({
  button: {
    backgroundColor: APP_COLORS.primary,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
    borderRadius: 10,
  },
  buttonText: {
    color: APP_COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
