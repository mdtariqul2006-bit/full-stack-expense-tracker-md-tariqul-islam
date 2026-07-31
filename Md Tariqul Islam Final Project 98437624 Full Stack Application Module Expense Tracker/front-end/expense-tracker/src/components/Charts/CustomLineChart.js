import { XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Area, AreaChart } from "recharts";
import { CURRENCY_SYMBOL } from '../../utils/helper';


export default function CustomLineChart ({data}) {

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return(
                <div className="bg-slate-800 shadow-md rounded-lg p-2 border border-slate-700">
                    <p className="text-xs font-semibold text-primary mb-1">
                        {payload[0].payload.category}
                    </p>
                    <p className="text-sm text-slate-300">
                        Amount: <span className="text-sm font-medium text-slate-100">{CURRENCY_SYMBOL}{payload[0].payload.amount}</span>
                    </p>
                </div>
            );
        }
        return null;
    };



    return (
        <div className="bg-transparent"> 
        <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
            <defs>
                <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2DD4BF" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#2DD4BF" stopOpacity={0}/>
                </linearGradient>
            </defs>
            <CartesianGrid stroke="none"/>
            <XAxis dataKey="month" tick={{fontSize: 12, fill: "#94a3b8"}} stroke="none" />
            <YAxis tick={{ fontSize: 12, fill: "#94a3b8"}} stroke="none"/>
            <Tooltip content={<CustomTooltip/>}/>

            <Area type="monotone" dataKey="amount" stroke="#2DD4BF" fill="url(#incomeGradient)" strokeWidth={3} dot={{r:3, fill:"#5EEAD4"}}/>


            </AreaChart>
        </ResponsiveContainer>
        
        </div>
    )
};