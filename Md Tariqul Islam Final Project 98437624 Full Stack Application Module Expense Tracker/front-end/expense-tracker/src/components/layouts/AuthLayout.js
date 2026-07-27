import { LuTrendingUpDown } from 'react-icons/lu';
import '../../App.css';
import CARD_2 from '../../assets/images/CARD_2.png';

const StatsInfoCard = ({icon, label, value, color}) => {
  return (
    
    <div className="flex items-center gap-6 bg-white p-4 rounded-xl shadow-xl shadow-purple-400/20 border border-gray-200/50 z-50 min-w-[300px]">
       
       {/* Icon Circle */}
       <div className={`w-12 h-12 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl`}>
          {icon}
        </div>
        
        
        <div className="flex flex-col">
          <h6 className="text-xs text-gray-500 mb-1">{label}</h6>
          <span className="text-xl font-bold text-black">$ {value}</span>
        </div>

    </div>
  );
}

function AuthLayout({ children }) {
  return (
    <div className="flex">
       
       {/* LEFT SIDE */}
       <div className="w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12">
        <h2 className="text-lg font-medium text-black">Expense Tracker</h2>
        {children}
       </div>

      {/* RIGHT SIDE */}
      <div className="hidden md:block w-[40vw] h-screen bg-violet-50 bg-auth-img bg-cover bg-no-repeat bg-center overflow-hidden relative">
          
          <div className="w-48 h-48 rounded-[40px] bg-purple-600 absolute -top-7 -left-5 z-0" />
          <div className="w-48 h-56 rounded-[40px] border-[20px] border-fuchsia-600 absolute top-[30%] -right-10 z-0" />
          <div className="w-48 h-48 rounded-[40px] bg-violet-500 absolute -bottom-7 -left-5 z-0" />

          
          <div className="absolute top-16 right-12 z-20">
            <StatsInfoCard
              icon={<LuTrendingUpDown/>}
              label="Track Your Income & Expenses"
              value="430,000"
              color="bg-purple-600" 
            />
          </div>
          
          
          <img
              src={CARD_2}
              className="w-64 lg:w-[85%] absolute bottom-10 left-1/2 -translate-x-1/2 shadow-lg shadow-blue-400/15 z-10"
              alt="Dashboard Preview"
          />
          
      </div>
    </div>
  );
}

export default AuthLayout;