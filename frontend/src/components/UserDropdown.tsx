import { useEffect, useState } from "react";

interface IUser {
  username: string;
  email: string;
}

function UserDropdown() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<IUser>({ username: "", email: "" });
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token"); // assumed stored during login

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:5008/api/member", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch user");
        }

        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        type="button"
        className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
        aria-expanded={open}
      >
        <span className="sr-only">Open user menu</span>
        <img
          className="w-8 h-8 rounded-full"
          src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
          alt="user photo"
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 z-50 w-auto bg-white divide-y divide-gray-100 rounded-sm shadow-lg dark:bg-gray-700 dark:divide-gray-600">
          <div className="px-4 py-3">
            {loading ? (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Loading...
              </p>
            ) : user ? (
              <>
                <p className="text-sm text-gray-900 dark:text-white capitalize">
                  {user.username}
                </p>
                <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300">
                  {user.email}
                </p>
              </>
            ) : (
              <p className="text-sm text-red-500 dark:text-red-400">
                User not found
              </p>
            )}
          </div>

          <ul className="py-1">
            <li>
              <a
                href="/dashboard"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="/settings"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Settings
              </a>
            </li>
            <li>
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.href = "/login";
                }}
                className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Sign out
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default UserDropdown;
