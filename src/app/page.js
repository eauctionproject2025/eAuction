"use client"
import Auction from "@/components/auction";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Greet from '@/components/Greet';
import Skeleton from "@/components/homeSkeleton";
import CarouselSlide from "@/components/CarouselSlide";
import offer4 from "@/public/item/offer4.jpg";
import offer5 from "@/public/item/offer5.jpeg";
import CategoryCard from "@/components/categoryCard";

const slides = [
  {
    title: 'Wholesale',
    subtitle: 'Auctions',
    description: 'Fleet, Finance & Copart Select Products',
    buttonText: 'View Inventory',
    buttonLink: '/allOffers',
    image: offer4, 
  },
  {
    title: 'Exclusive Deals',
    subtitle: 'On All Brands',
    description: 'Drive your dream today with 0% financing.',
    buttonText: 'Browse Now',
    buttonLink: '/allOffers',
    image: offer5,
  },
];
export default function Home() {
  
  const [auctions, setAuctions] = useState([]);
  const [greet, setGreet] = useState(false);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  const { data: session } = useSession();

  useEffect(() => {
    if (session && !sessionStorage.getItem("greeted")) {
      setGreet(true);
      sessionStorage.setItem("greeted", "true");
    }
  }, [session]);
  


  const handleDelete = (deletedId) => {
    setAuctions((prevAuctions) => prevAuctions.filter((auction) => auction._id !== deletedId));
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch both in parallel instead of sequential
        const [auctionsResponse, categoriesResponse] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/auctions?limit=12`), // Limit results
          fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/categories?limit=5`) // Limit categories
        ]);

        // Check if responses are ok
        if (!auctionsResponse.ok || !categoriesResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const [auctionsData, categoriesData] = await Promise.all([
          auctionsResponse.json(),
          categoriesResponse.json()
        ]);

        setAuctions(auctionsData);
        setCategories(categoriesData.slice(0, 5)); // Fallback slice if backend doesn't support limit
        
      } catch (error) {
        console.error("Error fetching data:", error);
        // Set empty arrays on error so UI still renders
        setAuctions([]);
        setCategories([]);
      } finally {
        // Always set loading to false
        setLoading(false);
      }
    };

    fetchData();
  }, []); 

  return (
    <div className="w-full flex flex-col items-center justify-center">
      {greet && (
        <Greet message= {`Welcome back ${session?.user.name} !`}/>
      )}
        {loading ? (
          <Skeleton />
        ) : (
        <div className="w-full flex flex-col items-center justify-center ">
          <div className="w-[90%] relative my-5">
              {/* <Image src={offer1} alt="banner" width={1000} height={300} className="object-cover" /> */}
              <CarouselSlide slides={slides} />
          </div>
          <div className="w-[90%] flex flex-col items-center justify-between mb-5">
            <h2 className="text-lg font-bold self-start mb-2">Category</h2> <hr className="w-full border-black/30"/>
            <div className=" flex flex-wrap justify-center gap-5 md:gap-6 p-4">
                {categories.map((category) => (
                    <CategoryCard key={category._id} category={category} />
                ))}
              <button className="outline outline-yellow-500 text-sm md:text-md text-yellow-500 px-2 w-[90px] h-[40px] md:w-[150px] md:h-[60px] font-semibold rounded hover:bg-yellow-500 hover:text-black shadow-md shadow-gray-500 hover:shadow-yellow-600 transition duration-500" onClick={() => window.location.href = "/category"}>
                View All Categories
              </button>
            </div>
            <h2 className="w-full text-lg font-bold mb-2 self-start">Auctions</h2>
            <hr className="w-full border-black/30" />
          </div>
          <div className="w-[90%] flex flex-wrap justify-center gap-4 md:gap-7 p-4 items-center">
            {auctions.map((auction) => (
            <Auction
              key={auction._id}
              id={auction._id}
              title={auction.title}
              price={auction.startingBid}
              href="#"
              startTime={auction.startTime}
              endTime={auction.endTime}
              imgLink={auction.imageUrls|| auction.imageUrl}
              categories={auction.categories}
              seller={auction.seller._id} 
              onDelete={handleDelete}
              publicUrl={auction.cloudUrls|| auction.cloudUrl}
            />
            ))}
          </div>
        </div>
        )}
    </div>
  );
}
