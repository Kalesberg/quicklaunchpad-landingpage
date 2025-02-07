import { KycStatus, ProStatus } from "state/type";
import { convertDateTime } from "./time";

export const getProjectStatus = (p: any, address?: any) => {
  if (p.status !== ProStatus.COMPLETED) {
    const currentTime = Date.now();
    const pledgeStartDateTimeStamp = new Date(p.pledgeStartDate).getTime();
    const pledgeEndDateTimeStamp = new Date(p.pledgeEndDate).getTime();
    const contributionStartDateTimeStamp = new Date(
      p.contributionStartDate,
    ).getTime();
    const contributionEndDateTimeStamp = new Date(
      p.contributionEndDate,
    ).getTime();

    if (currentTime < pledgeStartDateTimeStamp) {
      return ProStatus.UPCOMING;
    }
    const participants =
      p.allocation?.participants?.map((p: { eoa: string }) => p.eoa) || [];
    const participated = address && participants.includes(address);
    if (currentTime < pledgeEndDateTimeStamp) {
      if (participated) {
        return ProStatus.PARTICIPATED;
      }
      return ProStatus.PLEDGING;
    }
    if (currentTime < contributionStartDateTimeStamp) {
      return ProStatus.LOTTERY;
    }
    if (currentTime < contributionEndDateTimeStamp) {
      const contributions =
        p.contributions?.map((c: { eoa: string }) => c.eoa) || [];
      if (address && contributions.includes(address)) {
        return ProStatus.CONTRIBUTED;
      }
      const winners =
        p.allocation?.winners?.map((c: { eoa: string }) => c.eoa) || [];
      if (address && participated) {
        if (winners.includes(address)) {
          return ProStatus.WIN;
        } else {
          return ProStatus.NOTWIN;
        }
      }
      return ProStatus.CONTRIBUTING;
    }
  }
  return ProStatus.COMPLETED;
};

export const getProjectUI = (p: any, status: ProStatus, uid?: string) => {
  if (status === ProStatus.TBA) {
    return {
      header: comingSoon,
      whitelist: {
        desc1: "TBA",
        disable: true,
      },
      lottery: disabled,
      contribution: disabled,
      completed: disabled,
      claim: disabled,
    };
  } else if (status === ProStatus.UPCOMING) {
    return {
      header: comingSoon,
      whitelist: defaultWhiltelist(p),
      lottery: defaultLottery(p, true),
      contribution: {
        desc1: `Expires on ${p.contributionEndDate}`,
        disable: true,
      },
      completed: disabled,
      claim: disabled,
    };
  } else if (status === ProStatus.PLEDGING) {
    return {
      header: {
        title: "Whitelist Is Open",
        subTitle: "Participation time remaining",
        hasTimer: true,
      },
      whitelist: defaultWhiltelist(p, true),
      lottery: defaultLottery(p, true),
      contribution: defaultContribution(p, true),
      completed: disabled,
      claim: disabled,
      expandTab: {},
    };
  } else if (status === ProStatus.PARTICIPATED) {
    return {
      header: {
        title: "Good Luck!",
        subTitle: `You will receive the results of the lottery to your email on ${p.pledgeEndOnlyDate}.`,
      },
      whitelist: {
        desc1: `You have been successfully whitelisted`,
      },
      lottery: defaultLottery(p),
      contribution: defaultContribution(p, true),
      completed: disabled,
      claim: disabled,
    };
  } else if (status === ProStatus.WIN) {
    return {
      header: {
        title: "Contributions Are Open",
        subTitle: `Time remaining to send funds`,
        hasTimer: true,
      },
      whitelist: {
        desc1: `You have been successfully whitelisted`,
      },
      lottery: {
        desc1: `Congratulations, your entry was randomly selected to participate in this launch!`,
      },
      contribution: {
        desc1: `Contribution period:`,
        desc2: `${p.contributionStartDate} – ${p.contributionEndDate}`,
        hasBtn: true,
      },
      completed: disabled,
      claim: disabled,
      expandTab: true,
    };
  } else if (status === ProStatus.NOTWIN) {
    return {
      header: {
        title: `You didn't win`,
        subTitle: "Better luck next time!",
      },
      whitelist: {
        desc1: `You have been successfully whitelisted`,
      },
      lottery: {
        desc1: `You didn't win. Better luck next time!`,
      },
    };
  } else if (status === ProStatus.CONTRIBUTING) {
    return {
      header: {
        title: "Launch Timeline",
        subTitle: "You are not participating in this launch.",
      },
      whitelist: defaultWhiltelist(p),
      lottery: {
        desc1: `Winners have been announced on ${p.pledgeEndDate}`,
      },
      contribution: {
        desc1: `Contribution period:`,
        desc2: `${p.contributionStartDate} – ${p.contributionEndDate}`,
      },
      completed: disabled,
      claim: disabled,
      expandTab: true,
    };
  } else if (status === ProStatus.CONTRIBUTED) {
    const contribution = p.contributions.find((c: any) => c.eoa === uid);
    let contributeDate = "";
    if (contribution) {
      contributeDate = convertDateTime(
        parseInt(contribution.txTimestamp) * 1000,
      );
    }
    return {
      header: {
        title: "Success!",
        subTitle:
          "Congratulations! Check your email for next steps and be sure to confirm your PIN for security.",
      },
      whitelist: {
        desc1: `You have been successfully whitelisted`,
      },
      lottery: {
        desc1: `Congratulations, your entry was randomly selected to participate in this launch!`,
      },
      contribution: {
        desc1: `Contributed on ${contributeDate}`,
      },
      completed: {},
      claim: disabled,
      expandTab: true,
    };
  } else {
    return {
      header: {
        title: "Launch Timeline",
      },
      whitelist: defaultWhiltelist(p),
      lottery: {
        desc1: `Winners have been announced on ${p.pledgeEndDate}`,
      },
      contribution: {
        desc1: `Contribution period:`,
        desc2: `${p.contributionStartDate} – ${p.contributionEndDate}`,
      },
      completed: {},
      claim: {},
    };
  }
};

export enum ContributionTabButton {
  CompleteKyc = "Complete KYC",
  CheckKyc = "Check your KYC status",
  Participate = "Participate now",
  Contribution = "Contribute now",
}

export const getTabsUI = (p: any, status: ProStatus, kycStatus: KycStatus) => {
  if (
    [
      ProStatus.COMPLETED,
      ProStatus.TBA,
      ProStatus.UPCOMING,
      ProStatus.NOTWIN,
      ProStatus.CONTRIBUTING,
    ].includes(status)
  ) {
    return;
  }
  if ([KycStatus.NOT_STARTED, KycStatus.EXPIRED].includes(kycStatus)) {
    return ContributionNeedKyc(ContributionTabButton.CompleteKyc);
  }
  if (
    [
      KycStatus.PENDING,
      KycStatus.REJECTED,
      KycStatus.IN_REVIEW,
      KycStatus.BLOCKED,
    ].includes(kycStatus)
  ) {
    return ContributionNeedKyc(ContributionTabButton.CheckKyc);
  }
  if (status === ProStatus.PLEDGING) {
    return {
      contribution: {
        title: "Contributions Have Not Started For This Launch",
        subTitle: `Contribution is not available as the lottery winners haven't been announced yet. If you would like to participate, you must submit application.`,
        btn: ContributionTabButton.Participate,
      },
      claim: {
        title: `Claim Isn't Available At The Moment`,
        subTitle: `Tokens are not claimable yet. If you would like to participate, you must submit application.`,
        btn: ContributionTabButton.Participate,
      },
    };
  } else if (status === ProStatus.PARTICIPATED) {
    return {
      contribution: {
        title: "Contributions Have Not Started For This Launch",
        subTitle: `Contributions will be available to those who win the lottery.`,
      },
      claim: {
        title: `Claim Isn't Available At The Moment`,
        subTitle: `Tokens are not claimable yet.`,
      },
    };
  } else if (status === ProStatus.WIN) {
    return {
      contribution: {
        title: "Applications Are Now Open",
        subTitle: `Contribution expires on ${p.contributionEndDate}`,
        btn: ContributionTabButton.Contribution,
      },
      claim: {
        title: `Claim Isn't Available At The Moment`,
        subTitle: `Tokens are not claimable yet. If you would like to participate, you must contribute.`,
        btn: ContributionTabButton.Contribution,
      },
    };
  } else if (status === ProStatus.CONTRIBUTED) {
    return {
      contribution: { contributed: true },
      claim: {
        title: `Claim Isn't Available At The Moment`,
        subTitle: `Tokens are not claimable yet.`,
      },
    };
  } else {
    return null;
  }
};

const ContributionNeedKyc = (btn: ContributionTabButton) => {
  return {
    contribution: {
      title: "Contributions Have Not Started For This Launch",
      subTitle:
        "Contributions will be available to those who win the lottery. If you would like to participate, you must complete KYC.",
      btn,
    },
    claim: {
      title: `Claim Isn't Available At The Moment`,
      subTitle: `Tokens are not claimable yet. If you would like to participate, you must complete KYC.`,
      btn,
    },
  };
};

const defaultWhiltelist = (p: any, hasBtn = false) => {
  return {
    desc1: `Application period:`,
    desc2: `${p.pledgeStartDate} – ${p.pledgeEndDate}`,
    hasBtn,
  };
};

const defaultLottery = (p: any, disable = false) => {
  return {
    desc1: `Winners have been announced on ${p.pledgeEndDate}`,
    disable,
  };
};

const defaultContribution = (p: any, disable = false) => {
  return { desc1: `Expires on ${p.contributionEndDate}`, disable: true };
};

const disabled = { disable: true };
const comingSoon = { title: "Coming Soon" };
