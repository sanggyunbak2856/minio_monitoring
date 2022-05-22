import { Component } from 'react';
import AWS from 'aws-sdk';

var s3= new AWS.S3({
  endpoint:"http://192.168.219.170:9000",
  accessKeyId:'minio',
  secretAccessKey:'miniostorage',
  signatureVersion:'v4'
})

s3.listBuckets(function(err,data){
  if(err){console.log("error",err);}
  else{
    console.log("success",data.Buckets[0]);
  }
})

export default class Hello extends Component{
    constructor(props){
        super(props);
        this.state = {text: "before"};
    }
    change=()=>{
        
        this.setState({
            
        })
    }
    render(){
        return<div>
            <h1>{this.state.text}</h1>
            <button onClick={this.change}>button</button>
        </div>;
    }
}