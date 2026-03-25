import { getUsers } from "./actions";
import UsersClient from "./UsersClient";

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Users</h1>
      </div>
      <UsersClient initialUsers={users} />
    </div>
  );
}
