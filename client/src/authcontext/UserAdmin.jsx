export default async function isUserAdmin() {
    try {
        const cookieString = document.cookie;
        const tokenValue = cookieString.split('=')[1];

        const response = 
        await fetch('http://localhost:6700/cerberus/users', {
            method: 'GET',
            headers: {
                'Authorization': `${tokenValue}`
            }
        });
        const data = await response.json();

        await fetch(`http://localhost:6700/cerberus/users/${data.id}`, {
            method: 'GET',
            headers: {
                'Authorization': `${tokenValue}`
            }
        });
        const user = await response.json();

        return user;


    } catch (error) {
        console.error(error);
        return false;
    }
}

isUserAdmin()