
AWS=require('aws-sdk')

const s3 = new AWS.S3({
    endpoint: "http://10.0.2.7:9000",
    port: "9000",
    accessKeyId: "minio",
    secretAccessKey: "miniostorage",
    signatureVersion: "v4",
    s3ForcePathStyle:  true
  })

  const params_obj = {
    Bucket: 'test1',
    Key: 'test.txt'
}
s3.getObject(params_obj,function(err,data){
    if(err){console.log(err,err.stack)}
    else console.log('success')
})