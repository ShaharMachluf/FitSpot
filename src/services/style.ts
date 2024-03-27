import { StyleSheet } from 'react-native'
import colors from './colors'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.light_tin,
        justifyContent: 'center',
      },
      logo_container: {
        flexDirection: "row",
        justifyContent: "center",
      },
      title: {
        color: '#000',
        marginLeft: -14,
        fontSize: 50,
        fontFamily: "RobotoCondensed-Bold",
      },
      add_title: {
        color: '#000',
        fontSize: 30,
        marginBottom: 10,
        fontFamily: "RobotoCondensed-Bold"
      },
      form_container: {
        width: "100%",
        marginTop: 30,
        paddingHorizontal: 20
      },
      add_container:{
        width:"90%",
        padding: 25,
        marginHorizontal: "5%",
        backgroundColor: colors.light_tin,
        borderRadius: 10
      },
      outline_btn:{
        width:'100%',
        borderColor:colors.dark_orange,
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
      add_class_btn: {
        borderRadius:0
      },
      input: {
        backgroundColor: colors.white,
        borderRadius: 12,
        padding: 10,
        width: "100%",
        fontSize: 18,
        fontFamily: "Raleway-Medium",
        marginBottom:12,
      },
      checkBoxContainer:{
        flexDirection: 'row',
        alignItems: "center",
        marginBottom: 10
      },
      checkBoxTxt:{
        fontFamily: "Raleway-Medium",
        fontSize: 18
      },
      date_time_btn: {
        backgroundColor: colors.dark_tin,
        borderRadius: 12,
        padding: 12,
        fontSize: 18,
        alignItems: "center",
        marginBottom: 12
      },
      time_container: {
        flexDirection: 'row',
        alignItems: "center",
        marginBottom: 10,
        justifyContent: "space-between"
      },
      time_txt: {
        fontSize: 12
      },
      class_item: {
        backgroundColor: colors.white,
        borderRadius: 10,
        marginBottom: 10,
        marginHorizontal: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5
      },
      hours: {
        color: "#bcbcbc",
        fontFamily: "Raleway-Medium",
        fontSize: 15
      },
      name: {
        color: colors.dark_orange,
        fontFamily: "Raleway-Bold",
        fontSize: 20
      },
      trainer: {
        color: colors.light_orange,
        fontFamily: "Raleway-Medium",
        fontSize: 17
      },
      participants: {
        fontFamily: "Raleway-Medium",
        fontSize: 15
      },
      class_item_btn_container: {
        alignItems: 'center',
        width: '100%',
        marginVertical: 5

      },
      update_txt: {
        color: colors.dark_tin,
        fontSize: 17
      },
      img_view: {
        position: 'absolute',
        zIndex: 1,
        justifyContent: 'center',
        top: 0,
        left: 0,
        right: 0,
        marginTop: 5
      },
      upcoming_title: {
        fontFamily: "RobotoCondensed-Bold",
        marginTop: 40,
        marginLeft: 5,
        fontSize: 20
      }
})
