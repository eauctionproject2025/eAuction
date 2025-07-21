'use client';
import Image from 'next/image';
import Link from 'next/link';
export default function SummaryCard({ link, label, value='0', icon, color = 'gray-700' }) {
  // if (!value) {
  //   console.error("Missing required props: label, value, or icon");
  //   return null;
  // }
  return (
    <Link href={link}>
      <div
      className={`flex items-center justify-between p-4 rounded-lg shadow-sm bg-${color}`}
    >
      <div>
        <div className="text-sm font-medium">{label}</div>
        <div className="text-xl font-bold">{value}</div>
      </div>
      <div className="text-3xl opacity-60">
        <Image src={icon} alt={label} width={24} height={24} className="w-9 h-9 " />
      </div>
    </div>
    </Link>
  );
}
