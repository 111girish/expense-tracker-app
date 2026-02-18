function ExpenseList({ expenses, onDelete, onEdit }) {

  if (expenses.length === 0) {
    return (
      <div className="bg-white rounded-lg p-10 text-center text-gray-500 mt-6 shadow">
        <p className="text-lg">No expenses yet. Add your first expense! 💰</p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Expenses</h2>

      {expenses.map((expense) => (
        <div
          key={expense.id}
          className="bg-white rounded-lg shadow p-5 mb-4 border border-gray-100"
        >
          {/* Title + Amount */}
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-xl font-semibold text-gray-800">
              {expense.title}
            </h3>
            <span className="text-2xl font-bold text-blue-600">
              ${expense.amount}
            </span>
          </div>

          {/* Category, Date, Description */}
          <div className="text-gray-600 space-y-1 mb-4">
            <p>
              <span className="font-medium text-gray-700">Category: </span>
              <span className="capitalize bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-sm">
                {expense.category}
                
              </span>
            </p>
            <p>
              <span className="font-medium text-gray-700">Date: </span>
              {expense.date}
            </p>
            {expense.description && (
              <p>
                <span className="font-medium text-gray-700">Note: </span>
                {expense.description}
              </p>
            )}
          </div>

          {/* Edit + Delete Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => onEdit(expense)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(expense.id)}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ExpenseList;