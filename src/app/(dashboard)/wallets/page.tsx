import { getWallets } from "./actions";
import WalletsClient from "./WalletsClient";

export default async function WalletsPage() {
  const wallets = await getWallets();

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Wallets</h1>
      </div>
      <WalletsClient initialWallets={wallets} />
    </div>
  );
}
