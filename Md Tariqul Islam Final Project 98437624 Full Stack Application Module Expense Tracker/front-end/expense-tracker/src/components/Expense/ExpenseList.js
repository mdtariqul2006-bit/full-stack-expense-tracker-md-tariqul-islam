import { LuDownload } from 'react-icons/lu';
import '../../App.css';
import TransactionInfoCard from '../Cards/TransactionInfoCard';
import moment from 'moment';

function ExpenseList({ transactions, onDelete, onDownload }) {
  return (
    <div className='bg-slate-900 p-6 rounded-2xl shadow-md shadow-black/20 border border-slate-800/60'>
      <div className='flex items-center justify-between'>
        <h5 className='text-lg text-slate-100'>Expense Sources</h5>
        <button 
          className='flex items-center gap-3 text-sm text-slate-300 hover:text-primary bg-slate-800 hover:bg-primary/10 px-4 py-1.5 rounded-lg border border-slate-700/60 cursor-pointer'  
          onClick={onDownload}
        >
          <LuDownload className='text-base'/> Download
        </button>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-6'>
        {transactions?.map((expense) => (
          <TransactionInfoCard
            key={expense._id}
            title={expense.category}
            icon={expense.icon}
            date={moment(expense.date).format("Do MMM YYYY")}
            amount={expense.amount}
            type="expense"
            onDelete={() => onDelete(expense._id)}
          />
        ))}
      </div>
    </div>
  );
}

export default ExpenseList;