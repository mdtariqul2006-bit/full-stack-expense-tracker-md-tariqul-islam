
import '../../App.css';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Cell,
} from "recharts";
import CustomTooltip from './CustomTooltip';
import { CURRENCY_SYMBOL } from '../../utils/helper';



function CustomBarChart({data}) {
    const getBarColor = (index) => {
        return index % 2 === 0 ? "#2DD4BF" : "#99F6E4";
    }

    const CustomTooltip = ({active, payload}) => {
        if (active && payload && payload.length) {
            return (
                <div className='bg-slate-800 shadow-md rounded-lg p-2 border border-slate-700'>
                    <p className='text-xs font-semibold text-primary mb-1'>{payload[0].payload.category}</p>
                    <p className='text-sm text-slate-300'>
                        <p className='text-sm text-slate-300'>
                            Amount: <span className='text-sm font-medium text-slate-100'>{CURRENCY_SYMBOL}{payload[0].payload.amount}</span>
                        </p>
                    </p>
                </div>
            );
        }
        return null;
    };
  return (
    <div className='bg-transparent mt-6'>
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data = {data}>
                <CartesianGrid stroke = "none"/>
                <XAxis dataKey="category" tick={{fontSize: 12, fill: "#94a3b8"}} stroke='none'/>
                <YAxis tick={{fontSize: 12, fill: "#94a3b8" }} stroke="none"/>

                <Tooltip content={CustomTooltip}/>

                <Bar
                dataKey="amount"
                fill= "#FF8042"
                radius={[10, 10, 0, 0]}
                activeDot={{r:8, fill:"yellow"}}
                activeStyle={{fill: "green"}}
                >

                {data.map((entry, index) => (
                    <Cell key={index} fill={getBarColor(index)}/>
                ))}    

                </Bar>
            </BarChart>
        </ResponsiveContainer>
    </div>
  );
}

export default CustomBarChart;
