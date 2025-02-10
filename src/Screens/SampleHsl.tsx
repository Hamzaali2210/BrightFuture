import React from 'react';
import { Text } from 'react-native';
import { View, StyleSheet } from 'react-native';
import Video from 'react-native-video';

const SampleHsl = () => {
  return (
    <View style={styles.container}>
        <Text>Prince Sapra</Text>
      <Video
        source={{ uri: 'https://vz-e74d04f1-f8b.b-cdn.net/1edfdf81-2e7e-419b-a594-b1948c1c5cfc/playlist.m3u8' }} // Replace with your video URL
        style={styles.video}
        controls={true}
        resizeMode="contain"
        // fullscreen

      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  video: {
    width: '100%',
    height: 300,
    backgroundColor:"red"
  },
});

export default SampleHsl;
