import './App.css';
import AWS from 'aws-sdk';
import React from 'react';
import Bucket from './components/Bucket';

const s3 = new AWS.S3({
  endpoint: "http://192.168.0.22:9000",
  port: "9000",
  accessKeyId: "minioadmin",
  secretAccessKey: "minioadmin",
  signatureVersion: "v4",
  s3ForcePathStyle:  true
})

function App() {
  return (
    <div className="App">
      <Bucket s3={s3}/>
    </div>
  );
}

export default App;
