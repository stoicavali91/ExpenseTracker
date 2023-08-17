import { Pressable, View, StyleSheet } from "react-native";
import {Ionicons} from '@expo/vector-icons';


function IconButton({icon, size, color, onPress}) {
  return (
    // if pressed, the styles of pressed is going to be applied. If not pressed, no styles
   <Pressable onPress={onPress} style={({pressed}) => pressed && styles.pressed}> 
    <View style={styles.buttonContainer}>
      {/* Icon stand for the name props of the icon in Ionicons */}
      <Ionicons name={icon} size={size} color={color} /> 
    </View>
   </Pressable>
  )
}

export default IconButton;

const styles = StyleSheet.create({
  buttonContainer:{
    borderRadius: 24,
    padding: 6,
    margin: 8,
    marginVertical: 2
  },
  pressed:{
    opacity: 0.25,
  }
})