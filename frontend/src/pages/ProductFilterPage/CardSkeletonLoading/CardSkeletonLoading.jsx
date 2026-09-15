import React from 'react';
import CardSkeleton from '../../../components/allCards/CardSkeleton/CardSkeleton';

const CardSkeletonLoading = () => {
    return (
        <div className='grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-2 md:gap-5 min-h-[calc(100vh-90vh)]'>
            <CardSkeleton/>
            <CardSkeleton/>
            <CardSkeleton/>
            <CardSkeleton/>
        </div>
    );
};

export default CardSkeletonLoading;