// NotificationList.js

import React from 'react';
import { View, Text, FlatList } from 'react-native';
import EmptyScreen from '../../EmptyScreen';
import imagePath from '../../../constants/imagePath';

const notifications = [
    { id: 1, title: 'Notification 1', date: '2024-01-25T10:30:00' },
    { id: 2, title: 'Notification 2', date: '2024-01-24T15:45:00' },
    { id: 3, title: 'Notification 3', date: '2024-01-24T12:00:00' },
    { id: 4, title: 'Notification 4', date: '2024-01-23T08:20:00' },
    { id: 5, title: 'Notification 5', date: '2024-01-22T18:55:00' },
      // Add more notifications as needed
];


const formatTimestamp = (timestamp:Date) => {
  const options:any = { hour: 'numeric', minute: 'numeric', hour12: true };
  return new Intl.DateTimeFormat('en-US', options).format(new Date(timestamp));
};

const getFormattedDate = (dateString:Date) => {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
};

const NotificationList = () => {
  const sortedNotifications = notifications.sort((a, b) => new Date(b.date) - new Date(a.date));

  const groupedNotifications:any = {};
  sortedNotifications.forEach((notification:any) => {
    const dateKey = getFormattedDate(notification.date);
    groupedNotifications[dateKey] = groupedNotifications[dateKey] || [];
    groupedNotifications[dateKey].push(notification);
  });
 
  return (
    <FlatList
      data={[]}
      scrollEnabled={false}
      ListEmptyComponent={() => {
        return (
          <EmptyScreen
            image={imagePath.notificationEmpty}
            heading={'Your Notification is empty'}
            description={`Looks like you have not added anything to you cart yet. Go ahead & explore top categories.`}
          />
        );
      }}
      keyExtractor={(item) => item[0]}
      renderItem={({ item }:any) => (
        <>
          <Text style={styles.header}>{item[0]}</Text>
          {item[1].map((notification:any) => (
            <View key={notification.id} style={styles.notificationItem}>
              <Text>{notification.title}</Text>
              <Text>{formatTimestamp(notification.date)}</Text>
            </View>
          ))}
        </>
      )}
    />
  );
};

const styles = {
  header: {
    fontSize: 18,
    // fontWeight: "500",
    padding: 10,
    backgroundColor: '#e0e0e0',
  },
  notificationItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
};

export default NotificationList;
