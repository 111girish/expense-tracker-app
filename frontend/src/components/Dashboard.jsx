import { useState, useEffect, useContext } from 'react';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';
import { getExpenses, createExpense, updateExpense, deleteExpense } from '../api';
import { AuthContext } from '../context/AuthContext';

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const data = await getExpenses();
      setExpenses(data);
      setError(null);
    } catch (err) {
      if (err.response?.status === 401) {
        logout();
      } else {
        setError('Failed to load expenses.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (editingExpense) {
        await updateExpense(editingExpense.id, formData);
        setEditingExpense(null);
      } else {
        await createExpense(formData);
      }
      fetchExpenses();
    } catch (err) {
      alert('Error saving expense!');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      try {
        await deleteExpense(id);
        fetchExpenses();
      } catch (err) {
        alert('Error deleting expense!');
      }
    }
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
  };

  const handleCancelEdit = () => {
    setEditingExpense(null);
  };

  const total = expenses.reduce((sum, expense) => {
    return sum + parseFloat(expense.amount);
  }, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500 text-xl">Loading expenses...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-blue-600 text-white py-6 shadow-md">
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">💰 Expense Tracker</h1>
            <p className="text-blue-100 mt-1">Welcome, {user?.username}!</p>
          </div>
          <button
            onClick={logout}
            className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Error Message */}
        {error && (
          <div className="bg-red-100 text-red-700 border border-red-300 rounded-lg p-4 mb-6">
            ⚠️ {error}
          </div>
        )} 

        {/* Summary Card */}
        <div className="bg-white rounded-lg shadow p-5 mb-6 flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm">Total Expenses</p>
            <p className="text-3xl font-bold text-gray-800">${total.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Number of Expenses</p>
            <p className="text-3xl font-bold text-blue-600">{expenses.length}</p>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="flex gap-6 items-start">
          {/* LEFT SIDE - Form */}
          <div className="w-2/5 sticky top-6">
            <ExpenseForm
              onSubmit={handleSubmit}
              editingExpense={editingExpense}
              onCancelEdit={handleCancelEdit}
            />
          </div>

          {/* RIGHT SIDE - List */}
          <div className="w-3/5">
            <ExpenseList
              expenses={expenses}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;