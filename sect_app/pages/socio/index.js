import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import VerticalStepIndicator from './app';

export default function Stepper() {
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            currentPage === 0 ? styles.selected : styles.unSelected,
          ]}
          onPress={() => setCurrentPage(0)}
        >
          <Text style={styles.buttonLabel}>{'Horizontal'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            currentPage === 1 ? styles.selected : styles.unSelected,
          ]}
          onPress={() => setCurrentPage(1)}
        >
          <Text style={styles.buttonLabel}>{'Vertical'}</Text>
        </TouchableOpacity>
      </View>
      {currentPage === 0 ? (
        <HorizontalStepIndicator />
      ) : (
        <VerticalStepIndicator />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    marginTop: 16,
  },
  buttonContainer: {
    flexShrink: 1,
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    marginHorizontal: 16,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  selected: {
    backgroundColor: 'rgb(101, 121, 191)',
  },
  unSelected: {
    backgroundColor: 'rgba(101, 121, 191, 0.3)',
  },
  buttonLabel: {
    color: '#ffffff',
  },
});