import { View, Text, TextInput, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";


function Input({label, invalid, textInputConfig, style}) {

  //INTERESTING DYNAMIC STYLING:
  //We have a default style for the textInput that we save into a constant
  //We verify if that text input has a multiline configuration and if it does we push a new style object into the styling array of that constant
  const inputStyles = [styles.input];
  if (textInputConfig && textInputConfig.multiline){
    inputStyles.push(styles.inputMultiline);
  }
  if (invalid) {
    inputStyles.push(styles.invalidInput);
  }

  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>{label}</Text>
      <TextInput style={inputStyles} {...textInputConfig} />
    </View>
  );
}

export default Input;
const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 16,
  },
  label:{
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  input:{
    backgroundColor: GlobalStyles.colors.primary100,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    color: GlobalStyles.colors.primary700,
  },
  inputMultiline:{
    minHeight: 100,
    textAlignVertical: 'top',
  },
  invalidLabel:{
    color: GlobalStyles.colors.error500,
  },
  invalidInput:{
    backgroundColor: GlobalStyles.colors.error50,
    
  }
})