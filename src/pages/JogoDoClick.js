import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  ImageBackground,
  Image,
  Animated,
} from 'react-native';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import Icon from 'react-native-vector-icons/Ionicons'; // Importando ícones
import { useNavigation } from '@react-navigation/native'; // Importando o hook de navegação

const ClickFrenzy = () => {
  const navigation = useNavigation(); // Inicializando o hook de navegação
  const [clicks, setClicks] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [scores, setScores] = useState([]);
  const [modals, setModals] = useState({
    start: true,
    result: false,
    score: false,
  });

  // Animação do ícone
  const animationValue = useState(new Animated.Value(0))[0];

  const GAME_CONFIG = {
    duration: 10,
    messages: {
      start: "Vamos Jogar!",
      click: "Click!",
      result: (clicks) => `Você clicou ${clicks} vezes em ${GAME_CONFIG.duration} segundos!`,
      reset: "Reiniciar",
    },
  };

  // Gerencia o temporizador
  useEffect(() => {
    if (!isPlaying || remainingTime === 0) return;

    const timer = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime === 1) {
          endGame();
          clearInterval(timer);
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, remainingTime]);

  // Configura a animação
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(animationValue, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(animationValue, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();

    return () => loop.stop();
  }, []);

  const startGame = () => {
    setClicks(0);
    setRemainingTime(GAME_CONFIG.duration);
    setIsPlaying(true);
    setModals((prev) => ({ ...prev, start: false, result: false }));
  };

  const endGame = () => {
    setIsPlaying(false);
    setScores((prevScores) => [...prevScores.slice(-4), clicks]);
    setModals((prev) => ({ ...prev, result: true }));
  };

  const resetGame = () => {
    setClicks(0);
    setRemainingTime(0);
    setIsPlaying(false);
    setModals((prev) => ({ ...prev, result: false }));
  };

  const iconScale = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.2],
  });

  return (
    <ImageBackground
      source={require('../images/imagemfundo2.png')}
      style={styles.background}
    >
      <TouchableOpacity style={styles.closeButton} onPress={() => navigation.navigate('Catalogo')}>
        <Icon name="close" size={30} color="#BA52AD" />
      </TouchableOpacity>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => setModals((prev) => ({ ...prev, score: true }))}
        >
          <Animated.View style={{ transform: [{ scale: iconScale }], marginTop: 180 }}>
            <SimpleLineIcons name="trophy" size={24} color="yellow" />
          </Animated.View>
        </TouchableOpacity>

        <Text style={styles.title}>Click Frenzy</Text>
        <Text style={styles.subtitle}>Clique o máximo que conseguir em 10 segundos!</Text>

        <TouchableOpacity
          style={[styles.clickButton, isPlaying && styles.activeClickButton]}
          onPress={() => isPlaying && setClicks((prev) => prev + 1)}
          disabled={!isPlaying}
        >
          <Text style={styles.clickText}>
            {isPlaying ? GAME_CONFIG.messages.click : GAME_CONFIG.messages.start}
          </Text>
        </TouchableOpacity>

        {isPlaying && <Text style={styles.timer}>Tempo: {remainingTime}s</Text>}

        <TouchableOpacity
          style={styles.resetButton}
          onPress={resetGame}
          disabled={isPlaying}
        >
          <Text style={styles.resetText}>{GAME_CONFIG.messages.reset}</Text>
        </TouchableOpacity>

        {/* Modais */}
        <Modal visible={modals.start} transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{GAME_CONFIG.messages.start}</Text>
              <TouchableOpacity style={styles.startButton} onPress={startGame}>
                <Text style={styles.startButtonText}>Jogar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal visible={modals.result} transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Image
                source={require('../images/medalha.png')}
                style={styles.medal}
              />
              <Text style={styles.resultText}>{GAME_CONFIG.messages.result(clicks)}</Text>
              <TouchableOpacity
                style={styles.startButton}
                onPress={resetGame}
              >
                <Text style={styles.startButtonText}>Jogar Novamente</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal visible={modals.score} transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Últimas Pontuações</Text>
              {scores.map((score, index) => (
                <Text key={index} style={styles.scoreText}>
                  {score} cliques
                </Text>
              ))}
              <TouchableOpacity
                style={styles.startButton}
                onPress={() =>
                  setModals((prev) => ({ ...prev, score: false }))
                }
              >
                <Text style={styles.startButtonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  closeButton: {
    position: 'absolute',
    top: 70,
    right: 20,
    zIndex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  title: {
    fontSize: 24,
    color: 'white',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    marginBottom: 20,
  },
  clickButton: {
    width: 200,
    height: 200,
    backgroundColor: 'purple',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    marginBottom: 20,
  },
  activeClickButton: {
    backgroundColor: 'green',
  },
  clickText: {
    color: 'white',
    fontSize: 24,
  },
  timer: {
    color: 'white',
    fontSize: 18,
    marginBottom: 20,
  },
  resetButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  resetText: {
    color: 'white',
    fontSize: 18,
  },
  iconButton: {
    position: 'absolute',
    top: 50,
    right: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  resultText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  medal: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  scoreText: {
    fontSize: 16,
    marginBottom: 10,
  },
  startButton: {
    backgroundColor: 'purple',
    padding: 10,
    borderRadius: 5,
  },
  startButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default ClickFrenzy;
