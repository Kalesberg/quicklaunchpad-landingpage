export enum ProjectStatus {
  Live = "live",
  Completed = "completed",
}

export type Project = {
  projectName: string;
  pid: string;
  creationDate: string;
  kycProvider: string;
  depositWallet: string;
  pledgeStartDate: string;
  pledgeEndDate: string;
  contributionStartDate: string;
  contributionEndDate: string;
  totalPoolAmount: number;
  minContributionSize: number;
  maxContributionSize: number;
  maxUserPledgeSize: number;
  numberLotteryWinners: number;
  contentUrl: string;
  launchpadType: string;
  contributionRequirements: string;
  contributionClaimUrl: string;
  initialPrice: string;
  status: ProjectStatus;
  isFeatured: boolean;
  websiteUrl: string;
  blogUrl: string;
  whitepaperUrl: string;
  chainId: string;
  description: string;
  whitelistOpenSoonEmailSent: boolean;
  whitelistOpenEmailSent: boolean;
  twentyFourHoursReminderEmailSent: boolean;
  twelveHoursReminderEmailSent: boolean;
  seventyTwoHourReminderEmailSent: boolean;
  claimEmailSent: boolean;
  coingeckoId?: number;
  fundingTokens: TokenInfo[];
  contributions: Contribution[];
  socials: Social;
  allocation: Allocation;
};

export type Social = {
  _id: string;
  telegram: string;
  twitter: string;
  youtube: string;
  discord: string;
  github: string;
};

export type TokenInfo = {
  chainId: string;
  address: string;
  name: string;
  decimals: number;
};

export type Contribution = {
  eoa: string;
  amount: number;
  formattedAmount: number;
  chainId: string;
  txHash: string;
  txIsConfirmed: string;
  txTimestamp: number;
  token: TokenInfo;
};

export type Allocation = {
  participants: { eoa: string; amount: number; _id: string }[];
  winners: { eoa: string; amount: number; _id: string }[];
  _id: string;
};

export const ChainIdToName: Record<string, string> = { '0x89': 'Polygon'}
