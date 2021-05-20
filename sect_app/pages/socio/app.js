import {StatusBar} from 'expo-status-bar';
import * as React from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import StepIndicator from 'react-native-step-indicator';


const stepIndicatorStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 40,
  separatorStrokeWidth: 3,
  currentStepStrokeWidth: 5,
  separatorFinishedColor: '#4aae4f',
  separatorUnFinishedColor: '#a4d4a5',
  stepIndicatorFinishedColor: '#4aae4f',
  stepIndicatorUnFinishedColor: '#a4d4a5',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 15,
  currentStepIndicatorLabelFontSize: 15,
  stepIndicatorLabelCurrentColor: '#000000',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: 'rgba(255,255,255,0.5)',
  labelColor: '#666666',
  labelSize: 12,
  currentStepLabelColor: '#4aae4f',
};


const VerticalStepIndicator = () =>{
    const [currentPage, setCurrentPage] = React.useState(0);

const renderLabel = ({
  position,
  label,
  currentPosition,
}: {
  position
  stepStatus
  label
  currentPosition
}) => {
  return (
    <Text
      style={
        position === currentPosition
          ? styles.stepLabelSelected
          : styles.stepLabel
      }
    >
      {label}
    </Text>
  );
};
const onStepPress = (position) => {
  setCurrentPage(position);
};

    return (
        <View style={styles.container}>
            <View style={styles.stepIndicator}>
                <StepIndicator
                    customStyles={stepIndicatorStyles}
                    currentPosition={currentPage}
                    labels={['Account', 'Profile', 'Band', 'Membership', 'Dashboard']}
                    renderLabel={renderLabel}
                    onPress={onStepPress}
                />
            </View>
        
        </View>
    );
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
export default VerticalStepIndicator;