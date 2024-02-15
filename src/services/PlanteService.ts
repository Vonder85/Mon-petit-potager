import { getDocs, getFirestore } from "firebase/firestore";
import app from "../firebase/firebaseConfig";
import { collection } from "firebase/firestore";

const db = getFirestore(app.app);

class PlanteService {
  async getPlantes() {
    const docRef = await getDocs(collection(db, "plantes"));
    docRef.forEach((doc) => {
      console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
    });
  }
}

export default new PlanteService();
