import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button} from 'react-native-elements';
import {Rating} from 'react-native-ratings';
import {feedbackService} from '../../service';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EachElementComment from './EachElementComment';
import {useNavigation} from '@react-navigation/native';
import ModalComment from './ModalComment';

export default function Feedback({data, rate}) {
  const [dataRate, setDataRate] = useState('');
  const [u, setUser] = useState(null);
  const [check, setCheck] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [rateSum, setRateSum] = useState({
    star1: 0,
    star2: 0,
    star3: 0,
    star4: 0,
    star5: 0,
    total: 0,
    length: 0,
  });
  const navigation = useNavigation();

  const readUser = async () => {
    const value = await AsyncStorage.getItem('auth');
    if (value != null) {
      const storedData = JSON.parse(value);
      setUser(storedData);
      setCheck(true);
    }
  };
  const fetchData = async () => {
    const d = await feedbackService.getAll(rate.id);
    setDataRate(d);
    let sum = 0;
    const length = d.length;
    if (length > 0) {
      let newRateSum = {
        star1: 0,
        star2: 0,
        star3: 0,
        star4: 0,
        star5: 0,
        total: 0,
        length: 0,
      };
      newRateSum.length = length;
      d.forEach(rating => {
        switch (rating.rate) {
          case 1:
            newRateSum.star1 += 1;
            break;
          case 2:
            newRateSum.star2 += 1;
            break;
          case 3:
            newRateSum.star3 += 1;
            break;
          case 4:
            newRateSum.star4 += 1;
            break;
          case 5:
            newRateSum.star5 += 1;
            break;
        }
        sum += rating.rate;
      });
      let maxStar = Math.max(
        newRateSum.star1,
        newRateSum.star2,
        newRateSum.star3,
        newRateSum.star4,
        newRateSum.star5,
      );

      newRateSum.star1 /= maxStar;
      newRateSum.star2 /= maxStar;
      newRateSum.star3 /= maxStar;
      newRateSum.star4 /= maxStar;
      newRateSum.star5 /= maxStar;
      const averageRating = length > 0 ? sum / length : 0;
      newRateSum.total = averageRating;
      // console.log(newRateSum);
      // console.log(newRateSum);
      setRateSum(newRateSum);
    }
  };

  useEffect(() => {
    fetchData();
    readUser();
  }, [data]);
  const Login = () => {
    navigation.navigate('Login');
  };
  const toggleModal = () => {
    setModalVisible(false);
  };

  const Create = () => {
    setModalVisible(true);
  };
  return (
    <>
      <ScrollView>
        {check ? (
          <Button
            title={'Viết đánh giá'}
            containerStyle={{
              width: 200,
              marginTop: 20,
              borderRadius: 50,
              marginHorizontal: 120,
            }}
            buttonStyle={{
              backgroundColor: 'lightgray',
              borderRadius: 10,
            }}
            onPress={Create}></Button>
        ) : (
          <Button
            title={'Đăng nhập'}
            containerStyle={{
              width: 200,
              marginTop: 20,
              borderRadius: 50,
              marginHorizontal: 120,
            }}
            buttonStyle={{
              backgroundColor: 'lightgreen',
              borderRadius: 10,
            }}
            onPress={Login}></Button>
        )}
        <View style={styles.containerRating}>
          <Text style={styles.titleText}>TỔNG HỢP ĐÁNH GIÁ</Text>
          <View style={styles.containerRatingStart}>
            <View style={{display: 'flex', alignItems: 'center'}}>
              <Rating
                type="star"
                ratingCount={5}
                imageSize={30}
                showRating
                // defaultRating={rateSum.total}
                startingValue={rateSum.total}
                readonly={true}
                // onFinishRating={ratingCompleted}
                style={{paddingVertical: 10}}
              />
              <View style={{flexDirection: 'row'}}>
                <Icon
                  raised
                  name="user"
                  type="font-awesome"
                  color="black"
                  size={20}
                />
                <Text style={{fontSize: 15, marginLeft: 10}}>
                  {rateSum.length}
                </Text>
              </View>
            </View>
            <View style={{flexDirection: 'column', marginHorizontal: 10}}>
              <Text style={{flex: 1, marginTop: 5}}>1</Text>
              <Text style={{flex: 1, marginTop: 5}}>2</Text>
              <Text style={{flex: 1, marginTop: 5}}>3</Text>
              <Text style={{flex: 1, marginTop: 5}}>4</Text>
              <Text style={{flex: 1, marginTop: 5}}>5</Text>
            </View>
            <View style={{flex: 1, flexDirection: 'column'}}>
              <View
                style={{
                  ...styles.column1,
                  width: 200 * rateSum.star1,
                }}
              />

              <View
                style={{
                  ...styles.column2,
                  width: 200 * rateSum.star2,
                }}
              />

              <View
                style={{
                  ...styles.column3,
                  width: 200 * rateSum.star3,
                }}
              />

              <View
                style={{
                  ...styles.column4,
                  width: 200 * rateSum.star4,
                }}
              />

              <View
                style={{
                  ...styles.column5,
                  width: 200 * rateSum.star5,
                }}
              />
            </View>
          </View>
        </View>

        {/* comment */}

        <View style={{marginHorizontal: 20}}>
          <Text style={styles.titleText}>CÁC BÀI ĐÁNH GIÁ</Text>
          <EachElementComment data={dataRate} check={check} user={u} />
        </View>
      </ScrollView>

      <ModalComment
        open={isModalVisible}
        click={toggleModal}
        data={rate}
        user={u}
      />
    </>
  );
}

const styles = StyleSheet.create({
  containerRating: {
    margin: 20,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  containerRatingStart: {
    // flex: 1,
    flexDirection: 'row',
  },
  column1: {
    // height: 100,
    flex: 1,
    backgroundColor: 'skyblue',
  },
  column2: {
    flex: 1,
    backgroundColor: 'coral',
  },
  column3: {
    flex: 1,
    backgroundColor: 'mediumseagreen',
  },
  column4: {
    flex: 1,
    backgroundColor: 'gold',
  },
  column5: {
    flex: 1,
    backgroundColor: 'purple',
  },
});
