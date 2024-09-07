import {Dimensions, StyleSheet} from 'react-native';
import {APP_COLORS} from '../../theme/colors';
const {width, height} = Dimensions.get('window');
export const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: APP_COLORS.primary,
  },
  cardView: {
    maxHeight: height * 0.2,
    alignSelf: 'center',
    marginTop: 50,
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
});
