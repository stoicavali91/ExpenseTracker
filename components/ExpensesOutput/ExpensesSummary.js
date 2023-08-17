
import {View, Text, StyleSheet} from 'react-native';
import { GlobalStyles } from '../../constants/styles';

function ExpensesSummary({expenses ,periodName}) {

  //reduce is a javascript method that can be executed on arrays and it allows to combine multiple values in an array into a single value. Takes a function as a parameter
  const expensesSum = expenses.reduce((sum, expense) => {
    return sum + expense.amount;
  }, 0); // 0 is the initial value of the sum

  return (
    <View style={styles.container}> 
      <Text style={styles.period}>{periodName}</Text>
      <Text style={styles.sum}>${expensesSum.toFixed(2)}</Text>
      {/* toFixed(2) makes sure that the sum is displayed as a number with 2 decimal places */}
    </View>
  )
}

export default ExpensesSummary

const styles = StyleSheet.create({
  container:{
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary50,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  period: {
    fontSize: 12,
    color: GlobalStyles.colors.primary400,
  },
  sum:{
    fontSize: 16,
    fontWeight: 'bold',
    color: GlobalStyles.colors.primary500,
  }
});