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
    <div className='bg-slate-900 p-6 rounded-2xl shadow-md shadow-black/20 border border-slate-800/60'>
      <div className='flex items-center justify-between'>
       <h5 className='text-lg text-slate-100'>Expenses</h5>

        <button 
          className='flex items-center gap-3 text-sm text-slate-300 hover:text-primary bg-slate-800 hover:bg-primary/10 px-4 py-1.5 rounded-lg border border-slate-700/60 cursor-pointer'
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