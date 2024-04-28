import {StyleSheet, Text, View} from 'react-native';
import {Card, Image} from 'react-native-elements';
import {Rating} from 'react-native-ratings';
import React, {useEffect, useState} from 'react';

const iconSize = 50;
export default function EachElementComment({data, check, user}) {
  if (check && data != '') {
    data.sort((a, b) => (a.userId.username === user.username ? -1 : 1));
  }
  return (
    <>
      {data != ''
        ? data.map((u, i) => {
            let dt = new Date(u.date).toLocaleDateString();
            // console.log(u.rate);
            return (
              <Card containerStyle={styles.container} key={i}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <Image
                      resizeMode="cover"
                      style={[styles.icon]}
                      source={require('../../images/pikachu.jpg')}
                    />
                    <View style={{marginLeft: 10}}>
                      <Text style={styles.userName}>{u.userId.username}</Text>
                      <Text style={styles.date}>{dt}</Text>
                    </View>
                  </View>
                  <Rating
                    type="star"
                    ratingCount={5}
                    imageSize={20}
                    startingValue={u.rate}
                    readonly={true}
                    // onFinishRating={ratingCompleted}
                    // style={{paddingVertical: 10}}
                  />
                </View>
                <Text style={{fontSize: 20, color: 'black'}}>{u.content}</Text>
              </Card>
            );
          })
        : null}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
  },
  icon: {
    width: iconSize,
    height: iconSize,
    borderRadius: iconSize / 2,
    overflow: 'hidden',
  },
  userName: {
    fontSize: 17,
    color: 'black',
    fontWeight: 'bold',
  },
  date: {
    fontSize: 15,
    color: 'black',
  },
});
