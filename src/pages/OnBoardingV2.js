import React, { useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated, ImageBackground } from 'react-native';
import PagerView from 'react-native-pager-view';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';

export default function MyPager() {
  const navigation = useNavigation();
  const fadeAnim1 = useRef(new Animated.Value(0)).current;
  const fadeAnim2 = useRef(new Animated.Value(0)).current;
  const fadeAnim3 = useRef(new Animated.Value(0)).current;
  const fadeAnim4 = useRef(new Animated.Value(0)).current;
  const fadeAnim5 = useRef(new Animated.Value(0)).current;

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

  return (
    <View style={styles.container}>
      <PagerView style={styles.container} initialPage={0} onPageSelected={onPageSelected}>
        <View style={styles.page} key="1">
          <ImageBackground
            source={require('../images/Boarding1.png')}
            style={styles.imageBackground1}
          >
            {/* You can place additional content here if needed */}
          </ImageBackground>
        </View>
        <View style={styles.page} key="2">
          <ImageBackground
            source={require('../images/Boarding2.png')}
            style={styles.imageBackground2}
          >
            {/* Add content here if necessary */}
          </ImageBackground>
        </View>
        <View style={styles.page} key="3">
          <ImageBackground
            source={require('../images/Boarding3.png')}
            style={styles.imageBackground3}
          >
            {/* Add content here if necessary */}
          </ImageBackground>
        </View>
        <View style={styles.page} key="4">
          <ImageBackground
            source={require('../images/Boarding4.png')}
            style={styles.imageBackground4}
          >
            <TouchableOpacity onPress={handleStart} style={styles.button}>
                <Entypo style={{alignSelf: 'center', justifyContent: 'center',}} name="chevron-thin-right" size={30} color="white" />
            </TouchableOpacity>
          </ImageBackground>
        </View>
      </PagerView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground1: {
    flex: 1,
    width: '100%', 
    height: '100%',
    justifyContent: 'center',  // This centers the content vertically inside the ImageBackground
    alignItems: 'center',  // This centers the content horizontally
  },
  imageBackground2: {
    flex: 1,
    width: '101.5%', 
    height: '100%',
    justifyContent: 'center',  // This centers the content vertically inside the ImageBackground
    alignItems: 'center',  // This centers the content horizontally
  },
  imageBackground3: {
    flex: 1,
    width: '100.5%', 
    height: '100%',
    justifyContent: 'center',  // This centers the content vertically inside the ImageBackground
    alignItems: 'center',  // This centers the content horizontally
  },
  imageBackground4: {
    flex: 1,
    width: '102.5%', 
    height: '100%',
    justifyContent: 'center',  // This centers the content vertically inside the ImageBackground
    alignItems: 'center',  // This centers the content horizontally
  },
  page: {
    flex: 1,
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
    color: "#f89bdd", // Cor principal do texto
    fontFamily: 'Font5',
    textShadowColor: '#e07bda', // Cor do neon rosa
    textShadowOffset: { width: 0, height: 0 }, // Ajuste para centralizar o contorno
    textShadowRadius: 6, // Ajuste o tamanho do brilho
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginTop: 690,
    marginLeft: 220,
    backgroundColor: '#df62b0',
    borderRadius: 20,
  },
});
