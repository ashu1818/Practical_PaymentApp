import {Dimensions, StyleSheet} from 'react-native';
import {APP_COLORS} from '../../theme/colors';
const {width, height} = Dimensions.get('window');
export const styles = StyleSheet.create({
  container: {
    backgroundColor: APP_COLORS.backgroundColor,
    padding: 15,
    flex: 1,
  },
  title: {
    fontSize: 20,
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
  cardView: {
    maxHeight: height * 0.2,
    alignSelf: 'center',
    marginTop: 50,
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
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  backImage: {
    height: 18,
    width: 18,
    tintColor: APP_COLORS.primary,
  },
  subView: {
    flexDirection: 'row',
  },
  expiryButton: {
    justifyContent: 'center',
    flex: 1,
    width: '92%',
    alignSelf: 'center',
  },
});
