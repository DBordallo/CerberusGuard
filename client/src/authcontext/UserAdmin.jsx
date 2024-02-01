export default async function isUserAdmin() {
    try {
        const cookieString = document.cookie;
        const tokenValue = cookieString.split('=')[1];

        const response = await fetch('http://localhost:6700/cerberus/users', {
            method: 'GET',
            headers: {
                'Authorization': `${tokenValue}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error(`Failed to fetch user data: ${response.status}`);
        }
    } catch (error) {
        console.error("Error in isUserAdmin:", error);
        return false;
    }
}
