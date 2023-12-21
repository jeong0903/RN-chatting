import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword,updateProfile, } from 'firebase/auth';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import config from '../firebase.json';

const app = initializeApp(config);

const auth = getAuth(app);

export const signin = async ({ email, password}) => {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  return user;
}

const uploadImage = async uri => {
  if (uri.startsWith('https')) {
    return uri;
  }

  const response = await fetch(uri);
  const blob = await response.blob();

  const { uid } = auth.currentUser;
  const storage = getStorage(app);
  const storageRef = ref(storage, `/profile/${uid}/photo.png`);
  await uploadBytes(storageRef, blob, {
    contentType: 'image/png',
  });

  return await getDownloadURL(storageRef);
};

export const signup = async ({ name, email, password, photo }) => {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  const photoURL = await uploadImage(photo);
  await updateProfile(auth.currentUser, { displayName: name, photoURL });
  return user;
};

export const getCurrentUser = () => {
  const {uid, displayName, email, photoURL} = auth.currentUser;
  return { uid, name:displayName, email, photo:photoURL };
}

export const updateUserInfo = async photo => {
  const photoURL = await uploadImage(photo);
  await updateProfile(auth.currentUser, { photoURL });
  return photoURL;
}

export const signout = async () => {
  await signOut(auth);
  return {};
};