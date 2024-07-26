import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from './store/store';
import { fetchUsers, setCurrentPage } from './store/userSlice';

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, status, currentPage } = useSelector(
    (state: RootState) => state.users,
  );

  useEffect(() => {
    dispatch(fetchUsers(currentPage));
  }, [dispatch, currentPage]);

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-4 shadow-md sticky top-0">
        <h1 className="text-3xl font-bold text-center">Random User List</h1>
      </header>
      <main className="container mx-auto p-4 flex-grow">
        {status === 'loading' && <p className="text-center">Loading...</p>}
        {status === 'succeeded' && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg border border-black">
              <thead className="bg-gray-50 border-b border-black">
                <tr>
                  <th className="border-r py-2 px-4 border-b border-black text-left font-bold text-gray-700 text-lg">
                    Full Name
                  </th>
                  <th className="border-r py-2 px-4 border-b border-black text-left font-bold text-gray-700 text-lg">
                    Username
                  </th>
                  <th className="py-2 px-4 border-b border-black text-left font-bold text-gray-700 text-lg">
                    Thumbnail
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user: any) => (
                  <tr
                    key={user.login.uuid}
                    className="hover:bg-gray-100 border-b border-black"
                  >
                    <td className="py-2 px-4 border-r border-black">
                      {user.name.title} {user.name.first} {user.name.last}
                    </td>
                    <td className="py-2 px-4 border-r border-black">
                      {user.login.username}
                    </td>
                    <td className="py-2 px-4">
                      <img
                        className="rounded-full border border-black"
                        src={user.picture.thumbnail}
                        alt="thumbnail"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {status === 'failed' && (
          <p className="text-center text-red-500">
            Error: Unable to fetch users
          </p>
        )}
        <div className="flex justify-between mt-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600 disabled:opacity-50"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600 disabled:opacity-50"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === 10}
          >
            Next
          </button>
        </div>
      </main>
      <footer className="bg-blue-600 text-white p-4 text-center shadow-inner">
        <p>&copy; 2024 Random User App</p>
      </footer>
    </div>
  );
};

export default App;
