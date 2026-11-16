import { db } from '../config/firebase.js';
import {
  collection,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';

const productsCollection = collection(db, 'products');

// Firestore guarda el ID como texto: si es numérico lo devolvemos como número
const formatId = (id) => (/^\d+$/.test(id) ? Number(id) : id);

export const getAll = async () => {
  const snapshot = await getDocs(productsCollection);
  return snapshot.docs.map((d) => ({ id: formatId(d.id), ...d.data() }));
};

export const getById = async (id) => {
  const snap = await getDoc(doc(productsCollection, String(id)));
  return snap.exists() ? { id: formatId(snap.id), ...snap.data() } : null;
};

// Busca el ID numérico más alto y devuelve el siguiente
export const getNextId = async () => {
  const snapshot = await getDocs(productsCollection);
  const ids = snapshot.docs
    .map((d) => d.id)
    .filter((id) => /^\d+$/.test(id))
    .map(Number);
  return ids.length ? Math.max(...ids) + 1 : 1;
};

export const exists = async (id) => {
  const snap = await getDoc(doc(productsCollection, String(id)));
  return snap.exists();
};

export const create = async (id, data) => {
  await setDoc(doc(productsCollection, String(id)), data);
  return { id: Number(id), ...data };
};

export const update = async (id, data) => {
  const ref = doc(productsCollection, String(id));
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  await updateDoc(ref, data);
  return { id: formatId(snap.id), ...snap.data(), ...data };
};

export const remove = async (id) => {
  const ref = doc(productsCollection, String(id));
  const snap = await getDoc(ref);
  if (!snap.exists()) return false;
  await deleteDoc(ref);
  return true;
};
