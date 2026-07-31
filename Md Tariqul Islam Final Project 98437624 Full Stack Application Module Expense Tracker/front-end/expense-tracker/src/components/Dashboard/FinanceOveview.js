
import '../../App.css';
import CustomPieChart from '../Charts/CustomPieChart';
import { CURRENCY_SYMBOL } from '../../utils/helper';

function FinanceOverview({totalBalance, totalIncome, totalExpense}) {
    const COLORS = ["#2DD4BF", "#FA2C37", "#FF6900"];
        const balanceData =[
        {name: "Total Balance", amount: totalBalance},
        {name: "Total Expenses", amount: totalExpense},
        {name: "Total Income", amount: totalIncome},

    ];
    
return (
       
        <div className='bg-slate-900 p-6 rounded-2xl shadow-md shadow-black/20 border border-slate-800/60'>
            
            <div className='flex items-center justify-between'>
               
                <h5 className='text-lg text-slate-100'>Financial Overview</h5>
            </div>
     
          
            <div className='mt-6'>
                <CustomPieChart 
                    data={balanceData}
                    label="Total Balance"
                    totalAmount={`${CURRENCY_SYMBOL}${parseFloat(totalBalance.toFixed(4))}`}
                    colors={COLORS}
                    showTextAnchor
                />
            </div>
            
        </div>
    );
}

export default FinanceOverview;
