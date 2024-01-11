import {Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button} from 'react-native-elements';
import {ratingService} from '../../service';
// import StarRating from 'react-native-star-rating';

export default function Rating({data}) {
  const [dataRate, setDataRate] = useState('');
  const [rateSum, setRateSum] = useState(0);

  const fetchData = async () => {
    const d = await ratingService.getAll(data.id);
    setDataRate(d);

    let sum = 0;
    const length = d.length;
    d.forEach(rating => {
      sum += rating.rate;
    });

    const averageRating = length > 0 ? sum / length : 0;
    console.log(averageRating);
    setRateSum(averageRating);
  };

  useEffect(() => {
    fetchData();
  }, [data]);

  return (
    <>
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
        }}></Button>
      <View>
        {/* <StarRating
          disabled={false}
          maxStars={5}
          rating={rateSum}
          starSize={30}
          fullStarColor="gold"
        /> */}
      </View>
    </>
  );
}
