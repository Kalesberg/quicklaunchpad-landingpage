
const ADDRESS_KEY = 'address'
export const setToken = (address: string, token: string) => {
    localStorage.setItem(address, token);
};

export const setAddress = (address: string) => {
    localStorage.setItem(ADDRESS_KEY, address);
};

  
export const getToken = (address?: string) => {
    if (!address) {
        address = localStorage.getItem(ADDRESS_KEY) || '';
    }
    return localStorage.getItem(address);
};

export const removeToken = (address: string) => {
    localStorage.removeItem(ADDRESS_KEY);
    return localStorage.removeItem(address);
};

