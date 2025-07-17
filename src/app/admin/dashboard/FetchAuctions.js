const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
async function getAuctions() {
    const response = await fetch(`${BASE_URL}api/auctions`);
    if (!response.ok) throw new Error("Failed to fetch all auctions");
    return await response.json();
}
 
async function fetchAuctionsByType(type) {
  const response = await fetch(`${BASE_URL}api/auctions?type=${type}`);
  if (!response.ok) throw new Error("Failed to fetch auctions");
  return await response.json();
}

async function getActiveAuctions() {
  return await fetchAuctionsByType("active");
}

async function getEndedAuctions() {
  return await fetchAuctionsByType("ended");
}

async function getPendingAuctions() {
  return await fetchAuctionsByType("pending");
}

async function getSoonEndingAuctions() {
  return await fetchAuctionsByType("soon-ending");
}

async function getRecentAuctions() {
  return await fetchAuctionsByType("recent");
}

export { getAuctions, getActiveAuctions, getEndedAuctions, getPendingAuctions, getSoonEndingAuctions, getRecentAuctions };
