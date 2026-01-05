import { useNavigate } from "react-router-dom";
import CreateUser from "../components/ CreateUser";

export default function Home() {
  const navigate = useNavigate();

  const handleUserCreated = (user) => {
    // Navigate to /generate with user in state
    navigate("/generate", { state: { user } });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Create User</h1>
      <CreateUser onUserCreated={handleUserCreated} />
    </div>
  );
}
