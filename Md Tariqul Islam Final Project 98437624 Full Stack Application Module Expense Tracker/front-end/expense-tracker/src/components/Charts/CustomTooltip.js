
import '../../App.css';
import { CURRENCY_SYMBOL } from '../../utils/helper';

function CustomTooltip({active, payload}) {
    if(active && payload && payload.length) {
  return (
    <div className="bg-slate-800 shadow-md rounded-lg p-2 border border-slate-700">
        <p className='text-xs font-semibold text-primary mb-1'>{payload[0].name}</p>
        <p className='text-sm text-slate-300'>
            Amount: <span className='text-sm font-medium text-slate-100'>{CURRENCY_SYMBOL}{payload[0].value}</span>
        </p>
    </div>
  );
}
return null;
}

export default CustomTooltip;
