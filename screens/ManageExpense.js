
import { useContext, useLayoutEffect, useState } from 'react';
import {View, StyleSheet} from 'react-native';
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import Button from '../components/UI/Button';
import { ExpensesContext } from '../store/expenses-context';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import {storeExpense, updateExpense, deleteExpense} from '../util/http';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';

function ManageExpense({route, navigation}) {
  //we use route prop provided by React Navigation to extract the ID of the expense
  //React parameters(params) are used in React routing, where we have parameters we need to access in the route
  //we use "?" to check if params is undefined
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;// with "!!" we are converting the editedExpenseId into a boolean to see if we are editing the expense or not
  const expensesCtx = useContext(ExpensesContext);
  const selectedExpense = expensesCtx.expenses.find(expense => expense.id === editedExpenseId);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState()

  //useLayoutEffect is a version of useEffect that fires before the browser repaints the screen.
  //we are using useLayoutEffect to edit the title of ManageExpense programmatically
  useLayoutEffect(()=>{
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense'
    })
  },[navigation, isEditing]);

  async function deleteExpenseHandler(){
    setIsSubmitting(true);
    try {
      await deleteExpense(editedExpenseId);
      expensesCtx.deleteExpense(editedExpenseId);
      navigation.goBack();
    } catch (error) {
      setError('Could not delete expense! Try again later!')
      setIsSubmitting(false);
    }
  }
  function cancelHandler(){
    navigation.goBack();
  }
  async function confirmHandler(expenseData){
    setIsSubmitting(true);
    try {

      if (isEditing){
        expensesCtx.updateExpense(editedExpenseId, expenseData);
        await updateExpense(editedExpenseId, expenseData);//backend
      } else{
        const id = await storeExpense(expenseData);
        expensesCtx.addExpense({...expenseData, id: id});
      }
      navigation.goBack();
    } catch (error) {
      setError('Could not save data! Try again later!');
      setIsSubmitting(false);
  }
    
  }

 

  if (error && !isSubmitting){
    return <ErrorOverlay message={error} />
  }

  if (isSubmitting){
    return <LoadingOverlay/>
  }

  return (
    <View style={styles.container}>
      <ExpenseForm 
        submitButtonLabel={isEditing ? 'Update' : 'Add'} 
        onCancel={cancelHandler} 
        onSubmit={confirmHandler}
        defaultValues={selectedExpense}
      />
        
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
  
})
