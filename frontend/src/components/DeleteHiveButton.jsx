const apiUrl = process.env.REACT_APP_API_URL;

const DeleteHiveButton = ({ hiveId, token, onDeleted }) => {
  const handleDelete = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this hive?"
    );
    if (!confirm) return;

    try {
      const res = await fetch(`${apiUrl}/api/hive/${hiveId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        alert("Hive deleted successfully");
        if (onDeleted) onDeleted();
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      alert("Failed to delete hive");
      console.error(error);
    }
  };

  return (
    <button
      onClick={() => handleDelete()}
      className="mr-5 text-sm px-3 py-1.5 bg-red-600 text-white rounded hover:bg-red-600 transition cursor-pointer"
    >
      Delete
    </button>
  );
};

export default DeleteHiveButton;
