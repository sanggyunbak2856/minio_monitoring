import './App.css';
import AWS from 'aws-sdk';
import React from 'react';
import Bucket from './components/Bucket';

AWS.config.update({
  accessKeyId: 'minioadmin',
  secretAccessKey: 'minioadmin',
})
const s3 = new AWS.S3({
  endpoint: 'http://192.168.0.22:9000',
})

function App() {
  return (
    <div className="App">
      <Bucket s3={s3}/>
    </div>
  );
}

export default App;
