import { LuTrendingUpDown } from 'react-icons/lu';
import '../../App.css';
import darkChart from '../../assets/images/dark-chart-illustration.svg';
import { CURRENCY_SYMBOL } from '../../utils/helper';

const StatsInfoCard = ({icon, label, value, color}) => {
  return (
    <div className="flex items-center gap-6 bg-slate-900 p-4 rounded-xl shadow-xl shadow-primary/10 border border-slate-800 z-50 min-w-[300px]">
       <div className={`w-12 h-12 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl`}>
          {icon}
        </div>
        
        <div className="flex flex-col">
          <h6 className="text-xs text-slate-400 mb-1">{label}</h6>
          <span className="text-xl font-bold text-slate-100">{CURRENCY_SYMBOL} {value}</span>
        </div>
    </div>
  );
}

function AuthLayout({ children }) {
  return (
    <div className="flex">
       
       {/* LEFT SIDE */}
       <div className="w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12">
        <h2 className="text-lg font-medium text-slate-100">Expense Tracker</h2>
        {children}
       </div>

      {/* RIGHT SIDE */}
      <div className="hidden md:block w-[40vw] h-screen bg-slate-950 bg-auth-img bg-cover bg-no-repeat bg-center overflow-hidden relative">
          
          <div className="w-48 h-48 rounded-[40px] bg-teal-500/20 absolute -top-7 -left-5 z-0" />
          <div className="w-48 h-56 rounded-[40px] border-[20px] border-teal-500/10 absolute top-[30%] -right-10 z-0" />
          <div className="w-48 h-48 rounded-[40px] bg-teal-500/20 absolute -bottom-7 -left-5 z-0" />
          
          <div className="absolute top-16 right-12 z-20">
            <StatsInfoCard
              icon={<LuTrendingUpDown/>}
              label="Track Your Income & Expenses"
              value="430,000"
              color="bg-teal-400" 
            />
          </div>
          
          <img 
            src={darkChart} 
            alt="Dashboard Chart Illustration" 
            className="absolute bottom-12 right-12 z-20 rounded-xl shadow-2xl w-[80%] border border-slate-800" 
          />
          
      </div>
    </div>
  );
}

export default AuthLayout;