/**
 * v0 by Vercel.
 * @see https://v0.dev/t/btero0aK9VK
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

const Kanban = () => {
  return (
    <div key="1" className="flex flex-col h-screen">
      <header className="h-[60px] flex items-center px-4 shadow-md">
        <h1 className="text-sm font-medium text-gray-900 dark:text-gray-50 flex items-center">
          <KanbanIcon className="mr-2 h-4 w-4" />
          Kanban Board
        </h1>
      </header>
      <main className="flex-1 overflow-auto py-4 px-4 bg-gray-100">
        <div className="flex space-x-4">
          <div className="w-72">
            <h2 className="mb-4 text-sm font-medium text-gray-400 dark:text-gray-300 flex items-center">
              <BackpackIcon className="mr-2 h-4 w-4" />
              Backlog
            </h2>
            <div className="bg-white p-3 rounded-lg shadow-sm mb-4">
              <h3 className="text-sm font-semibold mb-1">Task 1</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                This is a description for task 1.
              </p>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm mb-4">
              <h3 className="text-sm font-semibold mb-1">Task 2</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                This is a description for task 2.
              </p>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm mb-4">
              <h3 className="text-sm font-semibold mb-1">Task 3</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                This is a description for task 3.
              </p>
            </div>
          </div>
          <div className="w-72">
            <h2 className="mb-4 text-sm font-medium text-gray-400 dark:text-gray-300 flex items-center">
              <ListTodoIcon className="mr-2 h-4 w-4" />
              To Do
            </h2>
            <div className="bg-white p-3 rounded-lg shadow-sm mb-4">
              <h3 className="text-sm font-semibold mb-1">Task 4</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                This is a description for task 4.
              </p>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm mb-4">
              <h3 className="text-sm font-semibold mb-1">Task 5</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                This is a description for task 5.
              </p>
            </div>
          </div>
          <div className="w-72">
            <h2 className="mb-4 text-sm font-medium text-gray-400 dark:text-gray-300 flex items-center">
              <ActivityIcon className="mr-2 h-4 w-4" />
              In Progress
            </h2>
            <div className="bg-white p-3 rounded-lg shadow-sm mb-4">
              <h3 className="text-sm font-semibold mb-1">Task 6</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                This is a description for task 6.
              </p>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm mb-4">
              <h3 className="text-sm font-semibold mb-1">Task 7</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                This is a description for task 7.
              </p>
            </div>
          </div>
          <div className="w-72">
            <h2 className="mb-4 text-sm font-medium text-gray-400 dark:text-gray-300 flex items-center">
              <CheckIcon className="mr-2 h-4 w-4" />
              Done
            </h2>
            <div className="bg-white p-3 rounded-lg shadow-sm mb-4">
              <h3 className="text-sm font-semibold mb-1">Task 8</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                This is a description for task 8.
              </p>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm mb-4">
              <h3 className="text-sm font-semibold mb-1">Task 9</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                This is a description for task 9.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Kanban;

const ActivityIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
);

const BackpackIcon = (props) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 20V10a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z" />
      <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
      <path d="M8 21v-5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v5" />
      <path d="M8 10h8" />
      <path d="M8 18h8" />
    </svg>
  );
};

const CheckIcon = (props) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
};

const KanbanIcon = (props) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 5v11" />
      <path d="M12 5v6" />
      <path d="M18 5v14" />
    </svg>
  );
};

const ListTodoIcon = (props) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="5" width="6" height="6" rx="1" />
      <path d="m3 17 2 2 4-4" />
      <path d="M13 6h8" />
      <path d="M13 12h8" />
      <path d="M13 18h8" />
    </svg>
  );
};
