import { StyleSheet } from 'react-native'
import colors from './colors'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.light_tin,
        // alignItems: 'center',
        justifyContent: 'center'
      },
      logo_container: {
        flexDirection: "row",
        justifyContent: "center",
        // alignItems: "center",
      },
      title: {
        color: '#000',
        marginLeft: -14,
        fontSize: 50,
        fontFamily: "RobotoCondensed-Bold",
      },
      form_container: {
        width: "100%",
        marginTop: 30,
        paddingHorizontal: 20
      },
      outline_btn:{
        width:'100%',
        borderColor:colors.dark_orange,
        // backgroundColor: colors.white,
        borderWidth:1,
        fontSize: 18,
        alignItems: "center",
        borderRadius: 12,
        padding: 12,
        marginTop:12
    },
    outline_btn_txt:{
        fontFamily: "Raleway-Medium",
        fontSize: 16,
        color: colors.dark_orange,
    },
    btn_txt: {
        fontFamily: "Raleway-Medium",
        fontSize: 20,
        color: colors.white,
      },
      btn: {
        backgroundColor: colors.dark_orange,
        borderRadius: 12,
        padding: 12,
        width: "100%",
        fontSize: 18,
        alignItems: "center",
      },
      input: {
        backgroundColor: colors.white,
        borderRadius: 12,
        padding: 10,
        width: "100%",
        fontSize: 18,
        fontFamily: "Raleway-Medium",
        marginBottom:12
      },
})
