import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signInWithCustomToken } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
import {getDatabase, ref, child, get } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";
  const firebaseConfig = {
    apiKey: "AIzaSyC3Vuf4ma6wKrrphF7tbmd2ih0Qr28w2sM",
    authDomain: "gojim-26cbc.firebaseapp.com",
    databaseURL: "https://gojim-26cbc-default-rtdb.firebaseio.com",
    projectId: "gojim-26cbc",
    storageBucket: "gojim-26cbc.appspot.com",
    messagingSenderId: "491730952662",
    appId: "1:491730952662:web:2f430530eef2e0ebfbc477",
    measurementId: "G-C5KT1RZJYS"
  };
  
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getDatabase(app);

  const storedUserId = localStorage.getItem('userId');
  if (storedUserId) {
  
    auth.signInWithCustomToken(storedUserId)
      .then(() => console.log('User logged in automatically'))
      .catch((error) => console.log(error));
  }

   const profileButton = document.querySelector("#profileButton");
  profileButton.addEventListener('click', async (e) => {
    const user = auth.currentUser;
    if (user) {
      const userId = user.uid;
      const userRef = ref(db, `users/${userId}`);
      const snapshot = await get(child(userRef, 'email'));
      const email = snapshot.val();
      const htmlBlob = new Blob([`<!DOCTYPE html>
        <html>
          <head>
          <style>
    
    body {
      background-color: #FFFFFF;
      padding: 20px;
    }
    nav {
      background-color: #CCCCCC;
      padding: 10px;
      margin-bottom: 20px;
    }
    nav ul {
      list-style: none;
      display: flex;
      justify-content: space-between;
    }
    nav ul li {
      margin-right: 20px;
    }
    .slider {
      -webkit-appearance: none;
      width: 100%;
      height: 10px;
      background: #CCCCCC;
      outline: none;
      opacity: 0.7;
      -webkit-transition: .2s;
      transition: opacity .2s;
    }
    .slider::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 20px;
      height: 20px;
      background: #333333;
      cursor: pointer;
    }
    .slider::-moz-range-thumb {
      width: 20px;
      height: 20px;
      background: #333333;
      cursor: pointer;
    }
  </style>
            <title>Personalized Page</title>
          </head>
          <body>
          <nav>
          <ul>
          <li><a href="#threads">Threads</a></li>
          <li><a href="#likes">Likes</a></li>
          <li><a href="#comments">Comments</a></li>
        </ul>
        </nav>
            <h1>Welcome, ${email}!</h1>
            <h2>Profile Picture</h2>
    <button>Upload</button>
     <h2>Background Color</h2>
      <input type="range" min="0" max="255" value="128" class="slider" id="bgSlider">
    <script>
    const slider = document.getElementById("bgSlider");
    slider.addEventListener("input", () => {
  const value = slider.value;
  const hexValue = value.toString(16).padStart(2, '0').toUpperCase();
  });
        </body>
        </html>`], { type: 'text/html' });
      const htmlUrl = URL.createObjectURL(htmlBlob);
      window.open(htmlUrl, '_blank');
    }
  });
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('black-and-white');
    });