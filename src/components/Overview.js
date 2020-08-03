import React from 'react';
import { Text, View } from 'react-native';
import common from '../theme/common';

export default function Overview({ overview }) {
  return (
    <View style={[common.container, { backgroundColor: 'white' }]} >
      <Text style={common.heading}>Overview</Text>
      <Text style={[common.subtitle, { color: 'black', paddingBottom: 10 }]}>{overview}</Text>
    </View>
  );
}
