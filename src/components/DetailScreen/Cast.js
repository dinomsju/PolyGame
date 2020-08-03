import React from 'react';
import {FlatList, Text, View} from 'react-native';
import common from '../../themes/common';
import CreditItem from '../List/CreditItem';

export default function Cast({credits}) {
  return (
    <View style={common.container} Î>
      <Text style={common.heading}>Cast</Text>
      <FlatList
        horizontal
        data={credits}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <CreditItem
            name={item.name}
            character={item.character}
            image={item.profile_path}
          />
        )}
      />
    </View>
  );
}
