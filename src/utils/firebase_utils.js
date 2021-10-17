import { getAuth } from '@firebase/auth';
import {
	getFirestore,
	collection,
	doc,
	getDoc,
	addDoc,
	serverTimestamp,
	arrayUnion,
	updateDoc,
	Timestamp,
} from '@firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFunctions, httpsCallable } from 'firebase/functions';

function getLoggedInUser() {
	return getAuth().currentUser;
}

async function getUserZipCode() {
	const userDoc = doc(getFirestore(), 'users', getLoggedInUser().uid);
	return (await getDoc(userDoc)).data().zipCode;
}

async function uploadPost(title, post, imageURL) {
	let user = getLoggedInUser();
	if (!user) return;
	let zipCode = await getUserZipCode();
	addDoc(collection(getFirestore(), zipCode), {
		title: title,
		content: post,
		imageURL: imageURL,
		author: user.uid,
		authorUsername: user.displayName,
		likes: [],
		dislikes: [],
		comments: [],
		timestamp: serverTimestamp(),
	}).catch((error) => console.log(error));
}

async function uploadImage(image) {
	const imageRef = ref(getStorage(), `images/${image.name}`);
	const upload = await uploadBytes(imageRef, image);
	return getDownloadURL(upload.ref);
}

async function likePost(postID) {
	const functions = getFunctions();
	const like = httpsCallable(functions, 'likePost');
	like({
		zipCode: await getUserZipCode(),
		postID: postID,
	});
}

async function dislikePost(postID) {
	const functions = getFunctions();
	const dislike = httpsCallable(functions, 'dislikePost');
	dislike({
		zipCode: await getUserZipCode(),
		postID: postID,
	});
}

async function uploadComment(postID, content) {
	let user = getLoggedInUser();
	if (!user) return;
	let zipCode = await getUserZipCode();
	const postDoc = doc(getFirestore(), `${zipCode}/${postID}`);

	updateDoc(postDoc, {
		comments: arrayUnion({
			author: user.uid,
			authorUsername: user.displayName,
			content: content,
			timestamp: Timestamp.now(),
		}),
	});
}

async function getPost(postID) {
	const zipCode = await getUserZipCode();
	const postDoc = doc(getFirestore(), zipCode, postID);
	return (await getDoc(postDoc)).data();
}

let firebaseUtils = {
	getLoggedInUser: getLoggedInUser,
	getUserZipCode: getUserZipCode,
	uploadPost: uploadPost,
	getPost: getPost,
	likePost: likePost,
	dislikePost: dislikePost,
	uploadComment: uploadComment,
	uploadImage: uploadImage,
};

export default firebaseUtils;
