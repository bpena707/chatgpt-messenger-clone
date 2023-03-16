import admin from "firebase-admin"
import { getApps } from "firebase/app"

//this will hide the key 
const serviceAccount = JSON.parse(
    process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string
)

    // rebuilt from the envioronment variable singleton pattern
    // admins do not need permission level requirements
if (!getApps().length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    })
}

const adminDb = admin.firestore()

export { adminDb }