import React, { useState, useRef } from 'react';
import { Dimensions, Image, View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Button } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import Icon from 'react-native-vector-icons/Ionicons';
import { BlurView } from 'expo-blur';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';

const image1 = require('../images/anuncio1.png');
const image2 = require('../images/anuncio2.png');
const image3 = require('../images/anuncio3.png');
const gameImage1 = require('../images/minado.png'); 
const gameImage2 = require('../images/velha2.png'); 
const gameImage3 = require('../images/jogodoclick.png'); 
const gameImage4 = require('../images/Memoria.png'); 
const gameImage5 = require('../images/oi.png'); 
const adivinheJogo = require('../images/adivinheJogo.png'); 
const gameImage6 = require('../images/quiz.png'); 
const gameImage7 = require('../images/numeros.png'); 
const backgroundImage = require('../images/fundo5.png'); // Imagem de fundo

function Index({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedSquare, setSelectedSquare] = useState(null);
    const width = Dimensions.get('window').width;
    const footerOpacity = useSharedValue(0);

    // Referência para o ScrollView
    const scrollViewRef = useRef();

    React.useEffect(() => {
        footerOpacity.value = withTiming(1, { duration: 1000 });
    }, []);

    const animatedFooterStyle = useAnimatedStyle(() => ({
        opacity: footerOpacity.value,
    }));

    const handlePressIn = (iconScale) => {
        iconScale.value = withSpring(0.8);
    };

    const handlePressOut = (iconScale) => {
        iconScale.value = withSpring(1);
    };

    const images = [image1, image2, image3];
    const allGames = [
        { id: 1, name: 'Campo Minado', route: 'CampoMinado', image: gameImage1 },
        { id: 2, name: 'Jogo da Velha', route: 'JogodaVelha', image: gameImage2 },
        { id: 3, name: 'Jogo do click', route: 'JogoDoClick', image: gameImage3 },
        { id: 4, name: 'Jogo da Memória', route: 'JogoDaMemoria', image: gameImage4 },
        { id: 5, name: 'Jogo dos Números', route: 'JogoPalavras', image: adivinheJogo },
        { id: 6, name: 'Quebra-cabeça', route: 'QuebraCabeca', image: gameImage5 },
        { id: 7, name: 'Quiz', route: 'Quiz', image: gameImage6 },
        { id: 8, name: 'Jogo de Matemática', route: 'JogoMat', image: gameImage7 },
    ];

    // Jogos que queremos exibir na última coluna
    const recentGames = allGames.filter(game => 
        ['Jogo da Velha', 'Jogo da Memória', 'Quebra-cabeça', 'Quiz', 'Jogo de Matemática'].includes(game.name)
    );

    // Jogos que queremos exibir na nova coluna (Campo Minado, Jogo do Click, Jogo dos Números)
    const lastColumnGames = allGames.filter(game => 
        ['Campo Minado', 'Jogo do click', 'Jogo dos Números'].includes(game.name)
    );

    const openGame = (route) => {
        navigation.navigate(route);
    };

    const handleSquarePress = (id) => {
        if (id <= 4) {
            setSelectedSquare(id);
            setModalVisible(true);
        } else {
            console.log(`Quadrado ${id} clicado!`);
        }
    };

    // Função para rolar até a "Segunda Coluna de Jogos"
    const scrollToSecondColumn = () => {
        scrollViewRef.current.scrollTo({ x: 0, y: 1000, animated: true }); // Ajuste o valor de "y" conforme necessário
    };

    return (
        <View style={styles.container}>
            <Image source={backgroundImage} style={styles.backgroundImage} />
            
            {/* Ajuste da camada de Blur */}
            <BlurView
                style={styles.absolute}
                blurType="light"
                blurAmount={1}  // Valor ajustado para diminuir o desfoque
                reducedTransparencyFallbackColor="rgba(0, 0, 0, 0.2)" // Ajuste da cor de fundo para mais opaco
            />
            <ScrollView style={styles.scrollContainer} ref={scrollViewRef}>
                <Text style={styles.welcomeText}>
                    Bem vindo ao GamingClub!!
                </Text>

                <Carousel
                    loop
                    width={width}
                    height={width / 2}
                    autoPlay={true}
                    data={images}
                    scrollAnimationDuration={3000}
                    renderItem={({ index }) => (
                        <View style={styles.carouselItem}>
                            <Image
                                source={images[index]}
                                style={styles.carouselImage}
                            />
                        </View>
                    )}
                    style={{ marginVertical: 30 }} 
                />

                {/* Título com botões centralizados */}
                <View style={styles.titleContainer}>
                    <Text style={styles.allGamesText}>Todos os Jogos</Text>
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity style={styles.button} onPress={scrollToSecondColumn}>
                            <Text style={styles.buttonText}>Button 1</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Button 2</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 10 }}>
                    {allGames.map((game) => (
                        <View key={game.id} style={styles.gameContainer}>
                            <TouchableOpacity
                                style={styles.square}
                                onPress={() => openGame(game.route)}
                            >
                                <Image source={game.image} style={styles.squareImage} />
                            </TouchableOpacity>
                            <Text style={styles.captionText}>{game.name}</Text>
                        </View>
                    ))}
                </ScrollView>

                {/* Título da última coluna de jogos */}
                <View style={styles.columnTitleContainer}>
                    <Text style={styles.popularGamesText}>Jogos Populares</Text>
                </View>
                
                {/* Quadrados organizados na última coluna */}
                <View style={styles.squareGrid}>
                    {recentGames.map((game) => (
                        <View key={game.id} style={styles.squareContainer}>
                            <TouchableOpacity
                                style={styles.square}
                                onPress={() => openGame(game.route)}
                            >
                                <Image source={game.image} style={styles.squareImage} />
                            </TouchableOpacity>
                            <Text style={styles.captionText}>{game.name}</Text>
                        </View>
                    ))}
                </View>

                {/* Título para a última coluna de jogos */}
                <View style={styles.lastColumnTitleContainer}>
                    <Text style={styles.recentGamesText}>Jogos para Pensar</Text>
                </View>

                {/* Nova ScrollView na parte inferior */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 30 }}>
                    {recentGames.map((game) => (
                        <View key={game.id} style={styles.gameContainer}>
                            <TouchableOpacity
                                style={styles.square}
                                onPress={() => openGame(game.route)}
                            >
                                <Image source={game.image} style={styles.squareImage} />
                            </TouchableOpacity>
                            <Text style={styles.captionText}>{game.name}</Text>
                        </View>
                    ))}
                </ScrollView>

                {/* Adicionando o anúncio 1 entre as seções Jogos para Pensar e Mais desafiadores */}
                <View style={styles.adContainer}>
                    <Image source={image1} style={styles.adImage} />
                </View>

              

                {/* Nova coluna idêntica à de "Mais desafiadores" */}
                <View style={styles.thirdColumnTitleContainer}>
                    <Text style={styles.recentGamesText}>Mais Desafiadores</Text>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 30 }}>
                    {lastColumnGames.map((game) => (
                        <View key={game.id} style={styles.gameContainer}>
                            <TouchableOpacity
                                style={styles.square}
                                onPress={() => openGame(game.route)}
                            >
                                <Image source={game.image} style={styles.squareImage} />
                            </TouchableOpacity>
                            <Text style={styles.captionText}>{game.name}</Text>
                        </View>
                    ))}
                </ScrollView>
            </ScrollView>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1C1C1C',
    },
    scrollContainer: {
        paddingHorizontal: 5,
        paddingTop: 50,
    },
    welcomeText: {
        fontSize: 30,
        color: '#00ffff',
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 20,
        fontFamily: 'Font5',
    },
    carouselItem: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    carouselImage: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    titleContainer: {
        marginBottom: 10,
    },
    allGamesText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#00ffff',
        marginBottom: 5,
        textAlign: 'center',
        textShadowColor: '#00e5e5',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 3,
        fontFamily: 'Font5',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    button: {
        backgroundColor: '#F89BDD',
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 10,
        marginHorizontal: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 15,
        fontFamily: 'Font5',
    },
    gameContainer: {
        marginBottom: 10,
        alignItems: 'center',
    },
    square: {
        backgroundColor: '#333',
        width: 100,
        height: 100,
        borderRadius: 10,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    squareImage: {
        width: '80%',
        height: '80%',
        borderRadius: 10,
    },
    captionText: {
        color: '#F89BDD',
        marginTop: 10,
    },
    popularGamesText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#00ffff',
        marginTop: 20,
        marginBottom: 10,
        textAlign: 'center',
        textShadowColor: '#00e5e5',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 5,
        fontFamily: 'Font5',
    },
    recentGamesText: {
        fontFamily: 'Font5',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#00ffff',
        marginBottom: 10,
        textAlign: 'center',
        textShadowColor: '#00e5e5',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 5,
    },
    secondColumnTitleContainer: {
        marginTop: 30,
        alignItems: 'center',
    },
    squareGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    squareContainer: {
        margin: 5,
    },
    clickableSquare: {
        width: 100,
        height: 100,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#000',
        paddingVertical: 10,
    },
    footerButton: {
        alignItems: 'center',
    },
    adContainer: {
        marginVertical: 20,
        alignItems: 'center',
    },
    adImage: {
        width: '90%',  // Ajuste conforme necessário
        height: 200,   // Ajuste conforme necessário
        borderRadius: 10,
    },
    
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundImage: {
        ...StyleSheet.absoluteFillObject,
        opacity: 1,
    },
    absolute: {
        ...StyleSheet.absoluteFillObject,
        opacity: 0.7,
    },
});

export default Index;
