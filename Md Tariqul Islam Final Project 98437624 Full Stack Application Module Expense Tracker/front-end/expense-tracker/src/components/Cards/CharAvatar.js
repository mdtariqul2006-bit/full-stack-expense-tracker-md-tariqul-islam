import '../../App.css';
import { getInitials } from "../../utils/helper";

function CharAvatar({ fullName, width, height, style }) {
  return (
    <div 
      className={`${width || 'w-12'} ${height || 'h-12'} ${style || ''} flex items-center justify-center rounded-full text-slate-100 font-medium bg-slate-700`}
    > 
        {getInitials(fullName || "")}
    </div>
  );
}

export default CharAvatar;