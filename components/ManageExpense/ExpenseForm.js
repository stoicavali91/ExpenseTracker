import { useState } from "react";
import { View, StyleSheet, Text, Alert } from "react-native"
import Input from "./Input";
import Button from "../UI/Button";
import { getFormattedDate } from "../../util/date";
import { GlobalStyles } from "../../constants/styles";


function ExpenseForm({submitButtonLabel, onCancel, onSubmit, defaultValues}) {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : '',
      isValid: true,
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : '',
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : '',
      isValid: true,
    }
  });//we are using an object for handling multiple User Input forms

  function inputChangedHandler(inputIdentifier ,enteredValue){
    setInputs((currentInputs)=>{
      return{
        ...currentInputs, 
        [inputIdentifier]: {value: enteredValue, isValid: true}
      };
    });
  }
  function submitHandler(){
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value
    };

    //Validarea inputurilor
    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
    const descriptionIsValid = expenseData.description.trim().length > 0;//trim removes exces white spaces at the start or at the end of the string

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      // Alert.alert('Invalid input','Please check your input values!');
      setInputs((currentInputs) => {
        return{
          amount: {value: currentInputs.amount.value, isValid: amountIsValid},
          date: {value: currentInputs.date.value, isValid: dateIsValid},
          description: {value: currentInputs.description.value, isValid: descriptionIsValid}
        }
      })
      return;
    }

    onSubmit(expenseData);
  }

  const formIsInvalid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid;

  return (
    <View style={styles.formStyle}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input 
          style={styles.rowInput}
          label="Amount"
          invalid = {!inputs.amount.isValid} 
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: inputChangedHandler.bind(this, 'amount'),//amount is the inputIdentifier needed as an argument for the inputChangeHandler function;
            value: inputs.amount.value,
          }}
        />
        <Input 
          style={styles.rowInput}
          label="Date"
          invalid = {!inputs.date.isValid} 
          textInputConfig={{
            keyboardType: 'default',
            placeholder: 'YYYY-MM-DD',
            maxLenght: 10,
            onChangeText: inputChangedHandler.bind(this, 'date'),//date is the inputIdentifier needed as an argument for the inputChangeHandler function;
            value: inputs.date.value,
          }}
        />
      </View>
      <Input 
        label="Description"
        invalid = {!inputs.description.isValid} 
        textInputConfig={{
          multiline: true,
          autoCorrect: false,
          autoCapitalize: 'none',
          onChangeText: inputChangedHandler.bind(this, 'description'),//description is the inputIdentifier needed as an argument for the inputChangeHandler function;
            value: inputs.description.value,
        }}  
      />
      {formIsInvalid && <Text style={styles.errorText}>Invalid input values! Please check your input data!</Text>}
       <View style={styles.buttonsContainer}>
          <Button style={styles.buttonStyle} mode='flat' onPress={onCancel} >Cancel</Button>
          <Button style={styles.buttonStyle} onPress={submitHandler} >{submitButtonLabel}</Button>
        </View>
    </View>
  )
}

export default ExpenseForm;

const styles = StyleSheet.create({
  formStyle:{
    marginTop: 30,
  },
  title:{
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 24,
    textAlign: 'center',
  },
  inputsRow:{
    flexDirection:'row',
    justifyContent: 'space-between',
  },
  rowInput:{
    flex: 1,
  },
  buttonsContainer:{
    flexDirection: 'row',
    justifyContent:'center',
    alignItems: 'center'
  },
  buttonStyle:{
    minWidth: 120,
    marginHorizontal: 8
  },
  errorText:{
    textAlign: 'center',
    color: GlobalStyles.colors.error500,
    margin: 8
  },
  
})
