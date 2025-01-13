import { ProStatus } from "state/type"
import { convertDateTime } from "./time";

export const getProjectStatus = (p:any, address?: any) => {
    if (p.status !== ProStatus.COMPLETED) {
        const currentTime = Date.now();
        const pledgeStartDateTimeStamp = new Date(p.pledgeStartDate).getTime();
        const pledgeEndDateTimeStamp = new Date(p.pledgeEndDate).getTime();
        const contributionStartDateTimeStamp = new Date(p.contributionStartDate).getTime();
        const contributionEndDateTimeStamp = new Date(p.contributionEndDate).getTime();

        if (currentTime < pledgeStartDateTimeStamp) {
            return ProStatus.UPCOMING;
        }
        const participants = p.allocation?.participants?.map((p: { eoa: string }) => p.eoa) ||[];
        const participated = address && participants.includes(address)
        if (currentTime < pledgeEndDateTimeStamp) {
            if (participated) {
                return ProStatus.PARTICIPATED
            }      
            return ProStatus.PLEDGING;
        }
        if (currentTime < contributionStartDateTimeStamp) {
            return ProStatus.LOTTERY;
        }
        if (currentTime < contributionEndDateTimeStamp) {
            const contributions = p.contributions?.map((c: { eoa: string }) => c.eoa) ||[];
            if (address && contributions.includes(address)) {
                return ProStatus.CONTRIBUTED;
            }
            const winners = p.allocation?.winners?.map((c: { eoa: string }) => c.eoa) ||[];
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
}
  
export const getProjectUI = (p:any, status: ProStatus, uid?: string) => {
    if (status === ProStatus.TBA) {
        return {
            header: {
                title: 'Coming Soon',
            },
            whitelist: {
                desc1: 'TBA',
                disable: true
            },
            lottery: {
                disable: true
            },
            contribution: {
                disable: true
            },
            completed: {
                disable: true
            },
            claim: {
                disable: true
            }
        }
    } else if (status === ProStatus.UPCOMING) {
        return {
            header: {
                title: 'Coming Soon',
            },
            whitelist: {
                desc1: `Application period:`,
                desc2: `${p.pledgeStartDate} – ${p.pledgeEndDate}`
            },
            lottery: {
                desc1: `Winners will be announced on ${p.pledgeEndDate}`,
                disable: true
            },
            contribution: {
                desc1: `Expires on ${p.contributionEndDate}`,
                disable: true
            },
            completed: {
                disable: true
            },
            claim: {
                disable: true
            }
        }
    } else if (status === ProStatus.PLEDGING) {
        return {
            header: {
                title: 'Whitelist Is Open',
                subTitle: 'Participation time remaining',
                hasTimer: true
            },
            whitelist: {
                desc1: `Application period:`,
                desc2: `${p.pledgeStartDate} – ${p.pledgeEndDate}`,
                hasBtn: true
            },
            lottery: {
                desc1: `Winners will be announced on ${p.pledgeEndDate}`,
                disable: true
            },
            contribution: {
                desc1: `Expires on ${p.contributionEndDate}`,
                disable: true
            },
            completed: {
                disable: true
            },
            claim: {
                disable: true
            }
        }
    }else if (status === ProStatus.PARTICIPATED) {
        return {
            header: {
                title: 'Good Luck!',
                subTitle: `You will receive the results of the lottery to your email on ${p.pledgeEndOnlyDate}.`
            },
            whitelist: {
                desc1: `You have been successfully whitelisted`
            },
            lottery: {
                desc1: `Winners will be announced on ${p.pledgeEndDate}`,
            },
            contribution: {
                desc1: `Expires on ${p.contributionEndDate}`,
                disable: true
            },
            completed: {
                disable: true
            },
            claim: {
                disable: true
            }
        }
    } else if (status === ProStatus.WIN) {
        return {
            header: {
                title: 'Contributions Are Open',
                subTitle: `Time remaining to send funds`,
                hasTimer: true
            },
            whitelist: {
                desc1: `You have been successfully whitelisted`
            },
            lottery: {
                desc1: `Congratulations, your entry was randomly selected to participate in this launch!`,
            },
            contribution: {
                desc1: `Contribution period:`,
                desc2: `${p.contributionStartDate} – ${p.contributionEndDate}`,
                hasBtn: true
            },
            completed: {
                disable: true
            },
            claim: {
                disable: true
            }
        }
    } else if (status === ProStatus.NOTWIN) {
        return {
            header: {
                title: `You didn't win`,
                subTitle: 'Better luck next time!'
            },
            whitelist: {
                desc1: `You have been successfully whitelisted`
            },
            lottery: {
                desc1: `You didn't win. Better luck next time!`,
            },
        }
    } else if (status === ProStatus.CONTRIBUTING) {
        return {
            header: {
                title: 'Launch Timeline',
            },
            whitelist: {
                desc1: `Application period:`,
                desc2: `${p.pledgeStartDate} – ${p.pledgeEndDate}`
            },
            lottery: {
                desc1: `Winners have been announced on ${p.pledgeEndDate}`,
            },
            contribution: {
                desc1: `Contribution period:`,
                desc2: `${p.contributionStartDate} – ${p.contributionEndDate}`,
            },
            completed: {
                disable: true
            },
            claim: {
                disable: true
            }
        }
    } else if (status === ProStatus.CONTRIBUTED) {
        const contribution = p.contributions.find((c: any) => c.eoa === uid)
        let contributeDate = ''
        if (contribution) {
            contributeDate = convertDateTime(parseInt(contribution.txTimestamp) * 1000);
        }
        return {
            header: {
                title: 'Success!',
                subTitle: 'Congratulations! Check your email for next steps and be sure to confirm your PIN for security.'
            },
            whitelist: {
                desc1: `You have been successfully whitelisted`
            },
            lottery: {
                desc1: `Congratulations, your entry was randomly selected to participate in this launch!`,
            },
            contribution: {
                desc1: `Contributed on ${contributeDate}`
            },
            completed: {},
            claim: { disable: true }
        }
    } else {
        return {
            header: {
                title: 'Launch Timeline',
            },
            whitelist: {
                desc1: `Application period:`,
                desc2: `${p.pledgeStartDate} – ${p.pledgeEndDate}`
            },
            lottery: {
                desc1: `Winners have been announced on ${p.pledgeEndDate}`,
            },
            contribution: {
                desc1: `Contribution period:`,
                desc2: `${p.contributionStartDate} – ${p.contributionEndDate}`,
            },
            completed: {
            },
            claim: {
            }
        }
    }
    
}
