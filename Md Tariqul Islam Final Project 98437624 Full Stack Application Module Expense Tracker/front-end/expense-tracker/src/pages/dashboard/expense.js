import toast from 'react-hot-toast';
import '../../App.css';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { useUserAuth } from '../../hooks/useUserAuth';
import axiosInstance from '../../utils/axiosInstance';
import { useEffect, useState } from 'react';
import ExpenseOverview from '../../components/Expense/ExpenseOverview';
import { API_PATHS } from '../../utils/apiPaths';
import Modal from '../../components/layouts/Modal';
import AddExpenseForm from '../../components/Expense/AddExpenseForm';



function Expense() {
    useUserAuth();
  
    const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false)
    const [expenseData, setExpenseData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState ({
      show:false,
      data:null,
    });

    //get all expense details
      const fetchExpenseDetails = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`
      );

      if (response.data) {
        setExpenseData(response.data);
      }

    } catch {
      console.log ("Something went wrong. Please try again", console.error());
      

    } finally {
      setLoading(false);
    }
  };

  //handle add expense
 const handleAddExpense = async (expense) => {
  const { category, amount, date, icon } = expense;

  if (!category.trim()) {
    toast.error("Category is required!");
    return;
  }

  if (!amount || isNaN(amount) || Number(amount) <= 0) {
    toast.error("Amount should be a valid number greater than 0!");
    return;
  }

  if (!date) {
    toast.error("Date is required!");
    return;
  }

  try {
    await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
      category,
      amount,
      date,
      icon,
    });
    setOpenAddExpenseModal(false);
    toast.success("Expense added successfully!");
    fetchExpenseDetails();
  } catch (error) {
    console.error(
      "Error adding expense:",
      error.response?.data?.message || error.message
    );
  }
};

useEffect(()=> {
  fetchExpenseDetails();

  return () => {};
}, []);


  return (
    <DashboardLayout activeMenu="Expense">
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 gap-6'>
          <div className=''>
            <ExpenseOverview
              transactions={expenseData}
              onExpenseIncome={()=>setOpenAddExpenseModal(true)}
              />
          </div>
        </div>

        <Modal 
          isOpen={openAddExpenseModal}
          onClose={()=>setOpenAddExpenseModal(false)}
          title="Add Expense"
          >
            <AddExpenseForm onAddExpense={handleAddExpense}/>
          </Modal>
      </div>
      </DashboardLayout>
  );
}

export default Expense;
