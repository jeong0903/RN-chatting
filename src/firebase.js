import { initializeApp } from "firebase/app";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword,signOut, updateProfile, } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import config from '../firebase.json';

const app = initializeApp(config);

import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

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

export const DB = getFirestore(app);

export const createChannel = async ( {title, desc}) => {
  const channelCollection = collection(DB, 'channels');
  const newChannelRef = doc(channelCollection);
  const id = newChannelRef.id;
  const newChannel = {
    id,
    title,
    description: desc,
    createdAt: Date.now(),
  };
  await setDoc(newChannelRef, newChannel);
  return id;
}