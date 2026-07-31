


import { IoMdDocument } from "react-icons/io";
import { LuArrowRight } from "react-icons/lu"
import moment from 'moment';
import TransactionInfoCard from "../Cards/TransactionInfoCard";

function RecentTransactions({transactions, onSeeMore}) {
  return (
<div className='bg-slate-900 p-6 rounded-2xl shadow-md shadow-black/20 border border-slate-800/60'>       
         <div className='flex items-center justify-between'>
            <h5 className='text-lg text-slate-100'>Recent Transactions</h5>

           <button 
                className='flex items-center gap-3 text-sm text-slate-300 hover:text-primary bg-slate-800 hover:bg-primary/10 px-4 py-1.5 rounded-lg border border-slate-700/60 cursor-pointer' 
                onClick={onSeeMore}
            >
                See All <LuArrowRight className="text-base"/>
            </button>
        </div>
        <div className="mt-6">
            {transactions?.slice(0,5)?.map((item) => (
                <TransactionInfoCard
                key={item._id}
                title = {item.type === 'expense' ? item.category : item.source}
                icon = {item.icon}
                date = {moment(item.date).format("Do MMM YYYY")}
                amount={item.amount}
                type={item.type}
                hideDeleteBtn
                />
            ))}
        </div>

         
    </div>    
  );
}

export default RecentTransactions;
