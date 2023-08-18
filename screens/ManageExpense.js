
import { useContext, useLayoutEffect } from 'react';
import {View, StyleSheet} from 'react-native';
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import Button from '../components/UI/Button';
import { ExpensesContext } from '../store/expenses-context';

function ManageExpense({route, navigation}) {
  //we use route prop provided by React Navigation to extract the ID of the expense
  //React parameters(params) are used in React routing, where we have parameters we need to access in the route
  //we use "?" to check if params is undefined
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;// with "!!" we are converting the editedExpenseId into a boolean to see if we are editing the expense or not

  const expensesCtx = useContext(ExpensesContext);

  //useLayoutEffect is a version of useEffect that fires before the browser repaints the screen.
  //we are using useLayoutEffect to edit the title of ManageExpense programmatically
  useLayoutEffect(()=>{
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense'
    })
  },[navigation, isEditing]);

  function deleteExpenseHandler(){
    expensesCtx.deleteExpense(editedExpenseId);
    navigation.goBack();
  }
  function cancelHandler(){
    navigation.goBack();
  }
  function confirmHandler(){
    if (isEditing){
      expensesCtx.updateExpense(editedExpenseId ,{description:'Test!!!', amount:19.99, date: new Date('2023-08-16')});
    } else{
      expensesCtx.addExpense({description:'Test', amount:19.99, date: new Date('2023-08-16')});
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
        <View style={styles.buttonsContainer}>
          <Button style={styles.buttonStyle} mode='flat' onPress={cancelHandler} >Cancel</Button>
          <Button style={styles.buttonStyle} onPress={confirmHandler} >{isEditing ? 'Update' : 'Add'}</Button>

        </View>
        {isEditing && 
          <View style={styles.deleteContainer}>
            <IconButton icon="trash" color={GlobalStyles.colors.error500} size={36} onPress={deleteExpenseHandler}/>
          </View>  
        }
    </View>
  )
}

export default ManageExpense;

const styles = StyleSheet.create({
  container:{
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer:{
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
  buttonsContainer:{
    flexDirection: 'row',
    justifyContent:'center',
    alignItems: 'center'
  },
  buttonStyle:{
    minWidth: 120,
    marginHorizontal: 8
  }
})
