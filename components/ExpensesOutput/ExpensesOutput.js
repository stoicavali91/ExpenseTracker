
import {View, Text, StyleSheet} from 'react-native';
import { GlobalStyles } from '../../constants/styles';

import ExpensesList from './ExpensesList';
import ExpensesSummary from './ExpensesSummary';

//expenses is an array of objects, where every object is an expense
//expensesPeriod should be an array of periods
function ExpensesOutput({expenses, expensesPeriod, fallbackText}) {

  let content = <Text style={styles.infoTextStyling}>{fallbackText}</Text>;
  if (expenses.length > 0){
    content = <ExpensesList expenses={expenses}/>;
  }
 

  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} periodName={expensesPeriod}/>
      {content}
    </View>
  )
}

export default ExpensesOutput;

const styles = StyleSheet.create({
  container:{
    flex: 1,
    paddingBottom: 0,
    paddingHorizontal: 24,
    paddingTop: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  infoTextStyling:{
    color:'white',
    fontSize: 16,
    marginTop: 32,
    textAlign: 'center',
  }
})
