import {FlatList, StyleSheet} from 'react-native';
import React from 'react';
import PaymentCard from '../../../Layout/Card/PaymentCard';
import dayjs from 'dayjs';
import {Status} from '../../../../types/uiType';
import {AllPaymentInterface} from '../../../../types/componentInterface';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import navigationStrings from '../../../../constants/navigationStrings';

const AllPayments: React.FC<AllPaymentInterface> = ({paymentListType}) => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  const fakeData = [
    {
      courseName: 'The Art of Marketing',
      paymentPara: 'The Art of Marketing',
      date: '2024-06-02T08:43:11Z',
      paymentType: 'Completed',
      price: 200,
    },
    {
      courseName: 'The Art of Marketing',
      paymentPara: 'The Art of Marketing',
      date: '2024-06-02T08:43:11Z',
      paymentType: 'Completed',
      price: 2200,
    },
    {
      courseName: 'The Art of Marketing',
      paymentPara: 'The Art of Marketing',
      date: '2024-06-02T08:43:11Z',
      paymentType: 'Upcoming',
      price: 2100,
    },
  ];

  const handlePaymentCard = (payementType: Status) => {
    if (payementType === 'Completed') {
      navigation.navigate(navigationStrings.PaymentsDetail, {
        type: 'full',
      });
    } else {
      navigation.navigate(navigationStrings.PaymentsDetail, {
        type: 'emi',
      });
    }
  };

  return (
    <FlatList
      data={fakeData}
      renderItem={({item}) => {
        return (
          <PaymentCard
            paymentTitle={item?.courseName}
            paymentParagraph={item?.paymentPara}
            price={item?.price}
            date={dayjs(item?.date).format('DD MMMM YYYY')}
            status={item?.paymentType as Status}
            handlePaymentCard={handlePaymentCard}
          />
        );
      }}
    />
  );
};

export default AllPayments;

const styles = StyleSheet.create({});
