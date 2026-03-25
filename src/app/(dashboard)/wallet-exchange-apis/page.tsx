import { getWalletExchangeApis } from "./actions";
import WalletExchangeApisClient from "./WalletExchangeApisClient";

export default async function WalletExchangeApisPage() {
  const apis = await getWalletExchangeApis();

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Wallet Exchange APIs</h1>
      </div>
      <WalletExchangeApisClient initialApis={apis} />
    </div>
  );
}
