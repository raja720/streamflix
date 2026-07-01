const SkeletonCard = () => {
  return (
    <div className='bg-gray-800 rounded-xl overflow-hidden animate-pulse'>
      <div className='w-full h-72 bg-gray-700' />
      <div className='p-3'>
        <div className='h-4 bg-gray-700 rounded mb-2' />
        <div className='h-3 bg-gray-700 rounded w-1/2' />
      </div>
    </div>
  )
}

export default SkeletonCard