const ResultCard = ({ result }) => {
  if (!result) return null;

  const { user } = result;

  return (
    <div className="border p-4 rounded shadow bg-white">
      <h2 className="text-xl font-bold mb-2">User Information</h2>
      <p><strong>ID:</strong> {user.id}</p>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
      <p><strong>Blood Group:</strong> {user.blood}</p>
      <p><strong>Access Role:</strong> {user.role}</p>
      <p><strong>Created At:</strong> {new Date(user.createdAt).toLocaleString()}</p>
    </div>
  );
};

export default ResultCard;
