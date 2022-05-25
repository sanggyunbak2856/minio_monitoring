import './App.css';
import AWS from 'aws-sdk';
import Object from './object';
import React from 'react';

const s3= new AWS.S3({
  endpoint:"http://10.0.2.7:9000",
  port:'9000',
  accessKeyId:'minio',
  secretAccessKey:'miniostorage',
  signatureVersion:'v4',
  s3ForcePathStyle:true
})



function App() {
 
 
  return (
    <div>
      <Object s3={s3}/>
    </div>


  );
}

export default App;
