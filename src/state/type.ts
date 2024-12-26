export enum ProjectStatus {
  Live = "live",
  Completed = "completed",
  Upcoming = "upcoming",
  Pledging = "pledging"
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
  reminderLaunchTime?: string;
  reminderLaunchTimeBig?: string;
  reminderDay?: string;
  network?: any;
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

export type User = {
  uid: string;
  isAdmin: boolean;
  email: string;
  isEmailVerified: boolean;
  kycStatus: KycStatus;
  kycEmail: string;
  altWallets: any;
  swapScore: number;
  notifConfig: {
    emailNotifications?: boolean
  }
}

export enum KycStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  IN_REVIEW = 'inreview',
  BLOCKED = 'blocked',
  NOT_STARTED = 'notstarted',
  EXPIRED = 'expired',
}

export const kycStatuses: Record<KycStatus, {msg?: string, btn?: string, icon?: string, iconBg?:string, iconColor?: string, isCheck?: boolean}> = {
  [KycStatus.PENDING]: {
    msg: 'Your KYC information has been successfully submitted. Verification may take up to 24 hours. Please check your profile page for updates.',
    btn: 'Check KYC details',
    icon: 'Pending verification',
    iconBg: '#00B8D929',
    iconColor: '#61F3F3',
    isCheck: true
  },
  [KycStatus.APPROVED]: {
    msg: 'Your KYC information has been approved.',
    btn: 'Check KYC details',
    icon: 'Approved',
    iconBg: '#0FC67929',
    iconColor: '#0FC679',
    isCheck: true
  },
  [KycStatus.REJECTED]: {
    msg: 'Your KYC application has been rejected. Please check your email address for more information from the KYC provider.',
    btn: 'Check KYC details',
    icon: 'Rejected',
    iconBg: '#FF5C5C29',
    iconColor: '#FF5C5C',
    isCheck: true
  },
  [KycStatus.IN_REVIEW]: {
    msg: 'Your KYC information has been successfully submitted. Verification may take up to 24 hours. Please check your profile page for updates.',
    btn: 'Check KYC details',
    icon: 'Pending verification',
    iconBg: '#00B8D929',
    iconColor: '#61F3F3',
    isCheck: true
  },
  [KycStatus.BLOCKED]: {
    msg: 'There is a problem with the KYC details you submitted. Please contact BlockPass for details.',
    btn: 'Check KYC details',
    icon: 'Blocked',
    iconBg: '#FF5C5C29',
    iconColor: '#FF5C5C',
    isCheck: true
  },
  [KycStatus.NOT_STARTED]: {
    msg: 'Register your wallet and upload KYC documents at any time to be eligible for participation in the QuickSwap Launchpad. KYC documents are required to be updated every year.',
    btn: 'Complete KYC',
    icon: 'Required',
    iconBg: '#FF5C5C29',
    iconColor: '#FF5C5C',
  },
  [KycStatus.EXPIRED]: {
    msg: 'Your KYC registration has expired. KYC documents are required to be updated every year.',
    btn: 'Re-Complete KYC',
    icon: 'Expired',
    iconBg: '#FF5C5C29',
    iconColor: '#FF5C5C',
  },
}

export const ChainIdToName: Record<string, string> = { "0x89": "Polygon" };
