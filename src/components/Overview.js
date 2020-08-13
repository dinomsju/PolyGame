import React from 'react';
import { Text, View } from 'react-native';
import common from '../theme/common';
import ReadMore from 'react-native-read-more-text';

export default function Overview({ overview }) {
  return (
    <View style={[common.container, { backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#cccccc' }]} >
      <Text style={common.heading}>Overview</Text>
      <ReadMore
        numberOfLines={7}>
        <Text style={[common.subtitle, { color: 'black', paddingBottom: 10 }]}>{overview}</Text>
      </ReadMore>
    </View>
  );
}
