storage rules:

rules_version = '2';
service cloud.firestore {
 match /databases/{database}/documents {
    match /users/{userID} {
      allow create: if request.auth != null;
      allow read: if request.auth != userID;
    }
    //match any doc in guide collection
        match /guides/{guideID} {
      allow read, write: if request.auth != null;
    }
  }
}
