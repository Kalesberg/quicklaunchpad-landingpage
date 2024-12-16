import { getAddress } from "@ethersproject/address";

export function isAddress(value: string | null | undefined): string | false {
  try {
    return getAddress(value || "");
  } catch {
    return false;
  }
}

// shorten the checksummed version of the input address to have 0x + 4 characters at start and end
export function shortenAddress(address: string, chars = 4): string {
  const parsed = isAddress(address);
  if (!parsed) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }
  return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`;
}

export function isValidEmail(email: string): boolean {
  return email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g) ? true : false;
}

export const convertDateTime = (dateTimeString: string) => {
  if (!dateTimeString) return '';

  const formattedDate = new Date(dateTimeString);
  // Format for date: 02 Dec 2024
  const date = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(formattedDate);

  // Format for time: 6:00 AM
  const time = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(formattedDate);

  return date + ' ' + time;
}
