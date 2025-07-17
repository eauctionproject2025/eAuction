import { Suspense } from 'react'
import SearchResults from './searchComponent'

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="h-[60vh] my-15">Loading search results...</div>}>
      <SearchResults />
    </Suspense>
  );
}
