import {StyleSheet} from 'react-native';
import {APP_COLORS} from '../../theme/colors';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: APP_COLORS.backgroundColor,
    padding: 15,
    flex: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: APP_COLORS.primary,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: '400',
    color: APP_COLORS.secondary,
    marginTop: 10,
  },
  titleView: {
    marginTop: 50,
    paddingLeft: 50,
  },
  body: {
    marginTop: 50,
    padding: 15,
    alignItems: 'center',
  },
  spacer: {
    marginVertical: 10,
  },
  buttonView: {
    marginTop: 50,
    alignItems: 'center',
  },
  createButtonView: {
    marginTop: 50,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    marginLeft: 5,
    color: APP_COLORS.primary,
    fontWeight: 'bold',
  },
  accountText: {
    marginLeft: 5,
    color: APP_COLORS.secondary,
    fontWeight: '400',
  },
});
