import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import { signOut } from "firebase/auth"; // Importação do signOut
import { auth } from "../config/firebaseConfig"; // Configuração do Firebase
import * as ImagePicker from 'expo-image-picker';

export default function MeuPerfil() {
  const [username, setUsername] = useState("Jogador");
  const [password, setPassword] = useState("******");
  const [profileImage, setProfileImage] = useState("https://via.placeholder.com/100");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState(null); // Identifica se estamos editando o nome ou a senha
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão necessária', 'Precisamos de permissão para acessar a galeria de fotos!');
      }
    })();
  }, []);

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        setProfileImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Erro', 'Houve um problema ao tentar acessar a galeria.');
    }
  };

  const handleSave = () => {
    if (modalType === "username") {
      setUsername(inputValue);
    } else if (modalType === "password") {
      setPassword(inputValue);
    }
    setModalVisible(false);
    setInputValue("");
  };

  const openModal = (type) => {
    setModalType(type);
    setInputValue(type === "username" ? username : password);
    setModalVisible(true);
  };

  const handleLogout = () => {
    Alert.alert(
      "Sair",
      "Tem certeza que deseja sair?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Sim",
          onPress: async () => {
            try {
              await signOut(auth); // Função para deslogar do Firebase
              Alert.alert("Você saiu com sucesso!");
            } catch (error) {
              Alert.alert("Erro ao sair", error.message);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      {/* Top Header */}
      <View style={styles.profileCard}>
        {/* Foto de perfil */}
        <TouchableOpacity onPress={pickImage}>
          <Image style={styles.avatar} source={{ uri: profileImage }} />
        </TouchableOpacity>
        <Text style={styles.username}>{username}</Text>
        <Text style={styles.location}>Brasil</Text>
      </View>

      {/* Textos clicáveis para alterar nome ou senha */}
      <View style={styles.editContainer}>
        <TouchableOpacity onPress={() => openModal("username")}>
          <Text style={styles.editableText}>Nome: {username}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openModal("password")}>
          <Text style={styles.editableText}>Senha: {password}</Text>
        </TouchableOpacity>
        {/* Botão de sair */}
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>

      {/* Modal para editar nome ou senha */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Alterar {modalType === "username" ? "Nome" : "Senha"}
            </Text>
            <TextInput
              style={styles.input}
              placeholder={
                modalType === "username" ? "Novo nome de usuário" : "Nova senha"
              }
              value={inputValue}
              onChangeText={setInputValue}
              secureTextEntry={modalType === "password"}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Salvar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 20,
  },
  profileCard: {
    alignItems: "center",
    marginVertical: 20,
    marginTop: 50, // Margin from top of the screen
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#6a1b9a",
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10,
  },
  location: {
    fontSize: 14,
    color: "#666",
  },
  editContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  editableText: {
    fontSize: 16,
    color: "#6a1b9a",
    marginBottom: 10,
    textDecorationLine: "underline",
  },
  logoutText: {
    fontSize: 16,
    color: "red",
    marginTop: 20,
    textDecorationLine: "underline",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  saveButton: {
    backgroundColor: "#6a1b9a",
    padding: 10,
    borderRadius: 5,
    width: "45%",
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "#ddd",
    padding: 10,
    borderRadius: 5,
    width: "45%",
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#333",
    fontWeight: "bold",
  },
});
