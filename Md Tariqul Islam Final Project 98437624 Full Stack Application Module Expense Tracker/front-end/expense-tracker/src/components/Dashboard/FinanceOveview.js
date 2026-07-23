
import '../../App.css';
import CustomPieChart from '../Charts/CustomPieChart';

function FinanceOverview({totalBalance, totalIncome, totalExpense}) {
    const COLORS = ["#875CF5", "#FA2C37", "#FF6900"];
        const balanceData =[
        {name: "Total Balance", amount: totalBalance},
        {name: "Total Expenses", amount: totalExpense},
        {name: "Total Income", amount: totalIncome},

    ];
    
return (
       
        <div className='bg-white p-6 rounded-2xl shadow-md shadow-gray-100 border border-gray-200/50'>
            
            <div className='flex items-center justify-between'>
               
                <h5 className='text-lg'>Financial Overview</h5>
            </div>
     
          
            <div className='mt-6'>
                <CustomPieChart 
                    data={balanceData}
                    label="Total Balance"
                    totalAmount={`$${totalBalance}`}
                    colors={COLORS}
                    showTextAnchor
                />
            </div>
            
        </div>
    );
}

export default FinanceOverview;
