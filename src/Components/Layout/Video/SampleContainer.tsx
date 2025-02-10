import React, { useRef, useState } from 'react';
import { View, ScrollView, Button } from 'react-native';

const ScrollToButton = () => {
  const scrollViewRef = useRef();
  const [viewHeights, setViewHeights] = useState([]);

  
  const handleLayout = (index, event) => {
    const { height } = event.nativeEvent.layout;
    setViewHeights((prevHeights) => {
      const updatedHeights = [...prevHeights];
      updatedHeights[index] = height;
      return updatedHeights;
    });
  };

  const scrollToView = (index) => {
    if (scrollViewRef.current) {
      let scrollPosition = 0;
      for (let i = 0; i < index; i++) {
        scrollPosition += viewHeights[i] || 0;
      }
      scrollViewRef.current.scrollTo({ y: scrollPosition, animated: true });
    }
  };

  return (
    <View style={{ flex: 1 }}>
         <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <Button title="View 1" onPress={() => scrollToView(0)} />
        <Button title="View 2" onPress={() => scrollToView(1)} />
        <Button title="View 3" onPress={() => scrollToView(2)} />
        <Button title="View 4" onPress={() => scrollToView(3)} />
      </View>
      <ScrollView ref={scrollViewRef}>
        <View onLayout={(event) => handleLayout(0, event)} style={{ height: 200, backgroundColor: 'red' }}>
          {/* Content of View 1 */}
        </View>
        <View onLayout={(event) => handleLayout(1, event)} style={{ height: 900, backgroundColor: 'blue' }}>
          {/* Content of View 2 */}
        </View>
        <View onLayout={(event) => handleLayout(2, event)} style={{ height: 700, backgroundColor: 'green' }}>
          {/* Content of View 3 */}
        </View>
        <View onLayout={(event) => handleLayout(3, event)} style={{ height: 400, backgroundColor: 'yellow' }}>
          {/* Content of View 4 */}
        </View>
      </ScrollView>
     
    </View>
  );
};

export default ScrollToButton;