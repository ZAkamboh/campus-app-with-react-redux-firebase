import React, { Component } from "react";
import * as firebaseconfig from "firebase";
var config = {
  apiKey: "AIzaSyDJ9LgKEz34_tf1XmnwRZayWzKuPjT3Ef4",
  authDomain: "panacloud2.firebaseapp.com",
  databaseURL: "https://panacloud2.firebaseio.com",
  projectId: "panacloud2",
  storageBucket: "panacloud2.appspot.com",
  messagingSenderId: "201839472536"
};
var firebase = firebaseconfig.initializeApp(config);
export default firebase;
