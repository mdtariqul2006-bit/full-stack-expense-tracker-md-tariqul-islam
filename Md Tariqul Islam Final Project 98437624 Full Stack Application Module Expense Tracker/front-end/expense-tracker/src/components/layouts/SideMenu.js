import { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import '../../App.css';
import { getSideMenuData } from '../../utils/data';
import { UserContext } from '../../context/userContext';
import CharAvatar from '../Cards/CharAvatar';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { LuUpload } from 'react-icons/lu';

// --- Animated Background Component ---
function FloatingPaths({ position }) {
    const paths = Array.from({ length: 36 }, (_, i) => ({
        id: i,
        d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
            380 - i * 5 * position
        } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
            152 - i * 5 * position
        } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
            684 - i * 5 * position
        } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
        width: 0.5 + i * 0.03,
    }));

    return (
        <div className="absolute inset-0 pointer-events-none">
            <svg className="w-full h-full text-teal-500" viewBox="0 0 696 316" fill="none">
                {paths.map((path) => (
                    <motion.path
                        key={path.id}
                        d={path.d}
                        stroke="currentColor"
                        strokeWidth={path.width}
                        strokeOpacity={0.15 + path.id * 0.02}
                        initial={{ pathLength: 0.3, opacity: 0.6 }}
                        animate={{
                            pathLength: 1,
                            opacity: [0.15, 0.4, 0.15],
                            pathOffset: [0, 1, 0],
                        }}
                        transition={{
                            duration: 20 + Math.random() * 10,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                        }}
                    />
                ))}
            </svg>
        </div>
    );
}
// -------------------------------------

const SideMenu = ({ activeMenu }) => {
    const { user, clearUser } = useContext(UserContext);
    const menuItems = getSideMenuData(user?.role);
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [uploading, setUploading] = useState(false);

    const handleLogout = () => {
        localStorage.clear();
        clearUser();
        navigate("/login");
    };

    const handleClick = (item) => {
        if (item.path === "logout" || item.label === "Logout") {
            handleLogout();
            return;
        }
        if (item.label === "Import CSV") {
            fileInputRef.current?.click();
            return;
        }
        navigate(item.path);
    };

    const handleFileChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.name.toLowerCase().endsWith(".csv")) {
            toast.error("Please upload a .csv file");
            e.target.value = "";
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        setUploading(true);
        try {
            const response = await axiosInstance.post(API_PATHS.IMPORT.IMPORT_CSV, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            toast.success(
            `Imported ${response.data.importedExpenses} expenses and ${response.data.importedIncomes} income entries` +
             (response.data.skipped ? ` (${response.data.skipped} skipped)` : "")
            );
            navigate("/dashboard");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to import CSV");
        } finally {
            setUploading(false);
            e.target.value = ""; // reset so the same file can be re-selected later
        }
    };

    return (
        <div className='w-64 h-[calc(100vh-61px)] bg-slate-950 border-r border-slate-800 p-5 sticky top-[61px] z-200 relative overflow-hidden'>
            
            {/* Background Animation */}
            <div className="absolute inset-0 z-0">
                <FloatingPaths position={1} />
                <FloatingPaths position={-1} />
            </div>

            {/* Content Wrapper - relative z-10 ensures buttons remain clickable above animation */}
            <div className='relative z-10 flex flex-col items-center justify-center gap-3 mt-3 mb-7 h-full'>
                <div className='flex flex-col items-center'>
                    {user?.profileImageUrl ? (
                        <img
                            src={user?.profileImageUrl || ""}
                            alt="Profile Image"
                            className="w-20 h-20 bg-slate-700 rounded-full border border-slate-700 shadow-md"
                        />
                    ) : (
                        <div className="border border-slate-700 rounded-full shadow-md">
                            <CharAvatar fullName={user?.fullName} width="w-20" height="h-20" />
                        </div>
                    )}
                    <h5 className='text-slate-100 font-medium leading-6 mt-2'>
                        {user?.fullName || ""}
                    </h5>
                </div>

                <div className="w-full flex-1 mt-4">
                    {menuItems.map((item, index) => (
                        <button
                            key={`menu_${index}`}
                            disabled={item.label === "Import CSV" && uploading}
                            className={`w-full flex items-center gap-4 text-[15px] py-3 px-6 rounded-lg mb-3 backdrop-blur-sm transition-all border border-transparent ${
                                activeMenu === item.label 
                                ? "text-slate-950 bg-teal-400 shadow-lg shadow-teal-500/20" 
                                : "text-slate-300 hover:bg-slate-900/50 hover:text-teal-400 hover:border-slate-800"
                            }`}
                            onClick={() => handleClick(item)}
                        >
                            <item.icon className="text-xl"/>
                            {item.label === "Import CSV" && uploading ? "Uploading..." : item.label}
                        </button>
                    ))}
                </div>

                <input
                    type="file"
                    accept=".csv"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                />
            </div>
        </div>
    );
};

export default SideMenu;