import { getSignals } from "./actions";
import SignalsClient from "./SignalsClient";

export default async function SignalsPage() {
  const signals = await getSignals();

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Signals Configuration</h1>
      </div>
      <SignalsClient initialSignals={signals} />
    </div>
  );
}
