
const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}`;
const API_KEY = "sk_aef3c11fe1e6ba045ee72b46904ac5cae1ccb2aab5c7b5c88d9beff818592d5f";

export const fetchWithHeader = async (endpoint, options = {}) => {
    const { headers: optionHeaders, ...otherOptions } = options;

    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'x-api-key': API_KEY,
        ...optionHeaders,
    };

    try {
        // We loggen de volledige URL even naar de console om te debuggen
        console.log(`Fetching van: ${BASE_URL}${endpoint}`);

        const response = await fetch(`${BASE_URL}${endpoint}`, {
            ...otherOptions,
            headers,
            mode: 'cors',
        });

        if (!response.ok) {
            console.error(`Server antwoordde met status: ${response.status}`);
        }

        return response;
    } catch (error) {
        // Als je hier "Failed to fetch" blijft zien, is de URL offline of blokkeert CORS je
        console.error("Netwerkfout details:", error);
        throw error;
    }
};
