import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { View, Text, Image, StyleSheet } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

// IMPORTANDO PÁGINAS
import Cadastro from "../pages/Cadastro";
import CampoMinado from "../pages/CampoMinado";
import JogoDaMemoria from "../pages/JogoDaMemoria";
import Login from "../pages/Login";
import Quiz from "../pages/Quiz";
import Catalogo from "../pages/Catalogo";
import JogoMat from "../pages/JogoMat";
import JogodaVelha from "../pages/JogodaVelha";
import JogoPalavras from "../pages/JogoPalavras";
import QuebraCabeca from "../pages/QuebraCabeca";
import JogoDoClick from "../pages/JogoDoClick";
import ChatScreen from "../pages/Chat";
import Sound from "../pages/soundtest";
import MeuPerfil from "../pages/MeuPerfil";
import OnboardingV2 from "../pages/OnBoardingV2";
import TesteDeVide from "../pages/VídeoTest.Js";
import TestComponent from "../pages/TestComponent";
import BLurTest from "../pages/blurtest";

const Drawer = createDrawerNavigator();

// Função de conteúdo personalizado do Drawer
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <LinearGradient
        colors={['#010305', '#8547b0']}
        style={styles.gradient}
      >
        <View style={styles.drawerHeader}>
          <Image
            source={require("../images/GamingCLubRabbit.png")}
            style={styles.profileImage}
          />
          <Text style={styles.welcomeText}>Bem-vindo ao</Text>
          <Text style={styles.clubText}>GamingClub</Text>
        </View>
        <DrawerItemList {...props} />
      </LinearGradient>
    </DrawerContentScrollView>
  );
}

export default function Index() {
  return (
    <NavigationContainer>
      <Drawer.Navigator   
        initialRouteName="OnBoardingV2" // Define a tela inicial
        screenOptions={{
          drawerStyle: {
            backgroundColor: '#000000',
            width: "40%",
          },
          drawerLabelStyle: {
            color: '#fafafa', // Mudar a cor do texto para branco
          },
        }} 
        drawerContent={props => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen 
          name="BlurTest" 
          component={BLurTest} 
          options={{ headerShown: false }} 
        />
        <Drawer.Screen 
          name="OnBoardingV2" 
          component={OnboardingV2} 
          options={{ headerShown: false }} 
        />
                <Drawer.Screen 
          name="TesteComponent" 
          component={TestComponent} 
          options={{ headerShown: false }} 
        />
                <Drawer.Screen 
          name="TesteDeVide" 
          component={TesteDeVide} 
          options={{ headerShown: false }} 
        />
        <Drawer.Screen 
          name="MeuPerfil" 
          component={MeuPerfil} 
          options={{ headerShown: false }} 
        />
        <Drawer.Screen 
          name="Login" 
          component={Login} 
          options={{ headerShown: false }} 
        />
        <Drawer.Screen 
          name="Sound" 
          component={Sound} 
          options={{ headerShown: false }} 
        />
        <Drawer.Screen 
          name="Cadastro" 
          component={Cadastro} 
          options={{ headerShown: false }} 
        />
                <Drawer.Screen 
          name="CampoMinado" 
          component={CampoMinado} 
          options={{ headerShown: false }} 
        />
        <Drawer.Screen 
          name="JogoDaMemoria" 
          component={JogoDaMemoria} 
          options={{ headerShown: false }} 
        />
        <Drawer.Screen 
          name="Quiz" 
          component={Quiz} 
          options={{ headerShown: false }} 
        />
        <Drawer.Screen 
          name="JogoMat" 
          component={JogoMat} 
          options={{ headerShown: false }} 
        />
        <Drawer.Screen 
          name="JogodaVelha" 
          component={JogodaVelha} 
          options={{ headerShown: false }} 
        />
        <Drawer.Screen 
          name="JogoNúmeros" 
          component={JogoPalavras} 
          options={{ headerShown: false }} 
        />
        <Drawer.Screen 
          name="QuebraCabeca" 
          component={QuebraCabeca} 
          options={{ headerShown: false }} 
        />
        <Drawer.Screen 
          name="Catalogo" 
          component={Catalogo} 
          options={{ headerShown: false }} 
        />
        <Drawer.Screen 
          name="Chat" 
          component={ChatScreen} 
          options={{ headerShown: false }} 
        />
        <Drawer.Screen 
          name="JogoDoClick" 
          component={JogoDoClick} 
          options={{ headerShown: false }} 
        />
      
            
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  drawerHeader: {
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
  },
  welcomeText: {
    marginVertical: 10,
    fontWeight: 'bold',
    fontSize: 16,
    color: "#fff",
  },
  clubText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: "#fff",
  },
});
