
import { useEffect, useState } from 'react';
import '../../App.css';
import CustomPieChart from '../../components/Charts/CustomPieChart';
import { CURRENCY_SYMBOL } from '../../utils/helper';


function RecentIncomeWithChart({data, totalIncome}) {
    const[chartData, setChartData] = useState([])
    const COLORS = ["#2DD4BF", "#FA2C37", "#FF6900", "#4F39F6"];

    const prepareChartData = () => {
        const dataArr = data?.map((item) =>({
            name:item?.source,
            amount:item?.amount,
        }));

        setChartData(dataArr);
    };

    useEffect(() => {
        prepareChartData();

        return() => {};

    }, [data])



  return (
    <div className='bg-slate-900 p-6 rounded-2xl shadow-md shadow-black/20 border border-slate-800/60'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg text-slate-100'>
                Last 60 Days Income
            </h5>
        </div>

        <CustomPieChart
        data={chartData}
        label="Total Income"
        totalAmount={`${CURRENCY_SYMBOL}${totalIncome}`}
        showTextAnchor
        colors={COLORS}
        />
    </div>    
  );
}

export default RecentIncomeWithChart;
