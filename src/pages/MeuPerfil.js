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
  ImageBackground,
} from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

export default function MeuPerfil() {
  const [username, setUsername] = useState("Jogador");
  const [password, setPassword] = useState("******");
  const [profileImage, setProfileImage] = useState(
    "https://via.placeholder.com/100"
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permissão necessária",
          "Precisamos de permissão para acessar a galeria de fotos!"
        );
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
      Alert.alert("Erro", "Houve um problema ao tentar acessar a galeria.");
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
              await signOut(auth);
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
    <ImageBackground
      source={require('../images/imagemfundo4.png')}
      style={styles.container}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={pickImage}>
          <Image style={styles.avatar} source={{ uri: profileImage }} />
        </TouchableOpacity>
        <Text style={styles.username}>{username}</Text>
        <Text style={styles.location}>
          <Ionicons name="location-outline" size={16} color="#fff" /> Brasil
        </Text>
      </View>

      {/* Edit Options */}
      <View style={styles.editContainer}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => openModal("username")}
        >
          <Ionicons name="person-outline" size={18} color="#6a1b9a" />
          <Text style={styles.editText}>Alterar Nome</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => openModal("password")}
        >
          <Ionicons name="lock-closed-outline" size={18} color="#6a1b9a" />
          <Text style={styles.editText}>Alterar Senha</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="exit-outline" size={18} color="#fff" />
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>

      {/* Modal */}
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
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: "#6a1b9a",
    paddingVertical: 60,
    alignItems: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#fff",
  },
  username: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
  },
  location: {
    color: "#ddd",
    fontSize: 14,
    marginTop: 5,
  },
  editContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  editText: {
    fontSize: 16,
    color: "#6a1b9a",
    marginLeft: 10,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    backgroundColor: "red",
    borderRadius: 5,
    justifyContent: "center",
    marginTop: 20,
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 10,
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
    backgroundColor: "#f5f5f5",
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
