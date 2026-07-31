
import '../../App.css';
import { LuArrowRight } from 'react-icons/lu';
import TransactionInfoCard from '../Cards/TransactionInfoCard';
import moment from "moment";

function ExpenseTransactions({transactions, onSeeMore}) {
  return (
    <div className='bg-slate-900 p-6 rounded-2xl shadow-md shadow-black/20 border border-slate-800/60'> 
        <div className='flex items-center justify-between'>
            <h5 className='text-lg text-slate-100'>
                Expenses
            </h5>

            <button className='flex items-center gap-3 text-sm text-slate-300 hover:text-primary bg-slate-800 hover:bg-primary/10 px-4 py-1.5 rounded-lg border border-slate-700/60 cursor-pointer'  onClick={onSeeMore}>
                See All<LuArrowRight className='text-base'/>
            </button>
        </div>

        <div className='mt-6'>
            {transactions?.slice(0,4)?.map((expense)=>(
                <TransactionInfoCard
                key={expense._id}
                title={expense.category}
                icon={expense.icon}
                date={moment(expense.date).format("Do MMM YYYY")}
                amount={expense.amount}
                type="expense"
                hideDeleteBtn
                />
            ))}
        </div>


    </div>
  );
}

export default ExpenseTransactions;
