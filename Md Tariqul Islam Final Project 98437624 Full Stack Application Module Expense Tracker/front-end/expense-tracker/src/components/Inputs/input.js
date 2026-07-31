import '../../App.css';
import {FaRegEye, FaRegEyeSlash} from "react-icons/fa6"
import { useState } from 'react';




function Input({value, onChange, placeholder, type, label}) {
    const [showPassword , setShowPassword] = useState(false);

    const toggleShowPassword=()=>{
        setShowPassword(!showPassword);
    };
  return (
    <div>
        <label className="text-[13px] text-slate-300">{label}</label>


    <div className="w-full flex items-center justify-between gap-3 text-sm text-slate-100 bg-slate-800 rounded px-4 py-3 mt-1 border border-slate-700 outline-none focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">         
        <input 
            type= {type ==='password' ? showPassword ? 'text' : 'password' : type}
            placeholder={placeholder}
            className="w-full bg-transparent outline-none"
            value={value}
            onChange={(e)=> onChange(e)}
            />

            {type === 'password' && (
                <>
                {showPassword ? (
                    <FaRegEye
                    size={22}
                    className="text-primary cursor-pointer"
                    onClick={toggleShowPassword}
                    />
                ) : (
                    <FaRegEyeSlash
                    size={22}
                    className="text-slate-400 cursor-pointer"
                    onClick={toggleShowPassword}
                    />
                )}
                </>
            )}
            
        </div>

    </div>
  );
}

export default Input;
