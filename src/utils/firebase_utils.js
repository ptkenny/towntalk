import { getAuth } from '@firebase/auth';
import { getFirestore, collection, doc, getDoc, addDoc, serverTimestamp } from '@firebase/firestore';

function getLoggedInUser() {
	return getAuth().currentUser;
}

async function getUserZipCode() {
	const userDoc = doc(getFirestore(), 'users', getLoggedInUser().uid);
	return (await getDoc(userDoc)).data().zipCode;
}

async function uploadPost(title, post) {
	let user = getLoggedInUser();
	if (!user) return;
	let zipCode = await getUserZipCode();
	addDoc(collection(getFirestore(), zipCode), {
		title: title,
		content: post,
		author: user.uid,
		authorUsername: user.displayName,
		timestamp: serverTimestamp(),
	}).catch((error) => console.log(error));
}

let firebaseUtils = {
	getLoggedInUser: getLoggedInUser,
	getUserZipCode: getUserZipCode,
	uploadPost: uploadPost,
};

export default firebaseUtils;
