import { LuDownload } from 'react-icons/lu';
import '../../App.css';
import TransactionInfoCard from '../Cards/TransactionInfoCard';
import moment from 'moment';

function IncomeList({ transactions, onDelete, onDownload }) {
  return (
    <div className='bg-white p-6 rounded-2xl shadow-md shadow-gray-100 border border-gray-200/50'>
      <div className='flex items-center justify-between'>
        <h5 className='text-lg'>Income Sources</h5>
        <button 
          className='flex items-center gap-3 text-sm text-gray-700 hover:text-purple-500 bg-gray-50 hover:bg-purple-50 px-4 py-1.5 rounded-lg border border-gray-200/50 cursor-pointer'  
          onClick={onDownload}
        >
          <LuDownload className='text-base'/> Download
        </button>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-6'>
        {transactions?.map((income) => (
          <TransactionInfoCard
            key={income._id}
            title={income.source}
            icon={income.icon}
            date={moment(income.date).format("Do MMM YYYY")}
            amount={income.amount}
            type="income"
            onDelete={() => onDelete(income._id)}
          />
        ))}
      </div>
    </div>
  );
}

export default IncomeList;