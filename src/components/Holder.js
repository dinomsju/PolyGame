import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function DetailHolder() {
  return (
    <View style={{ flex: 1, marginBottom: 120 }}>
      <SkeletonPlaceholder>
        <View style={styles.container}>
          <View style={[styles.backdrop, { height: 250 }]} />
          <View style={[styles.backdrop, { height: 700, borderRadius: 20 }]} />
        </View>
      </SkeletonPlaceholder>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: width * 0.03,
  },
  backdrop: {
    borderRadius: 5,
    height: 200,
    width: width * 0.94,
    marginBottom: 10,
  },
  block: {
    borderRadius: 5,
    width: width * 0.3,
    height: 170,
    marginRight: width * 0.03,
    marginBottom: width * 0.03,
  },
  block2: {
    borderRadius: 5,
    width: width * 0.292,
    height: 170,
    marginRight: width * 0.03,
    marginBottom: width * 0.03,
  },
});
