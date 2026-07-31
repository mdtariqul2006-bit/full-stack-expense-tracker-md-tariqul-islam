
import '../../App.css';
import { CURRENCY_SYMBOL } from '../../utils/helper';

function InfoCard({ icon, label, value, color }) {
  return (
    <div className='flex gap-6 bg-slate-900 p-6 rounded-2xl shadow-md shadow-black/20 border border-slate-800/60'>
      <div className={`w-14 h-14 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl`}>
        {icon}
    </div>  

    <div>
    <h6 className='text-sm text-slate-400 mb-1'>{label}</h6>
    <span className='text-[22px] text-slate-100'>{CURRENCY_SYMBOL}{value}</span>
    </div>
   </div>

  );
}

export default InfoCard;
