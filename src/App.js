import './App.css';
import AWS from 'aws-sdk';



const s3= new AWS.S3({
  endpoint:"http://192.168.219.170:9000",
  accessKeyId:'minio',
  secretAccessKey:'miniostorage',
  signatureVersion:'v4',
  region:'ap-northeast-2',
  s3ForcePathStyle:true
})

let lists = [];
s3.listObjectsV2(
    {
        Bucket: "test"
    },
    (err, data) => {
        if (err) {
            throw err;
        }
        let contents = data.Contents;
        contents.forEach((content) => {
            lists.push(content.Key); // "ex) content.Key => assets/images/1.png"
        });
    }
);



function App() {
 
 
  return (
    <div>
      {lists.map((a)=>{
        return(
          <div>
            {a}
          </div>
        )
        })}
    </div>


  );
}

export default App;
