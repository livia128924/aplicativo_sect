import React, { useState, useEffect } from 'react';
import {FlatList,View, Text, SafeAreaView, StyleSheet} from 'react-native';
import Mybutton from '../components/Mybutton';
import Icon from 'react-native-vector-icons/FontAwesome';
//import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import StepIndicator from 'react-native-step-indicator';


const stepIndicatorStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 40,
  separatorStrokeWidth: 3,
  currentStepStrokeWidth: 5,
  stepStrokeCurrentColor: '#fe7013',
  separatorFinishedColor: '#fe7013',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#fe7013',
  stepIndicatorUnFinishedColor: '#aaaaaa',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 15,
  currentStepIndicatorLabelFontSize: 15,
  stepIndicatorLabelCurrentColor: '#000000',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: 'rgba(255,255,255,0.5)',
  labelColor: '#666666',
  labelSize: 15,
  currentStepLabelColor: '#fe7013',
};




const Socio = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const viewabilityConfig = React.useRef({ itemVisiblePercentThreshold: 40 })
    .current;
    const labels = ['teste' ,'teste2', 'teste3' ];

    const renderPage = (rowData) => {
      const item = rowData.item;
      return (
        <View style={styles.rowItem}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.body}>{item.body}</Text>
        </View>
      );
    };
    const onViewableItemsChanged = React.useCallback(({ viewableItems }) => {
      const visibleItemsCount = viewableItems.length;
      if (visibleItemsCount !== 0) {
        setCurrentPage(viewableItems[visibleItemsCount - 1].index);
      }
    }, []);
  

    return(
      <View style={styles.container}>
      <View style={styles.stepIndicator}>
        <StepIndicator
          customStyles={stepIndicatorStyles}
          stepCount={6}
          direction="vertical"
          currentPosition={currentPage}
          labels={labels.map((item) => item)}
        />
      </View>
      <FlatList
        style={{ flexGrow: 1 }}
        data={labels}
        renderItem={renderPage}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
    </View>
    )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#ffffff',
  },
  stepIndicator: {
    marginVertical: 50,
    paddingHorizontal: 20,
  },
  rowItem: {
    flex: 3,
    paddingVertical: 20,
  },
  title: {
    flex: 1,
    fontSize: 20,
    color: '#333333',
    paddingVertical: 16,
    fontWeight: '600',
  },
  body: {
    flex: 1,
    fontSize: 15,
    color: '#606060',
    lineHeight: 24,
    marginRight: 8,
  },
});
export default Socio;