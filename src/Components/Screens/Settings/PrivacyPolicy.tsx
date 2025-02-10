import React, { useState } from 'react';
import { ActivityIndicator, Dimensions, View } from 'react-native';
import colors from '../../../styles/colors';

// function PrivacyPolicy(){

//   const webViewRef=useRef<any>();

//   const onMessageReceived = () =>{

//   }
//   return <View style={{flex:1}}>
//        <WebView
//           ref={webViewRef}
//           style={{
//             height: '100%',
//             backgroundColor: 'black',
//             width: '100%',
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}
//           onError={() => {}}
//           scrollEnabled={false}
//           allowsInlineMediaPlayback={true}
//           automaticallyAdjustContentInsets
//           onMessage={onMessageReceived}
//           source={{
//             html: `
//        <html >
//        <head>
//        <script type="text/javascript" src="//cdn.embed.ly/player-0.1.0.min.js"></script>
//        <script type="text/javascript" src="//assets.mediadelivery.net/playerjs/player-0.1.0.min.js"></script>
//        <script src="https://demo.myfatoorah.com/cardview/v2/session.js"></script>
//             <script>
//             var config = {
//               countryCode: "", // Here, add your Country Code you receive from InitiateSession Endpoint.
//               sessionId: "", // Here you add the "SessionId" you receive from InitiateSession Endpoint.
//               cardViewId: "card-element",
//               supportedNetworks: "v,m,md,ae"
//           };
//           myFatoorah.init(config);
//           myFatoorah.submit().then(
//             function (response) {
//                 // In case of success
//                 // Here you need to pass session id to you backend here
//                 var sessionId = response.sessionId;
//                 var cardBrand = response.cardBrand; //cardBrand will be one of the following values: Master, Visa, Mada, Amex
//                 var cardIdentifier = response.cardIdentifier; //cardIdentifier returns a unique cardIdentifier for each of the cards used
//             },
//             function (error) {
//                 // In case of errors
//                 console.log(error);
//             }
//         );
//         📘

//             </script>
//        </head>

//          <body>
//          <div id="card-element"></div>
//          </body>

//        </html>
//      `,
//           }}
//         />
//   </View>
// }

// export default PrivacyPolicy

// function PrivacyPolicy() {
//   return (
//     <ScrollView contentContainerStyle={[commonStyles.spacingCommon]}>
//     <Text style={styles.termsPara}>
//       Lorem Ipsum is simply dummy text of the printing and typesetting
//       industry. Lorem Ipsum has been the industry's standard dummy text ever
//       since the 1500s, when an unknown printer took a galley of type and
//       scrambled it to make a type specimen book. It has survived not only five
//       centuries, but also the leap into electronic typesetting, remaining
//       essentially unchanged
//     </Text>
//     <Text style={styles.termsPara}>
//       Lorem Ipsum is simply dummy text of the printing and typesetting
//       industry. Lorem Ipsum has been the industry's standard dummy text ever
//       since the 1500s, when an unknown printer took a galley of type and
//       scrambled it to make a type specimen book. It has survived not only five
//       centuries, but also the leap into electronic typesetting, remaining
//       essentially unchanged
//     </Text>
//     {/* <PdfViewContainer/> */}
//   </ScrollView>
//   );
// }

// export default PrivacyPolicy;

// const styles = StyleSheet.create({
//   termsPara: {
//     fontFamily: fontFamily.Poppins_Regular,
//     color: colors.black,
//     marginVertical: moderateScaleVertical(12),
//     fontSize: textScale(14),
//     opacity:0.5,
//   },
// });

// import {FlatList, StyleSheet, Text, View} from 'react-native';
// import React, {useState} from 'react';
// import {
//   moderateScale,
//   moderateScaleVertical,
//   textScale,
// } from '../../../styles/responsiveSize';
// import fontFamily from '../../../styles/fontFamily';
// import colors from '../../../styles/colors';

// const PrivacyPolicy = () => {
//   const tipData = [
//     {id: 1, price: "$10", selected: false, isPopular: false},
//     {id: 12, price: '$20', selected: false, isPopular: true},
//     {id: 13, price: "$30", selected: false, isPopular: false},
//     {id: 14, price: 'other', selected: false, isPopular: false},
//   ];
//   const [selected, setSelected] = useState();
//   return (
//     <View style={[styles.container]}>
//       <Text
//         style={{
//           fontFamily: fontFamily.Urbanist_SemiBold,
//           color: colors.black,
//           fontSize: textScale(14),
//           textTransform: 'uppercase',
//           marginBottom:moderateScale(10),
//         }}>
//         Tip Your Delivery Partner
//       </Text>

//       <FlatList
//         renderItem={({item}) => {
//           return (
//             <View style={styles.containerWhite}>
//               <Text
//                 style={{
//                   fontFamily: fontFamily.Urbanist_SemiBold,
//                   color: colors.black,
//                   fontSize: textScale(16),
//                   textTransform: 'uppercase',
//                 }}>
//                 {' '}
//                 {/* {item?.price > 30 ? `$ ${item?.price}` : item?.price} */}
//                 {`${item?.price}`}
//               </Text>
//               {item?.isPopular && (
//                 <View style={{width: '100%'}}>
//                   <Text
//                     style={{
//                       fontSize: textScale(12),
//                       fontFamily: fontFamily.Urbanist_SemiBold,
//                       backgroundColor: '#164631',
//                       color: colors.white,
//                       paddingVertical: moderateScaleVertical(3),
//                       textAlign: 'center',
//                       position: 'relative',
//                       top: moderateScale(2),
//                     }}>
//                     popular
//                   </Text>
//                 </View>
//               )}
//             </View>
//           );
//         }}
//         horizontal
//         contentContainerStyle={{
//           justifyContent: 'space-between',
//           width: '100%',
//           alignItems: 'center',
//         }}
//         scrollEnabled={false}
//         data={tipData}
//       />
//     </View>
//   );
// };

// export default PrivacyPolicy;

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#F5F7F7',
//     borderRadius: moderateScale(16),
//     height: moderateScaleVertical(120),
//     marginHorizontal: moderateScale(24),
//     marginVertical: moderateScaleVertical(12),
//     paddingVertical: moderateScaleVertical(20),
//     paddingHorizontal: moderateScale(16),
//   },
//   containerWhite: {
//     width: moderateScale(70),
//     height: moderateScale(50),
//     justifyContent: 'center',
//     alignItems: 'center',
//     overflow: 'hidden',

//     backgroundColor: colors.white,
//     borderRadius: moderateScale(8),
//     marginRight: moderateScale(12),
//   },
// });

import AutoHeightWebView from 'react-native-autoheight-webview';

const PrivacyPolicy = () => {
  const [loading, setLoading] = useState(true); // State to track loading

  return (
    <View style={{flex: 1}}>
       {loading && ( // Show loader if loading is true
        <ActivityIndicator
          size="large"
          color={colors.theme}
          style={{ position: 'absolute', top: '50%', left: '50%', transform: [{ translateX: -25 }, { translateY: -25 }] }}
        />
      )}
      <AutoHeightWebView
        style={{width: Dimensions.get('window').width, marginTop: 35}}
        customScript={`document.body.style.background = 'white';`}
        source={{uri: 'https://admin.brightfuturekw.net/privacypolicy'}}
        onSizeUpdated={size => console.log(size.height)}
        onLoadStart={() => setLoading(true)} // Start loader when page starts loading
        onLoadEnd={() => setLoading(false)} // Stop loader when page finishes loading
        files={[
          {
            href: 'cssfileaddress',
            type: 'text/css',
            rel: 'stylesheet',
          },
        ]}
        scalesPageToFit={true}
        viewportContent={'width=device-width, user-scalable=no'}
        /*
  other react-native-webview props
  */
      />
    </View>
  );
};

export default PrivacyPolicy;
