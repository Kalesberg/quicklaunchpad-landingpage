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
    return "";
  }
  return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`;
}

export function isValidEmail(email: string): boolean {
  return email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g) ? true : false;
}
