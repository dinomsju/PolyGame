import React from 'react';
import {FlatList, Text, View} from 'react-native';
import SeasonItem from '../../components/List/SeasonItem';
import common from '../../themes/common';

export default function Season({seasons}) {
  return (
    <View style={common.container} Î>
      <Text style={common.heading}>Season</Text>
      <FlatList
        horizontal
        data={seasons}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <SeasonItem
            image={item.poster_path}
            name={item.name}
            episode_count={item.episode_count}
          />
        )}
      />
    </View>
  );
}
