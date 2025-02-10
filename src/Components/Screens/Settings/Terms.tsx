// import {StyleSheet, Text, View} from 'react-native';
// import React from 'react';
// import fontFamily from '../../../styles/fontFamily';
// import colors from '../../../styles/colors';
// import commonStyles from '../../../styles/commonStyles';
// import {moderateScaleVertical, textScale} from '../../../styles/responsiveSize';

// function Terms() {
//   return (
//     <View style={[commonStyles.spacingCommon]}>
//       <Text style={styles.termsPara}>
//         Lorem Ipsum is simply dummy text of the printing and typesetting
//         industry. Lorem Ipsum has been the industry's standard dummy text ever
//         since the 1500s, when an unknown printer took a galley of type and
//         scrambled it to make a type specimen book. It has survived not only five
//         centuries, but also the leap into electronic typesetting, remaining
//         essentially unchanged
//       </Text>
//       <Text style={styles.termsPara}>
//         Lorem Ipsum is simply dummy text of the printing and typesetting
//         industry. Lorem Ipsum has been the industry's standard dummy text ever
//         since the 1500s, when an unknown printer took a galley of type and
//         scrambled it to make a type specimen book. It has survived not only five
//         centuries, but also the leap into electronic typesetting, remaining
//         essentially unchanged
//       </Text>
//     </View>
//   );
// }

// export default Terms;

// const styles = StyleSheet.create({
//   termsPara: {
//     fontFamily: fontFamily.Poppins_Regular,
//     color: colors.black,
//     marginVertical: moderateScaleVertical(12),
//     fontSize: textScale(14),
//     opacity:0.5,
//   },
// });

import AutoHeightWebView from 'react-native-autoheight-webview';
import React, { useState } from 'react';
import { View, Dimensions, ActivityIndicator } from 'react-native';
import colors from '../../../styles/colors';

const Terms = () => {
  const [loading, setLoading] = useState(true); // State to track loading

  return (
    <View style={{ flex: 1 }}>
      {loading && ( // Show loader if loading is true
        <ActivityIndicator
          size="large"
          color={colors.theme}
          style={{ position: 'absolute', top: '50%', left: '50%', transform: [{ translateX: -25 }, { translateY: -25 }] }}
        />
      )}
      <AutoHeightWebView
        style={{ width: Dimensions.get('window').width, marginTop: 35 }}
        customScript={`document.body.style.background = 'white';`}
        source={{ uri: 'https://admin.brightfuturekw.net/termsandconditions' }}
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
      />
    </View>
  );
};

export default Terms;