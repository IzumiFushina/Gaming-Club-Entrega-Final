import React, { useRef, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Animated, ImageBackground } from 'react-native';
import PagerView from 'react-native-pager-view';
import { useNavigation } from '@react-navigation/native';
import Entypo from '@expo/vector-icons/Entypo';

export default function MyPager() {
  const navigation = useNavigation();
  const fadeAnim1 = useRef(new Animated.Value(0)).current;
  const fadeAnim2 = useRef(new Animated.Value(0)).current;
  const fadeAnim3 = useRef(new Animated.Value(0)).current;
  const fadeAnim4 = useRef(new Animated.Value(0)).current;
  const fadeAnim5 = useRef(new Animated.Value(0)).current;

  // Valor para a escala do botão
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleStart = () => {
    navigation.navigate('Catalogo');
  };

  const fadeIn = (animatedValue) => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const onPageSelected = (e) => {
    const index = e.nativeEvent.position;
    if (index === 0) {
      fadeIn(fadeAnim1);
    } else if (index === 1) {
      fadeIn(fadeAnim2);
    } else if (index === 2) {
      fadeIn(fadeAnim3);
    } else if (index === 3) {
      fadeIn(fadeAnim4);
    } else if (index === 4) {
      fadeIn(fadeAnim5);
    }
  };

  // Animação de pulsar
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.1, // Aumenta um pouco
          duration: 660,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1, // Volta ao tamanho original
          duration: 600,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [scaleAnim]);

  return (
    <View style={styles.container}>
      <PagerView style={styles.container} initialPage={0} onPageSelected={onPageSelected}>
        <View style={styles.page} key="1">
          <ImageBackground
            source={require('../images/Boarding1.png')}
            style={styles.imageBackground1}
          />
        </View>
        <View style={styles.page} key="2">
          <ImageBackground
            source={require('../images/Boarding2.png')}
            style={styles.imageBackground2}
          />
        </View>
        <View style={styles.page} key="3">
          <ImageBackground
            source={require('../images/Boarding3.png')}
            style={styles.imageBackground3}
          />
        </View>
        <View style={styles.page} key="4">
          <ImageBackground
            source={require('../images/Boarding4.png')}
            style={styles.imageBackground4}
          >
            {/* Botão animado */}
            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
              <TouchableOpacity onPress={handleStart} style={styles.button}>
                <Entypo
                  style={{ alignSelf: 'center', justifyContent: 'center' }}
                  name="chevron-thin-right"
                  size={30}
                  color="white"
                />
              </TouchableOpacity>
            </Animated.View>
          </ImageBackground>
        </View>
      </PagerView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  imageBackground1: {
    flex: 1,
    width: '100%',
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBackground2: {
    flex: 1,
    width: '101.5%',
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBackground3: {
    flex: 1,
    width: '100.5%',
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBackground4: {
    flex: 1,
    width: '102.5%',
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  page: {
    flex: 1,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    marginTop: 580,
    marginLeft: 220,
    backgroundColor: '#00ffff',
    borderRadius: 30,
  },
});
