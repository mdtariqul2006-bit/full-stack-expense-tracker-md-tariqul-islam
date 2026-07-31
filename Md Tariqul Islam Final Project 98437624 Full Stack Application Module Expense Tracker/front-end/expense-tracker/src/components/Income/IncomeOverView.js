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
   
        <div className='bg-slate-900 p-6 rounded-2xl shadow-xl shadow-black/20 border border-slate-800'>
            <div className='flex items-center justify-between'>
                <h5 className='text-lg text-slate-100'>
                    Income
                </h5>
                <p className='text-xs text-slate-500 mt-0.5'>
                    Track your earnings over time and analyze your income trends
                </p>
                
                <button className='flex items-center gap-3 text-sm text-slate-300 hover:text-teal-400 bg-slate-800 hover:bg-teal-500/10 px-4 py-1.5 rounded-lg border border-slate-700/60 cursor-pointer transition-colors' onClick={onAddIncome}>
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

export default IncomeOverView;