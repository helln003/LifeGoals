import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Meta } from '../models/meta.model';

@Injectable({
  providedIn: 'root',
})
export class MetaServiceService {
  constructor(private firestore: AngularFirestore) {}

  getMetas(): Observable<Meta[]> {
    return this.firestore
      .collection<Meta>('metas')
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as Meta;
            const id = a.payload.doc.id;
            return { ...data, id };
          })
        )
      );
  }

  addMeta(meta: string): Promise<any> {
    return this.firestore.collection('metas').add({ meta });
  }

  deleteMeta(id: string): Promise<void> {
    return this.firestore.collection('metas').doc(id).delete();
  }
}
