import { 
     LuLayoutDashboard,
     LuHandCoins, 
     LuWalletMinimal, 
     LuUpload, 
     LuLogOut, 
     LuShieldCheck 
    } from "react-icons/lu";

export const getSideMenuData = (role) => {
  const base = [
    { 
    id: "01", 
    label: "Dashboard", 
    icon: LuLayoutDashboard, 
    path: "/dashboard" 
    },

    { 
    id: "02", 
    label: "Income", 
    icon: LuWalletMinimal, 
    path: "/income" 
    },

    { 
    id: "03", 
    label: "Expense", 
    icon: LuHandCoins, 
    path: "/expense" 
    },

    { 
    id: "04", 
    label: "Import CSV", 
    icon: LuUpload, 
    path: "" 
    },
  ];


  //different shown items for admins
  if (role === "admin") {
    base.push(

        { 
        id: "05", 
        label: "Admin", 
        icon: LuShieldCheck, 
        path: "/admin" 
        });
  }

  base.push(
    { 
    id: "06", 
    label: "Logout", 
    icon: LuLogOut, 
    path: "/logout" 
    });
    
  return base;
};
