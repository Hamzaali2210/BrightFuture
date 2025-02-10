import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import WishListItem from '../../../Components/Screens/WishList';

function WishList() {
  return (
    <View style={{flex:1}}>
      <WishListItem />
    </View>
  );
}

export default WishList;

const styles = StyleSheet.create({});
