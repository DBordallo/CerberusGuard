export default async function isUserAdmin() {
    try {
        const cookieString = document.cookie;

        const token = cookieString
            .split('; ')
            .map(cookie => {
                const trimmedCookie = cookie.trim();
                if (trimmedCookie.startsWith('_ga=')) {
                    return '';
                } else if (trimmedCookie.startsWith('token=')) {
                    return trimmedCookie.substring('token='.length);
                }
                return trimmedCookie;
            })
            .filter(Boolean)  // Eliminar cookies vacías
            .join('; ');

        const response = await fetch('http://localhost:6700/cerberus/users/role', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`,
            },
            body: JSON.stringify({ token: token }),
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            return data;  // Devuelve directamente los datos obtenidos del servidor
        } else {
            throw new Error(`Failed to fetch user data: ${response.status}`);
        }
    } catch (error) {
        console.error("Error in isUserAdmin:", error);
        return false;
    }
}
