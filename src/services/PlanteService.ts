import { addDoc, getDocs, getFirestore } from 'firebase/firestore';
import app from '../firebase/firebaseConfig';
import { collection } from 'firebase/firestore';
import { Legume, Plante } from '../models/Plante';

const db = getFirestore(app.app);

class PlanteService {
  async getPlantes(): Promise<Legume[]> {
    return getDocs(collection(db, 'plantes')).then((data) => {
      return data.docs.map((doc) => doc.data() as Legume);
    });
  }

  async postPlante(plante: Plante) {
    try {
      await addDoc(collection(db, 'plantes'), plante);
      console.log(`Plante insérée en base: ${plante.nom}`);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }
}

export default new PlanteService();
