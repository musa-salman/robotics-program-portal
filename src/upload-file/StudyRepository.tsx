import { DocumentData, addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

type SelectedItem = string;

const getCategories = async (): Promise<string[]> => {
  let items: SelectedItem[] = [];
  try {
    const querySnapshot = await getDocs(collection(db, 'categories'));

<<<<<<< HEAD
const getCategories = async() : Promise<string[]>=>{
   
    let items: SelectedItem[] = [];
    try {
        const querySnapshot = await getDocs(collection(db, "categories"));
        
        querySnapshot.forEach((doc) => {
        const data = doc.data() as DocumentData;
        console.log("data "+data['category']);
        const type :any=data['category'];
        if (!items.includes(type)) {
            items.push(type);
        }
        });
        
        console.log("iteams "+items);
    } catch (error) {
        console.error("Error fetching documents: ", error);
    }
    return items;

=======
    querySnapshot.forEach((doc) => {
      const data = doc.data() as DocumentData;
      console.log('data ' + data['category']);
      const type: any = data['category'];
      if (!items.includes(type)) {
        items.push(type);
      }
    });

    console.log('iteams ' + items);
  } catch (error) {
    console.error('Error fetching documents: ', error);
  }
  return items;
>>>>>>> a9d7d60e807ebe1beb324348c932fc69a8b8c73d
};

const addCategory = async (category: string) => {
  try {
    const docRef = await addDoc(collection(db, 'categories'), {
      category: category
    });
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
  console.log('event: g ' + category);
};

export { getCategories, addCategory };
