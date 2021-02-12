import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';


export default function App() {
  const [selectedImage, setSelectedImage] = React.useState(null);
  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage({ localUri: pickerResult.uri });
  };
  let openShareDialogAsync = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      alert(`Uh oh, sharing isn't available on your platform`);
      return;
    }

    await Sharing.shareAsync(selectedImage.localUri);
  };

  if (selectedImage !== null) {
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: selectedImage.localUri }}
          style={styles.thumbnail}
        />
        <TouchableOpacity onPress={openShareDialogAsync} style={styles.button}>
          <Text style={styles.buttonText}>Share this photo</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.baseText}>
        Welcome to my gallery
  </Text>
      <Image source={{ uri: "http://www.pngplay.com/wp-content/uploads/1/Purple-Butterfly-PNG-Image-Free-Download.png" }} style={styles.logo} />

      <TouchableOpacity
        onPress={openImagePickerAsync}
        style={styles.button}>
        <Text style={styles.buttonText}>Pick a photo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#72F54A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  baseText: {
    fontWeight: 'bold',
    color: '#FD2B07',
    fontSize: 30,
    marginBottom: 100,
    textAlign: "auto",
    fontStyle: "italic",


  },
  logo: {
    width: 305,
    height: 189,
    marginBottom: 60,
  },
  instructions: {
    color: '#4C0D3E',
    fontSize: 20,
    marginHorizontal: 15,
  },
  button: {
    backgroundColor: "#FF0D3E",
    padding: 15,
    borderRadius: 15,
    borderWidth: 4,
    shadowOpacity: 0.8,
    borderColor: "#FFD43E",
    shadowColor: "#FFD43E",
    shadowOffset: {
      height: 4,
      width: 4
    }
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  thumbnail: {
    width: 400,
    height: 400,
    resizeMode: "contain"
  },
});

