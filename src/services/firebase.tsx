import { initializeApp } from "firebase/app"
import config from './config.json'
import { Auth, GoogleAuthProvider, User, UserCredential, getAuth, signInWithPopup, signOut } from "firebase/auth"
import { CollectionReference, Firestore, collection, doc, getFirestore, setDoc } from "firebase/firestore"
import { FirebaseStorage, getStorage } from "firebase/storage"

export type FileData = {
    id: string,
    originalFilename: string,
    uniqueFilename: string,
    userId : string|null
}

export type UserData = {
    displayName: string,
    uid: string
}

class FirebaseService{
    auth : Auth
    firestore: Firestore
    filesCollection: CollectionReference<FileData>
    googleAuthProvider: GoogleAuthProvider
    storage: FirebaseStorage
    usersCollection: CollectionReference<UserData>

    constructor(){
        initializeApp(config)

        this.auth = getAuth()
        this.auth.useDeviceLanguage()

        this.firestore = getFirestore()
        this.filesCollection = collection(this.firestore, 'files') as CollectionReference<FileData> 

        this.googleAuthProvider = new GoogleAuthProvider()
        this.storage = getStorage()

        this.usersCollection = collection(this.firestore, 'users') as CollectionReference<UserData>
    }

    async addUser(user: User):Promise<void>{
        await setDoc(doc(this.usersCollection, user.uid), {
            uid:user.uid,
            displayName: user.displayName
        })
    }

    async singInWithGoogle(): Promise<UserCredential> {
        try{
            const userCredential = await signInWithPopup(this.auth, this.googleAuthProvider)
            await this.addUser(userCredential.user)
        } catch(error){
            return null
        }
    }

    async signOut(): Promise<void>{
        await signOut(this.auth)
    }
}

export default new FirebaseService()