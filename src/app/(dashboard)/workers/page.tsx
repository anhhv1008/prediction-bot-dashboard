import { getWorkers } from "./actions";
import WorkersClient from "./WorkersClient";

export default async function WorkersPage() {
  const workers = await getWorkers();

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Bot Workers</h1>
      </div>
      <WorkersClient initialWorkers={workers} />
    </div>
  );
}
