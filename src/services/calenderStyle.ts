import { Dimensions, StyleSheet } from 'react-native'
import colors from './colors'

const { width } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 24,
      },
      picker: {
        flex: 1,
        maxHeight: 74,
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'center',
      },
      /** Item */
      item: {
        flex: 1,
        height: 50,
        marginHorizontal: 4,
        paddingVertical: 6,
        paddingHorizontal: 4,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: colors.light_gray,
        flexDirection: 'column',
        alignItems: 'center',
      },
      itemRow: {
        width: width,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginHorizontal: -4,
      },
      itemWeekday: {
        fontSize: 13,
        fontWeight: '500',
        color: colors.dark_tin,
        marginBottom: 4,
      },
      itemDate: {
        fontSize: 15,
        fontWeight: '600',
        color: '#111',
      },
      /** Placeholder */
      placeholder: {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
        height: 400,
        marginTop: 0,
        padding: 0,
        backgroundColor: 'transparent',
      },
      placeholderInset: {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
      },
})