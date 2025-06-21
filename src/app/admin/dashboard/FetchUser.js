async function getUsers() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/users`);
    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }
    return response.json();
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