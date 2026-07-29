import { LuArrowRight } from 'react-icons/lu';
import { prepareExpenseLineChartData } from '../../utils/helper';
import { useEffect, useState } from 'react';

import CustomLineChart from '../Charts/CustomLineChart'; 

export default function ExpenseOverview({ transactions, onExpenseIncome }) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {

    //generate chart
    const lineChartResult = prepareExpenseLineChartData(transactions);
    setChartData(lineChartResult);

    return () => {};
  }, [transactions]);

  return (
    <div className='bg-white p-6 rounded-2xl shadow-md shadow-gray-100 border border-gray-200/50'>
      <div className='flex items-center justify-between'>
        <h5 className='text-lg'>Expenses</h5>

        <button 
          className='flex items-center gap-3 text-sm text-gray-700 hover:text-purple-500 bg-gray-50 hover:bg-purple-50 px-4 py-1.5 rounded-lg border border-gray-200/50 cursor-pointer'
          onClick={onExpenseIncome}
        >
          Add Expense<LuArrowRight className='text-base' />
        </button>
      </div>


      <div className='mt-10'>
        <CustomLineChart data={chartData} />
      </div>
      
    </div>
  );
}