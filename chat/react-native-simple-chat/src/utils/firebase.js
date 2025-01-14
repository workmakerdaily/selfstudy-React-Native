import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import config from '../../firebase.json';

const app = initializeApp(config);
const auth = getAuth(app);
const storage = getStorage(app);

export const login = async ({ email, password }) => {
    try {
        const { user } = await signInWithEmailAndPassword(auth, email, password);
        return user;
    } catch (error) {
        console.error('Login failed:', error.message);
        throw error;
    }
};

const uploadImage = async (uri) => {
    const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => resolve(xhr.response);
        xhr.onerror = (e) => reject(new TypeError('Network request failed'));
        xhr.responseType = 'blob';
        xhr.open('GET', uri, true);
        xhr.send(null);
    });

    const user = auth.currentUser;
    if (!user) {
        throw new Error('No authenticated user found');
    }

    const storageRef = ref(storage, `/profile/${user.uid}/photo.png`);
    const snapshot = await uploadBytes(storageRef, blob, { contentType: 'image/png' });

    blob.close();
    return await getDownloadURL(snapshot.ref);
};

export const signup = async ({ email, password, name, photoUrl }) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const storageUrl = typeof photoUrl === 'string' && photoUrl.startsWith('https')
            ? photoUrl
            : await uploadImage(photoUrl);

        await updateProfile(user, {
            displayName: name,
            photoURL: storageUrl,
        });

        return user;
    } catch (error) {
        console.error('회원가입 오류:', error.message);
        throw error;
    }
};

export const getCurrentUser = () => {
    const user = auth.currentUser;
    if (!user) {
        throw new Error('No authenticated user found');
    }
    const { uid, displayName, email, photoURL } = user;
    return { uid, name: displayName, email, photoUrl: photoURL };
};

export const updateUserPhoto = async (photoUrl) => {
    const user = auth.currentUser;
    if (!user) {
        throw new Error('No authenticated user found');
    }
    const storageUrl = typeof photoUrl === 'string' && photoUrl.startsWith('https')
        ? photoUrl
        : await uploadImage(photoUrl);

    await updateProfile(user, { photoURL: storageUrl });
    return { name: user.displayName, email: user.email, photoUrl: user.photoURL };
};
