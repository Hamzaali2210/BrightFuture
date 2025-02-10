// import React, {useState, useEffect} from 'react';
// import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
// import {Agenda} from 'react-native-calendars';

// const AgendaComponent = () => {
//   const [items, setItems] = useState({});
//   const [isLoading, setIsLoading] = useState(true);

//   // Sample data
//   const events = {
//     '2024-04-01': [
//       {
//         name: 'Event 1',
//         time: '10:00 AM',
//         location: 'Location 1',
//         description: 'Description of Event 1',
//       },
//       {
//         name: 'Event 2',
//         time: '2:00 PM',
//         location: 'Location 2',
//         description: 'Description of Event 2',
//       },
//     ],
//     '2024-04-05': [
//       {
//         name: 'Event 3',
//         time: '3:00 PM',
//         location: 'Location 3',
//         description: 'Description of Event 3',
//       },
//     ],
//     // Add your events here
//   };

//   // Process events data into Agenda-compatible format
//   const loadItems = day => {
//     setTimeout(() => {
//       const formattedItems = {};
//       Object.keys(events).forEach(date => {
//         formattedItems[date] = events[date].map((event, index) => ({
//           ...event,
//           time: event.time,
//         }));
//       });
//       setItems(formattedItems);
//       setIsLoading(false);
//     }, 0); // Simulating asynchronous data loading
//   };

//   // Render each item in the agenda
//   const renderItem = item => (
//     <TouchableOpacity
//       style={styles.item}
//       onPress={() => handleEventPress(item)}>
//       <Text style={styles.itemTime}>{item.time}</Text>
//       <Text style={styles.itemName}>{item.name}</Text>
//       <Text style={styles.itemLocation}>{item.location}</Text>
//     </TouchableOpacity>
//   );

//   // Handle press event on agenda item
//   const handleEventPress = item => {
//     // Navigate to event details screen or perform any other action
//   };

//   // Render empty date item in agenda
//   const renderEmptyDate = () => (
//     <View style={styles.emptyDate}>
//       <Text>No events scheduled</Text>
//     </View>
//   );

//   // Render day in agenda 
//   const renderDay = (day, item) => (
//     <View style={styles.dayContainer}>
//       <Text style={styles.dayText}>{day ? day.day : 'No Date'}</Text>
//       <Text style={styles.dayEventCount}>
//         {item ? item.length : '0'} Events
//       </Text>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <Agenda
//         items={items}
//         loadItemsForMonth={loadItems}
//         selected={'2024-04-01'}
//         renderItem={renderItem}
//         renderEmptyDate={renderEmptyDate}
//         showClosingKnob
//         renderDay={renderDay}
//         style={{}}
//         theme={{
//           agendaDayTextColor: 'yellow',
//           agendaDayNumColor: 'green',
//           agendaTodayColor: 'red',
//           agendaKnobColor: 'blue',
//         }}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   item: {
//     backgroundColor: 'white',
//     padding: 20,
//     marginVertical: 8,
//     marginHorizontal: 16,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#ddd',
//   },
//   itemTime: {
//     fontWeight: 'bold',
//     fontSize: 16,
//     marginBottom: 5,
//   },
//   itemName: {
//     fontSize: 16,
//     marginBottom: 5,
//   },
//   itemLocation: {
//     fontStyle: 'italic',
//     color: '#666',
//   },
//   emptyDate: {
//     height: 50,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   dayContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   dayText: {
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   dayEventCount: {
//     color: '#666',
//   },
// });

// export default AgendaComponent;
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CalendarDetail from '../../../Components/Screens/Calendar'

const Calendar = () => {
  return (
        <CalendarDetail/>
  )
}

export default Calendar

const styles = StyleSheet.create({})