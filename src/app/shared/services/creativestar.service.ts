import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class CreativestarService {

  constructor(private firestore: AngularFirestore) {}

  GetData(doc: any) {
    if(doc != null) {
      return this.firestore
      .collection("creativestar", (ref) =>
        ref.startAfter(doc)
        .orderBy("createdDate", "desc")
        .limit(31)
      )
      .snapshotChanges();
    } else {
      return this.firestore
      .collection("creativestar", (ref) =>
        ref.orderBy("createdDate", "desc")
        .limit(31)
      )
      .snapshotChanges();
    } 
  }

  DeleteData(id) {
    this.firestore.collection("creativestar").doc(id).delete();
  }

  UpdateData(data, id) {
    try {
      this.firestore
        .collection("creativestar")
        .doc(id).ref.set(data);
    } catch (ex) {
      window.alert(ex);
    }
  }

  CreateNewData(data) {
    try {
      this.firestore
        .collection("creativestar")
        .add(data);
    } catch (ex) {
      window.alert(ex);
    }
  }

}
