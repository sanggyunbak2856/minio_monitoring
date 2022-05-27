
AWS=require('aws-sdk')

const s3 = new AWS.S3({
    endpoint: "http://10.0.2.7:9000",
    port: "9000",
    accessKeyId: "minio",
    secretAccessKey: "miniostorage",
    signatureVersion: "v4",
    s3ForcePathStyle:  true
  })

  var params={
      Bucket:'test1'
  }
  s3.headBucket(params,function(err,exists){
      if(err) console.log(err);
      if(exists) console.log("true")
  })
  