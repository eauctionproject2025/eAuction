async function getAuctions() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/auctions`);
    return response.json();
}

async function getActiveAuctions() {
    const auctions = await getAuctions()
    const now = new Date();
    return auctions.filter(auction => {
        if (!auction.startTime || !auction.endTime) return false;
        const start = new Date(auction.startTime);
        const end = new Date(auction.endTime);
        return start <= now && now <= end;
    });
}

async function getEndedAuctions() {
    const auctions = await getAuctions();
    const now = new Date();
    return auctions.filter(auction => {
        if (!auction.startTime || !auction.endTime) return false;
        const end = new Date(auction.endTime);
        return now > end;
    });
}

async function getPendingAuctions() {
    const auctions = await getAuctions();
    const now = new Date();
    return auctions.filter(auction => {
        if (!auction.startTime) return false;
        const start = new Date(auction.startTime);
        return now < start;
    });
}

export { getAuctions, getActiveAuctions, getEndedAuctions, getPendingAuctions };
