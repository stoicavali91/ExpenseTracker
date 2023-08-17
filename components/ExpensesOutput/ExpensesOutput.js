
import {View, StyleSheet} from 'react-native';
import { GlobalStyles } from '../../constants/styles';

import ExpensesList from './ExpensesList';
import ExpensesSummary from './ExpensesSummary';


const dummy__expenses = [
  {
    id: 'e1',
    description: 'Pair of shoes',
    amount: 159.99,
    date: new Date('2021-12-19')
  },
  {
    id: 'e2',
    description: 'Pair of trousers',
    amount: 89.99,
    date: new Date('2021-12-31')
  },
  {
    id: 'e3',
    description: 'Pair of cohones',
    amount: 9.99,
    date: new Date('2021-08-19')
  },
  {
    id: 'e4',
    description: 'Pair of nothing',
    amount: 0.99,
    date: new Date('2021-01-19')
  },
  {
    id: 'e5',
    description: 'Book',
    amount: 15.99,
    date: new Date('2021-07-19')
  },
  {
    id: 'e6',
    description: 'Pair of cohones',
    amount: 9.99,
    date: new Date('2021-08-19')
  },
  {
    id: 'e7',
    description: 'Pair of nothing',
    amount: 0.99,
    date: new Date('2021-01-19')
  },
  {
    id: 'e8',
    description: 'Book',
    amount: 15.99,
    date: new Date('2021-07-19')
  },
]

//expenses is an array of objects, where every object is an expense
//expensesPeriod should be an array of periods
function ExpensesOutput({expenses, expensesPeriod}) {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={dummy__expenses} periodName={expensesPeriod}/>
      <ExpensesList expenses={dummy__expenses}/>
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

})
