import { useEffect, useState } from 'react';
import { db } from '../firebase/firebase';

const useAlbum = (albumId) => {
	const [album, setAlbum] = useState();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true)
		const unSigned = db.collection('albums').doc(albumId).onSnapshot(doc => {
			setAlbum({
				id: doc.id,
				...doc.data()
			})
		})
		setLoading(false)
		return unSigned
	}, [albumId])
	return { album, loading };
}

export default useAlbum;
