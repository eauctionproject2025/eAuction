const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
async function getUsers() {
    const response = await fetch(`${BASE_URL}api/users`);
    if (!response.ok) {throw new Error('Failed to fetch users');}
    return await response.json();
}
async function getUserByType(){
    
}

async function getSellers() {
    const response = await getUsers();
    return response.filter(user => user.role === 'seller');
}

async function getBuyers() {
    const response = await getUsers();
    return response.filter(user => user.role === 'buyer');
}

async function getBlockedUsers() {
    const response = await getUsers();
    return response.filter(user => user.blocked);
}

export { getUsers, getSellers, getBuyers, getBlockedUsers };