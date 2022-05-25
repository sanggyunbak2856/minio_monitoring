var AWS = require('aws-sdk')
var s3= new AWS.S3({
    endpoint:"http://10.0.2.7:9000",
    port:'9000',
    accessKeyId:'minio',
    secretAccessKey:'miniostorage',
    signatureVersion:'v4',
    s3ForcePathStyle:true
  })
  let lists = [];
  let textlist=[];
  s3.listObjects(
      {
          Bucket: "test1"
      },
      (err, data) => {
          if (err) {
              throw err;
          }
          let contents = data.Contents;
          contents.forEach((content) => {
              lists.push(content.Key); // "ex) content.Key => assets/images/1.png"
          });
          s3.getObject({Bucket:"test1", Key:"test.txt"},function(err,data){
              if(err){
                  console.log(err)
              }
              console.log(data.Body.toString())
          })
        
      }
  );