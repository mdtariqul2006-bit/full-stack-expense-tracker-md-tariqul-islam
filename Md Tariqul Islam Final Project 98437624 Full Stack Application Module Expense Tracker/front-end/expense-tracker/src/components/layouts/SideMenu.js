import { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import '../../App.css';
import { SIDE_MENU_DATA } from '../../utils/data';
import { UserContext } from '../../context/userContext';
import CharAvatar from '../Cards/CharAvatar';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { LuUpload } from 'react-icons/lu';

const SideMenu = ({ activeMenu }) => {
    const { user, clearUser } = useContext(UserContext);
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
        <div className='w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 p-5 sticky top-[61px] z-200'>
            <div className='flex flex-col items-center justify-center gap-3 mt-3 mb-7'>
                <div className=''>
                    {user?.profileImageUrl ? (
                        <img
                            src={user?.profileImageUrl || ""}
                            alt="Profile Image"
                            className="w-20 h-20 bg-slate-400 rounded-full"
                        />
                    ) : (
                        <CharAvatar fullName={user?.fullName} width="w-20" height="h-20" />
                    )}
                    <h5 className='text-gray-950 font-medium leading-6 mt-2'>
                        {user?.fullName || ""}
                    </h5>
                </div>

                {SIDE_MENU_DATA.map((item, index) => (
                    <button
                        key={`menu_${index}`}
                        disabled={item.label === "Import CSV" && uploading}
                        className={`w-full flex items-center gap-4 text-[15px] py-3 px-6 rounded-lg mb-3 ${
                            activeMenu === item.label ? "text-white bg-violet-500" : "text-gray-500 hover:bg-gray-50"
                        }`}
                        onClick={() => handleClick(item)}
                    >
                        <item.icon className="text-xl"/>
                        {item.label === "Import CSV" && uploading ? "Uploading..." : item.label}
                    </button>
                ))}

                
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