import React, { useState, useRef, LegacyRef, useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  TouchableWithoutFeedback,
  Text,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import moment from 'moment';
import Swiper from 'react-native-swiper';
import styles from '../services/calenderStyle'
import { Class, useClass } from '../stores/useClassStore';
import ClassItem from './ClassItem';

interface Props{
  mode: string;
}

const ScheduleComponent = ({mode}: Props) => {
  const classes = useClass((state) => state.classes);
  
  const getClassesByDate = (day: string): Class[] => {
    return classes.filter((c) => c.date === day).sort((a, b) => {
      const dateA = new Date(`1970-01-01T${a.start}`);
      const dateB = new Date(`1970-01-01T${b.start}`);
      return dateA.getTime() - dateB.getTime();
    });
  }

  const formatDate = (): string => {
    const day = value.getDate();
    const month = value.getMonth() + 1; // Months are zero-indexed
    const year = value.getFullYear();
    // Add leading zeros if necessary
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    return `${formattedDay}/${formattedMonth}/${year}`;
  }

  const swiper = useRef<any>(null);
  const [value, setValue] = useState(new Date());
  const [week, setWeek] = useState(0);

  const weeks = React.useMemo(() => {
    const start = moment().add(week, 'weeks').startOf('week');

    return [-1, 0, 1].map(adj => {
      return Array.from({ length: 7 }).map((_, index) => {
        const date = moment(start).add(adj, 'week').add(index, 'day');

        return {
          weekday: date.format('ddd'),
          date: date.toDate(),
        };
      });
    });
  }, [week]);

  useEffect(() => {
    const handleIndexChange = (ind: number) => {
      if (ind === 1) {
        return;
      }
      const newIndex = ind - 1;
      const newWeek = week + newIndex;
      const newValue = moment(value).add(newIndex, 'week').toDate();

      // Scroll the swiper first
      if (swiper.current) {
        swiper.current.scrollTo(1, false);
      }

      // Then update the state after a small delay
      setTimeout(() => {
        setWeek(newWeek);
        setValue(newValue);
      }, 10); // Adjust the delay as needed
    };

    if (swiper.current) {
      swiper.current.onIndexChanged = handleIndexChange;
    }

    return () => {
      if (swiper.current) {
        swiper.current.onIndexChanged = null;
      }
    };
  }, [value, week]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>

        <View style={styles.picker}>
          <Swiper
            index={1}
            ref={swiper}
            loop={false}
            showsPagination={false}>
            {weeks.map((dates, index) => (
              <View
                style={[styles.itemRow, { paddingHorizontal: 16 }]}
                key={index}>
                {dates.map((item, dateIndex) => {
                  const isActive =
                    value.toDateString() === item.date.toDateString();
                  return (
                    <TouchableWithoutFeedback
                      key={dateIndex}
                      onPress={() => setValue(item.date)}>
                      <View
                        style={[
                          styles.item,
                          isActive && {
                            backgroundColor: '#111',
                            borderColor: '#111',
                          },
                        ]}>
                        <Text
                          style={[
                            styles.itemWeekday,
                            isActive && { color: '#fff' },
                          ]}>
                          {item.weekday}
                        </Text>
                        <Text
                          style={[
                            styles.itemDate,
                            isActive && { color: '#fff' },
                          ]}>
                          {item.date.getDate()}
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                  );
                })}
              </View>
            ))}
          </Swiper>
        </View>

        <View style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 24 }}>
          <View style={styles.placeholder}>
            <View style={styles.placeholderInset}>
              <FlatList
                data={getClassesByDate(formatDate())}
                renderItem={({ item }) => <ClassItem c={item} mode={mode}/>}
                ListEmptyComponent={
                <View style={{alignItems: 'center'}}>
                  <Text>There are no classes on this day</Text>
                </View>
              }
                keyExtractor={item => item.id}
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default ScheduleComponent;
