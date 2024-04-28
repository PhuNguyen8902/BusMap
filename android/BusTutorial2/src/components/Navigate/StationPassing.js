import {ScrollView, StyleSheet, Text} from 'react-native';
import React from 'react';
import {View} from 'react-native';

export default function StationPassing({data}) {
  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.listItem}>
            {data !== ''
              ? data.map((u, i) => (
                  <View key={i} style={styles.itemContainer}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.itemText}> {u.name}</Text>
                  </View>
                ))
              : null}
          </View>
        </View>
      </ScrollView>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  listItem: {
    flexDirection: 'column',
    marginLeft: 20,
    width: 230,
    marginVertical: 10,
  },
  bullet: {
    fontSize: 20,
    lineHeight: 20,
    color: 'green',
  },
  itemText: {
    fontSize: 16,
    lineHeight: 20,
    color: 'black',
  },
  itemTextName: {
    fontSize: 16,
    lineHeight: 20,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  arrow: {
    fontWeight: 'bold',
    fontSize: 20,
    lineHeight: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
});
