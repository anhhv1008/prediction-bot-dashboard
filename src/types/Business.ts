export const CACHE_MARKET_DETAIL_KEY = "Market.Current.Detail";
export const ACTION_MESSAGE_QUEUE_INTERVAL_TIME = 1000;
export const BOT_STARTING_WORKER_DELAY_TIME = 3000;
export const BOT_INIT_PHASE_DELAY_TIME = 1000;
export const DEFAULT_LEG_2_TIMEOUT = 60000;
export const DIP_ARBITRAGE_RETRY_SELL_ORDER_DELAY_TIME = 15000;
export const MAX_RETRY_SELL_ORDER_COUNT = 3;
export const ORDER_CAN_NOT_BE_FILLED_ERROR_MESSAGE =
  "order couldn't be fully filled";
export const ORDER_QTY_EXCEED_BALANCE = "not enough balance";

export enum TokenSide {
  Up = "up",
  Down = "down",
}

export enum OrderSide {
  Buy = "buy",
  Sell = "sell",
}

export enum Exchange {
  Polymarket = "polymarket",
}

export enum DipArbitrageSignalType {
  Leg1 = "leg1",
  Leg2 = "leg2",
}

export enum SignalIndicator {
  DipArbitrage = "dip_arbitrage",
  DipArbitrageVWAP = "dip_arbitrage_vwap",
  WinningSide = "winning_side",
  DipReverse = "dip_reverse",
}

export enum SignalConfigStatus {
  Active = "active",
  Inactive = "inactive",
}

export enum PhaseStatus {
  Pending = "pending",
  Executing = "executing",
  Executed = "executed",
  Closing = "closing",
  Closed = "closed",
  Canceled = "canceled",
}

export enum WorkerConfigStatus {
  Active = "active",
  Inactive = "inactive",
}

export enum RedisNotificationChannel {
  Business = "Channel.Business",
  ExchangeSignal = "Channel.ExchangeSignal",
  BotSignal = "Channel.BotSignal",
  BotWorker = "Channel.BotWorker",
  AccountSignal = "Channel.AccountSignal",
}

export enum RedisNotificationEvent {
  OrderbookUpdated = "Event.OrderbookUpdated",
  PriceUpdated = "Event.PriceUpdated",
  MarketUpdated = "Event.MarketUpdated",
  MarketExpired = "Event.MarketExpired",
  BotSignalTriggered = "Event.SignalTriggered",

  BotSignalConfigCreated = "Event.BotSignalConfigCreated",
  BotSignalConfigUpdated = "Event.BotSignalConfigUpdated",
  BotSignalConfigDeleted = "Event.BotSignalConfigDeleted",

  BotWorkerCreated = "Event.BotWorkerCreated",
  BotWorkerUpdated = "Event.BotWorkerUpdated",
  BotWorkerDeleted = "Event.BotWorkerDeleted",

  OrderUpdated = "Event.OrderUpdated",
}

export enum OrderStatus {
  Pending = "pending",
  Executing = "executing",
  Executed = "executed",
  Canceled = "canceled",
  Error = "error",
}

export enum TelegramUserAction {
  Start = "start",
  CreateWallet = "create_wallet",
  DeleteWallet = "delete_wallet",
  CreateBotSigqnals = "create_bot_signal",
  UpdateBotSignal = "update_bot_signal",
  DeleteBotSignal = "delete_bot_signal",
  Cancel = "cancel",
}

export enum TelegramActionStep {
  Pending = "pending",
  Executed = "executed",
  InputWalletName = "input_wallet_name",
  InputWalletPrivateKey = "input_private_key",
  InputWalletIdToDelete = "input_wallet_id_to_delete",
  InputBotSignalName = "input_bot_signal_name",
  InputBotSignalIndicator = "input_bot_signal_indicator",
  InputBotSignalConfig = "input_bot_signal_config",

  InputBotSignalIdToUpdate = "input_bot_signal_id_to_update",
  InputUpdateBotSignalConfig = "input_update_bot_signal_config",

  InputBotSignalIdToDelete = "input_bot_signal_id_to_delete",

  InputWalletIdToCreateExchangeApi = "input_wallet_id_to_create_exchange_api",
  InputWalletExchangeApiIdToDelete = "input_wallet_exchange_api_id_to_delete",

  InputWorkerSignalIds = "input_worker_signal_ids",
  InputWorkerWalletApiId = "input_worker_wallet_api_id",
  InputWorkerConfig = "input_worker_config",

  InputWorkerIdToUpdate = "input_worker_id_to_update",
  InputWorkerFieldToUpdate = "input_worker_field_to_update",
  InputWorkerIdsToDelete = "input_worker_id_to_delete",
}

export enum OrderPriceType {
  Market = "market",
  Limit = "limit",
}

export enum PhaseAction {
  OrderUpdated = "order_updated",
  ExitPosition = "exit_position",
}

export enum WorkerAction {
  BotSignalTriggered = "bot_signal_triggered",
}

export enum WorkerAction {
  PhaseClosed = "phase_closed",
}

export enum BotPhaseLogTitle {
  PhaseStarted = "phase_started",

  DipArbitragePlaceLeg1Order = "dip_arbitrage_place_leg_1_order",
  DipArbitragePlaceLeg2Order = "dip_arbitrage_place_leg_2_order",
  DipArbitrageRetrySellLeg1Order = "dip_arbitrage_retry_sell_leg_1_order",
  DipArbitragePlaceLeg2OrderFailed = "dip_arbitrage_place_leg_2_order_failed",

  DipArbitrageLeg1OrderFilled = "dip_arbitrage_leg_1_order_filled",
  DipArbitrageLeg2OrderFilled = "dip_arbitrage_leg_2_order_filled",

  DipArbitragePlaceExitPositionOrder = "dip_arbitrage_place_exit_position_order",
  DipArbitrageExitPositionOrderPlaced = "dip_arbitrage_exit_position_order_placed",
  DipArbitrageExitPositionOrderFailed = "dip_arbitrage_exit_position_order_failed",

  DipArbitrageLeg2Timeout = "dip_arbitrage_leg_2_timeout",

  DipArbitrageTriggerExitLeg1Order = "dip_arbitrage_trigger_exit_leg1_order",

  OrderUpdated = "order_updated",

  PhaseClosed = "phase_closed",
}

export enum BotPhaseCloseReason {
  DipArbitrageLeg1OrderError = "dip_arbitrage_leg_1_order_error",
  DipArbitrageLeg2OrderError = "dip_arbitrage_leg_2_order_error",
  DipArbitrageLeg2OrderPriceError = "dip_arbitrage_leg_2_order_price_error",
  DipArbitrageExitPosition = "dip_arbitrage_exit_position",
  DipArbitrageExitPostionSoldLeg1 = "dip_arbitrage_exit_position_sold_leg_1",
  DipArbitrageExitPositionOrderError = "dip_arbitrage_exit_position_order_error",
  DipArbitrageMarketEnded = "dip_arbitrage_market_ended",
  DipArbitrageNoRemainingQuantity = "dip_arbitrage_no_remaining_quantity",

  Normal = "normal",
}

export enum BullMQJob {
  MarketRedeem = "market_redeem",
}

export type ExchangeCredential = {
  key: string;
  secret: string;
  passphrase?: string;
};

export type ExchangeOrderbookItem = {
  price: string;
  size: string;
};

export type ExchangeOrderbook = {
  tokenId: string;
  bids: ExchangeOrderbookItem[];
  asks: ExchangeOrderbookItem[];
  timestamp: number;
  tickSize: string;
  minOrderSize: string;
  hash: string;
  conditionId: string;
  tokenSide?: TokenSide;
  exchange: Exchange;
  symbol?: string;
  interval?: string;
};

export type ExchangePrice = {
  exchange: Exchange;
  tokenId: string;
  conditionId: string;
  price: string;
  timestamp: number;
};

export type SignalDipArbitrageIndicatorConfig = {
  exchange: Exchange;
  symbol: string;
  interval: string;
  dipThreshold: string;
  sumTarget: string;
  slidingWindowMs: number;
  roundStartOffset: number;
  roundEndOffset: number;
  leg2Timeout: number;
  enableSignalPriceRange?: boolean;
  signalPriceRangeFrom?: string;
  signalPriceRangeTo?: string;
  spreadMultiplier?: string;
  tradeAmount?: string;
};

export type SignalDipArbitrageVWAPIndicatorConfig = {
  exchange: Exchange;
  symbol: string;
  interval: string;
  dipThreshold: string;
  takeProfitPriceOffset: string;
  slidingWindowMs: number;
  roundStartOffset: number;
  roundEndOffset: number;
  spreadMultiplier: string;
  tradeAmount: string;
  enableSignalPriceRange?: boolean;
  signalPriceRangeFrom?: string;
  signalPriceRangeTo?: string;
  enableImbalanceFilter?: boolean;
  imbalanceThreshold?: string;
  imbalanceDepth?: number;
  enableExitTimeout?: boolean;
  exitTimeout?: number;
  stopLossPriceOffset?: string;
};

export type SignalDipReverseIndicatorConfig = {
  exchange: Exchange;
  symbol: string;
  interval: string;
};

export type SignalWinningSideIndicatorConfig = {
  exchange: Exchange;
  symbol: string;
  interval: string;
  tradingTimeOffset: number;
  minimumPrice: string;
  maximumPrice: string;
  onlyBuying?: boolean;
  enablePriceComparison?: boolean;
};

export type ExchangeMarketDetail = {
  conditionId: string;
  exchange: Exchange;
  symbol: string;
  interval: string;
  upToken: string;
  downToken: string;
  roundStartTime: number;
  roundEndTime: number;
};

export type ExchangeMarketExpired = {
  conditionId: string;
  exchange: Exchange;
  upTokenId: string;
  downTokenId: string;
};

export type OrderbookPoint = {
  timestamp: number;
  bestAsk?: string;
  bestBid?: string;
};

export type VWAPPoint = {
  timestamp?: number;
  bestAsk?: string;
  bestBid?: string;
};

export type SignalDipArbitrageDetail = {
  signalId: number;
  indicator: SignalIndicator;
  signalDetail: {
    leg1Side: TokenSide;
    leg2Side: TokenSide;
    sumTarget: string;
    leg2Timeout: number;
  };
  marketSignal: {
    comparedOrderbook: OrderbookPoint;
    currentOrderbook: OrderbookPoint;
    tokenId: string;
    tokenSide: TokenSide;
    tickSize: string;
  };
  marketDetail: ExchangeMarketDetail;
};

export type SignalDipArbitrageVWAPDetail = {
  signalId: number;
  indicator: SignalIndicator;
  signalDetail: {
    leg1Side: TokenSide;
    leg1EntryPrice: string;
    tradeAmount: string;
    exitTimeout: number;
    takeProfitPriceOffset: string;
    stopLossPriceOffset: string;
    enableExitTimeout: boolean;
  };
  marketSignal: {
    comparedVWAP: VWAPPoint;
    currentVWAP: VWAPPoint;
    tokenId: string;
    tokenSide: TokenSide;
    tickSize: string;
  };
  marketDetail: ExchangeMarketDetail;
};

export type SignalDipReverseDetail = {
  signalId: number;
  indicator: SignalIndicator;
  marketDetail: ExchangeMarketDetail;
};

export type SignalWinningSideDetail = {
  signalId: number;
  indicator: SignalIndicator;
  signalDetail: {
    entrySide: TokenSide;
    entryPrice: string;
    onlyBuying?: boolean;
  };
  marketSignal: {
    currentOrderbook: { timestamp: number; bestAsk: string };
    tokenId: string;
    tokenSide: TokenSide;
    tickSize: string;
    avgPreviousPrice?: string;
  };
  marketDetail: ExchangeMarketDetail;
};

export type ExchangeSignalConfig = {
  symbol: string;
  interval: string;
  exchange?: Exchange;
};

export type PlaceOrderParams = {
  tokenId: string;
  side: OrderSide;
  amount?: string;
  size?: string;
  price?: string;
  tickSize?: string;

  isFullResponse?: boolean;
};

export type ExchangeOrderDetail = {
  exchangeOrderId?: string;
  status: OrderStatus;

  walletExchangeApiId?: number;
  conditionId?: string;
  tokenId?: string;
  side?: OrderSide;
  tokenSide?: TokenSide;
  price?: string;
  quantity?: string;
  executedPrice?: string;
  executedQuantity?: string;
  receivedQuantity?: string;
  txid?: string;
  updatedAt?: number;
  createdAt?: number;
};

export type RedeemParams = {
  conditionId: string;
  upTokenId: string;
  downTokenId: string;
  redeemTokenSide?: TokenSide;
};

export type BotWorkerState = {
  enableRealTrading?: boolean;
  countingDynamicPhases?: number;
};

export type BotWorkerConfig = {
  maximumOpenPhases?: number;
  quantity?: string;
  isSimulation?: boolean;
};
