import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

//firebaseden aldığım bilgiler
const firebaseConfig = {
    apiKey: "AIzaSyCgjhfSHqnW5f5hAOU__BImCa8lHvYHsa8",
    authDomain: "proje1-704d8.firebaseapp.com",
    databaseURL: "https://proje1-704d8-default-rtdb.europe-west1.firebasedatabase.app/",
    projectId: "proje1-704d8",
    storageBucket: "proje1-704d8.appspot.com",
    messagingSenderId: "410474967984",
    appId: "1:410474967984:web:874f2afde643c743a6dc75",
    measurementId: "G-94S626K789"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
const fs = getFirestore(app);


document.getElementById("registerBtn").addEventListener("click", async () => {
    const username = document.getElementById("regUsername").value;
    const birthdate = document.getElementById("regBirthdate").value;
    const email = document.getElementById("regEmail").value;
    const password = document.getElementById("regPassword").value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const userId = userCredential.user.uid;

        
        await setDoc(doc(fs, "users", userId), {
            username,
            birthdate,
            email
        });

        
        await set(ref(db, 'users/' + userId), {
            username,
            birthdate,
            email
        });

      //ekrana gönderilen mesaj
        alert("Kayıt Başarılı!");
    } catch (error) {
        alert("Hata: " + error.message);
    }
});


document.getElementById("loginBtn").addEventListener("click", async () => {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    try {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Giriş Başarılı!");
        //boş sayfaya yönlendirdim
        window.location.href = "profil.html";
    } catch (error) {
        alert("Hata: " + error.message);
    }
});