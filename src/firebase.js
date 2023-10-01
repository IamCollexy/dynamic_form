// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore, onSnapshot } from 'firebase/firestore';
import {
  collection,
  updateDoc,
  doc,
  addDoc,
  getDocs,
  setDoc,
} from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyD1XEqYP6ZXioDUC_S-SVubATe-GKXfXok',
  authDomain: 'formquestions-a323e.firebaseapp.com',
  projectId: 'formquestions-a323e',
  storageBucket: 'formquestions-a323e.appspot.com',
  messagingSenderId: '241677249970',
  appId: '1:241677249970:web:8ebd3f426e96986bc148ab',
  measurementId: 'G-GTG7QXFLPL',
  // apiKey: process.env.API_KEY,
  // authDomain: process.env.AUTH_DOMAIN,
  // projectId: process.env.PROJECT_ID,
  // storageBucket: process.env.STORAGE_BUCKET,
  // messagingSenderId: process.env.MESSAGING_SENDER_ID,
  // appId: process.env.APP_ID,
  // measurementId: process.env.MEASUREMENT_ID,
};

const docRef = doc(db, 'allQuestions', 'form');

export const addQuestion = async (formData) => {
  try {
    // Extract values from formData
    const { head, question } = formData;

    // Map the fields from question to update newQuestion
    const updatedFields = question.map((q) => ({
      id: q.id,
      questionTitle: q.questionTitle,
      field: q.field.map((f) => ({
        id: f.id,
        fieldTitle: f.fieldTitle,
        type: f.type,
        options: f.options,
        prompt: f.prompt,
        fileSize: f.fileSize,
        isFieldVisible: f.isFieldVisible,
      })),
      emails: q.emails,
      pin: q.pin,
      responses: q.responses.map((r) => ({
        id: r.id,
        email: r.email,
        answers: r.answers,
      })),
    }));

    // Construct the newQuestion object with updatedFields

    // console.log(newQuestion);
    // Add the new question to Firestore
    await setDoc(docRef, {
      head,
      question: updatedFields,
    });
    // const docRef = await addDoc(
    //   collection(db, 'allQuestions'),
    //   newQuestion
    // );

    // console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

// To get the form which an object that has a question key which is an array
export const getQuestions = async () => {
  const querySnapshot = await getDocs(collection(db, 'allQuestions'));
  const questionsData = [];

  querySnapshot.forEach((doc) => {
    questionsData.push({ id: doc.id, ...doc.data() });
  });

  return questionsData;
};

export const handleUpdateData = async (formData) => {
  //
  // onSnapshot(docRef, (doc) => {
  //   console.log(doc.data(), doc.id);
  // });

  const updatedFields = formData[0].question.map((q) => ({
    id: q.id,
    questionTitle: q.questionTitle,
    field: q.field.map((f) => ({
      id: f.id,
      fieldTitle: f.fieldTitle,
      type: f.type,
      options: f.options,
      prompt: f.prompt,
      fileSize: f.fileSize,
      isFieldVisible: f.isFieldVisible,
    })),
    emails: q.emails,
    pin: q.pin,
    responses: q.responses.map((r) => ({
      id: r.id,
      email: r.email,
      answers: r.answers.map((r) => ({
        r,
      })),
    })),
  }));

  const newQuestion = {
    head: formData[0].head,
    question: updatedFields,
  };
  await updateDoc(docRef, {
    newQuestion,
  }).then(() => {
    console.log('Document updated successfully');
  });
};
