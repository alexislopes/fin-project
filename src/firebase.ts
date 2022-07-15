import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, query, getDocs } from 'firebase/firestore';
import { uuidv4 } from "@firebase/util"
import { onMounted, ref } from "vue";
import { isSameMonth } from './utils/comparators';

import FIRESTORE_CONFIG from "./key.json"

const firebaseApp = initializeApp(FIRESTORE_CONFIG);

export const db = getFirestore(firebaseApp);

export const getRecursoMesByMes = async timestamp => {
  let recursosMesByMes = [];
  const querySnap = await getDocs(query(collection(db, 'recursoMes')));

  querySnap.forEach((doc) => {
    if(isSameMonth(timestamp, doc.data().timestamp)){
      recursosMesByMes.push(doc.data())
    }
  });

  return recursosMesByMes
}

export const getObjetivoMesByMes = async timestamp => {
  let objetivosMesByMes = [];
  const querySnap = await getDocs(query(collection(db, 'objetivoMes')));

  querySnap.forEach((doc) => {
    if(isSameMonth(timestamp, doc.data().timestamp)){
      objetivosMesByMes.push(doc.data())
    }
  });

  return objetivosMesByMes
}

// export const getRecursos = () => {
//   let recursos = [];
//   onSnapshot(collection(db, "recursos"), (snapshot) => {
//     snapshot.forEach(doc => recursos.push(doc.data()))
//   })
//   return recursos;
// }

export const getObjetivos = async () => {
  // const citiesCol = collection(db, 'objetivos');
  // const citySnapshot = await getDocs(citiesCol);
  // const cityList = citySnapshot.docs.map(doc => doc.data());
  // return await cityList;
}

export const setRecurso = async ({nome}) => {
  const recursosCollection = collection(db, 'recursos');
  const recursoSnapshot = await addDoc(recursosCollection, {id: uuidv4(), nome});
  return recursoSnapshot.id;
}

export const setRecursoMes = async ({recursoId, montante}) => {
  const timestamp = new Date().getTime();
  const recursosCollection = collection(db, 'recursoMes');
  const recursoSnapshot = await addDoc(recursosCollection, {id: uuidv4(), recursoId, montante, timestamp});
  return recursoSnapshot.id;
}

export const setObjetivo = async ({ descricao }) => {
  const recursosCollection = collection(db, 'objetivos');
  const recursoSnapshot = await addDoc(recursosCollection, {id: uuidv4(), descricao});
  return recursoSnapshot.id;
}

export const setObjetivoMes = async ({isFixa, valor, recursoId, objetivoId}) => {
  const timestamp = new Date().getTime();
  const recursosCollection = collection(db, 'objetivoMes');
  const recursoSnapshot = await addDoc(recursosCollection, {id: uuidv4(), recursoId, isFixa, valor, objetivoId, timestamp});
  return recursoSnapshot.id;
}

// const recursosCollection = db.collection("recursos");

// export const createRecurso = (recurso) => {
//   return recursosCollection.add(recurso);
// };

// export const getRecuso = async (recursoId) => {
//   const recurso = await recursosCollection.doc(recursoId).get();
//   return recurso.exists ? recurso.data() : null;
// };
