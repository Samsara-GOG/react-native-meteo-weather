  import React, { useState } from 'react'
  import { Button, TextInput, StyleSheet } from 'react-native'
  
  export default function CreatePostScreen({ navigation, route }) {
    const [postText, setPostText] = useState('');
  
    return (
      <>
        <Button title="Retourner à l'accueil" onPress={() => navigation.navigate("Home")} />
        <TextInput
          multiline
          placeholder="Quel nom de ville ?"
          style={styles.input}
          value={postText}
          onChangeText={setPostText}
        />
        <Button
          title="Envoyer"
          onPress={() => {
            // Pass params back to home screen
            navigation.navigate('Home', { post: postText });
          }}
        />
      </>
    );
  }
  
  const styles = StyleSheet.create({
    input: {
      borderWidth: 1,
      borderRadius: 15,
      padding: 10,
      margin: 15,
      width: "95%",
      height: 50,
      backgroundColor: 'white', 
      textTransform: 'capitalize' ,
    },
  });
  