import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import commonStyles from '../../../../styles/commonStyles';
import {
  moderateScale,
  textScale,
  verticalScale,
} from '../../../../styles/responsiveSize';
import imagePath from '../../../../constants/imagePath';

import fontFamily from '../../../../styles/fontFamily';
import colors from '../../../../styles/colors';

type ItemProps = {title: string; assignmentNumber: number; date: string};

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
    assignmentNumber: 0,
    date: '26 Jan 2024',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
    assignmentNumber: 0,
    date: '26 Jan 2024',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    assignmentNumber: 0,
    date: '26 Jan 2024',
  },
];

function AssigmentContainer({ title, assignmentNumber, date }: ItemProps) {
  return (
    <TouchableOpacity>
      <View style={[styles.assignmentContainer]}>
        <View style={[styles.thumbnail]}>
          <Image
            source={imagePath.sampleTestImage}
            style={{ resizeMode: 'cover', height: '100%', width: '100%' }}
          />
        </View>
        <View style={[styles.textContainer]}>
          <Text style={[styles.textHeading]}>{title}</Text>
          <Text style={[styles.textPara]}>
{assignmentNumber} Assignments</Text>
          <Text style={[styles.textDate]}>{date}</Text>
        </View>
        <View>
          <Text>
            <Icon name="right" size={25} color={colors.black} />
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function AssignmentList() {
  return (
    <View style={[commonStyles.spacingCommon]}>
      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <AssigmentContainer
            title={item.title}
            date={item.date}
            assignmentNumber={item.assignmentNumber}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

export default AssignmentList;

const styles = StyleSheet.create({
  assignmentContainer: {
    marginVertical: verticalScale(12),
    flexDirection: 'row',
    alignItems: 'center',
    padding: moderateScale(12),
  },
  thumbnail: {
    width: moderateScale(80),
    height: moderateScale(80),
    borderRadius: moderateScale(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: moderateScale(12),
    height: '100%',
    gap: moderateScale(4),
    flex: 1,
  },
  textHeading: {
    fontFamily: fontFamily.Poppins_Medium,
    fontSize: textScale(16),
    color: colors.grey1,
  },
  textPara: {
    fontFamily: fontFamily.Poppins_Regular,
    fontSize: textScale(14),
    color: colors.grey1,
  },
  textDate: {
    fontFamily: fontFamily.Poppins_Regular,
    color: colors.grey1,
  },
});
