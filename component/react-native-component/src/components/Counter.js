import React, { useState } from 'react';
import { View, Text } from 'react-native';
import MyButton from './MyButton';

const Counter = () => {

    const [count, setCount] = useState(0);
    const [double, setDouble] = useState(0);

    return (
        <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 30, margin: 10 }}>count: {count}</Text>
            <Text style={{ fontSize: 30, margin: 10 }}>double: {double}</Text>
            <MyButton
                title="+"
                onPress={() => {
                    setCount(prevCount => {
                        const newCount = prevCount + 1;
                        // 새로운 count 값을 기반으로 double 설정
                        setDouble(newCount * 2);
                        return newCount;
                    });
                }}
            />
            <MyButton
                title="-"
                onPress={() => {
                    setCount(prevCount => {
                        const newCount = prevCount - 1;
                        // 새로운 count 값을 기반으로 double 설정
                        setDouble(newCount * 2);
                        return newCount;
                    });
                }}
            />
        </View>
    );
};

export default Counter;