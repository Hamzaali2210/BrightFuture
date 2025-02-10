import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {
  moderateScaleVertical,
  scale,
  verticalScale,
  width,
} from '../../../../styles/responsiveSize';
import ReviewItem from './ReviewItem';
import commonStyles from '../../../../styles/commonStyles';
import {mainStrings} from '../../../../constants/mainstrings';
import CategoryDetailItem from '../../Home/CategoryDetailItem';

const commonData = [
  {id: 1, title: mainStrings.Science, courseName: 'Maths'},
  {id: 2, title: mainStrings.Maths, courseName: 'Maths'},
  {id: 3, title: mainStrings.Art, courseName: 'Maths'},
  {id: 4, title: mainStrings.Business, courseName: 'Maths'},
  {id: 4, title: mainStrings.Business, courseName: 'Maths'},
  {id: 4, title: mainStrings.Business, courseName: 'Maths'},
  {id: 4, title: mainStrings.Business, courseName: 'Maths'},
  {id: 4, title: mainStrings.Business, courseName: 'Maths'},
  {id: 4, title: mainStrings.Business, courseName: 'Maths'},
];
type ItemProps = {
  title: string;
  courseName: string;
};
function Item({ title, courseName }: ItemProps) {
  return (
    <ReviewItem
      title={title}
      courseName={courseName}
      containerStyle={{
        width: width / 2.4,
        margin: moderateScaleVertical(8),
        marginBottom: moderateScaleVertical(12),
      }}
    />
  );
}

function ReviewList() {
  return (
    <View style={[styles.container, commonStyles.spacing]}>
      <FlatList
        numColumns={2}
        data={commonData}
        nestedScrollEnabled
        renderItem={({ item }) => (
          <Item title="string" courseName={item.courseName} />
        )}
      />
    </View>
  );
}

export default ReviewList;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: moderateScaleVertical(10),
    marginBottom: verticalScale(30),
  },
});
