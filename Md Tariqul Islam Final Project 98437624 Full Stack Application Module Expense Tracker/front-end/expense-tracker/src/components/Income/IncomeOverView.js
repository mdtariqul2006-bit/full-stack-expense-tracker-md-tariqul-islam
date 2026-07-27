
import '../../App.css';
import { LuPlus, } from "react-icons/lu";
import CustomBarChart from '../Charts/CustomBarChart';
import { useEffect, useState } from 'react';
import { prepareIncomeBarChartData } from '../../utils/helper';

function IncomeOverView({transactions, onAddIncome}) {
    const [chartData, setChartData] = useState ([])

    useEffect(()=>{
        const result = prepareIncomeBarChartData(transactions);
        setChartData(result);

        return () => {};
    }, [transactions]);
  return (
        <div className='bg-white p-6 rounded-2xl shadow-md shadow-gray-100 border border-gray-200/50'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg'>
                Income
            </h5>
            <p className='text-xs text-gray-400 mt-0.5'>
                Track your earnings over time and analyze your income trends
            </p>
            <button className='flex items-center gap-1.5 text-xs md:text-sm font-medium text-purple-600 whitespace-nowrap bg-purple-50 border border-purple-100 rounded-lg px-4 py-2 cursor-pointer' onClick={onAddIncome}>
                <LuPlus className='text-lg' />
                Add Income
            </button>

        </div>
        <div className='mt-10'>
            <CustomBarChart data={chartData}/>
        </div>
        </div>
  );
}

export default IncomeOverView ;
