import {Alert, StyleSheet, Text, TextInput, View} from 'react-native';
import {Modal} from 'react-native';
import {Button} from 'react-native-elements';
import React, {useEffect, useState} from 'react';
import {Rating} from 'react-native-ratings';
import {feedbackService} from '../../service';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ModalComment = ({open, click, data, user}) => {
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(3);
  const navigation = useNavigation();

  const ratingCompleted = rating => {
    setRating(rating);
  };
  // console.log(user);
  const submit = async () => {
    const feedback = {
      content: review,
      rate: rating,
      routeId: data.id,
      userId: user.id,
    };
    let domain = await AsyncStorage.getItem('domain');
    if (domain == null || domain == '') {
      AsyncStorage.removeItem('domain');
      navigation.navigate('Domain');
    }
    domain = 'http://' + domain;
    const rs = feedbackService.addFeedback(feedback, domain);
    if (rs == null) {
      Alert.alert('Đánh giá thất bại', 'Đã có lỗi xảy ra', [{text: 'OK'}]);
    } else {
      Alert.alert('Đánh giá thành công', 'Di chuyển về trang chủ', [
        {text: 'OK'},
      ]);
      click();
      navigation.navigate('Home');
    }
  };

  return (
    <Modal visible={open} transparent={true}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Đánh giá tuyến</Text>
          <Text style={{fontSize: 15, marginVertical: 10}}>
            {data.routeNum} - {data.name}
          </Text>

          <Rating
            type="star"
            ratingCount={5}
            imageSize={40}
            startingValue={3}
            onFinishRating={ratingCompleted}
          />
          <TextInput
            value={review}
            onChangeText={text => setReview(text)}
            placeholder="Nhập đánh giá của bạn ở đây"
            style={styles.containerInput}
            multiline={true}
          />
          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
            }}>
            <Button title="Đóng" onPress={click} containerStyle={styles.btn} />
            <Button
              title="Đánh giá"
              onPress={submit}
              containerStyle={styles.btn}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  containerInput: {
    backgroundColor: 'lightgray',
    marginVertical: 10,
    width: 300,
    padding: 10,
    height: 200,
    fontSize: 17,
    borderRadius: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  btn: {
    // marginHorizontal: 30,
    marginHorizontal: 70,
  },
});
export default ModalComment;
