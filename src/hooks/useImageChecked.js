import { useEffect, useState } from 'react'
import { db } from '../firebase/firebase'

const useImageChecked = (images, owner, title) => {

	// States
    const [selectedError, setSelectedError] = useState(false)
    const [selectedSuccess, setSelectedSuccess] = useState(false)

	// Effects
    useEffect(() => {
        if (!images) {
			setSelectedError(null);
			setSelectedSuccess(false);

			return;
        }
        
        (async () => {
			const customersReview = `Costumer's review on:  ${title}` 

			try {
				
				await db.collection('albums').add({
					owner,
					title: customersReview,
					images: images,
				})
							
				setSelectedError(false)
				setSelectedSuccess(true)

			} catch (error) {

				setSelectedError(true)
				setSelectedSuccess(false)
			}
		})();		
    }, [images])
    
    return { selectedError, selectedSuccess }
}

export default useImageChecked
