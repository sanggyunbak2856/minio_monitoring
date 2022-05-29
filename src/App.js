import './App.css';
import AWS from 'aws-sdk';
import React from 'react';
import Bucket from './components/Bucket';
import BucketOper from './components/BucketOper';
import Err from './components/Err';
const s3 = new AWS.S3({
  endpoint: "http://10.0.2.7:9000",
  port: "9000",
  accessKeyId: "minio",
  secretAccessKey: "miniostorage",
  signatureVersion: "v4",
  s3ForcePathStyle:  true
})

function App() {
  return (
  <div>
    <div className="App">
      <Bucket s3={s3}/>
    </div>
    <div className="App">
      <BucketOper s3={s3}/> 
    </div>
    <div className="App">
      <Err s3={s3}/> 
    </div>
  </div>
  );
}

export default App;

