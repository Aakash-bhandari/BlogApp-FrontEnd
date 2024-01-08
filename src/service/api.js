import axios from 'axios';
import {API_NOTIFICATION_MESSAGES,SERVICE_URLS} from '../constant/config.js'
import { getaccessToken ,getType } from '../utils/common_utils.js';
const API_URL='https://blogapp-i0iw.onrender.com'

const axiosinstance=axios.create({
    baseURL:API_URL,
    timeout:10000,
    headers:{
        "content-type":"application/json"
    }
})

axiosinstance.interceptors.request.use(
    function(config){
        if(config.TYPE.params){
            config.params=config.TYPE.params;
        }else if(config.TYPE.query){
            config.url=config.url + '/' + config.TYPE.query;
        }
        return config
    },
    function (error){
        return error
    }
)

axiosinstance.interceptors.response.use(
    function(response){
        return processResponse(response);
    },
    function(error){
        return processError(error);
    }
)

const processResponse=(response)=>{
    if(response.status==200){
        return { isSucces:true , data : response.data}
    }else{
        return{
            isFalure:true,
            status:response?.status,
            msg:response?.msg,
            code:response?.code
        }
    }
}

const processError = (error)=>{
    console.log(error);
    if(error.response){
        // console.log(error.response);
        //     console.log("Error in  Response",error.toJSON());
            return {
                isError:true,
                msg:error.response.data.msg,
                code:error.response.status
            }

    }else if (error.request){
        //console.log("Error in  Request",error.toJSON());
        return{
            isError:true,
            msg:API_NOTIFICATION_MESSAGES.requestFailure,
            code:''
        }

    }else{
        // console.log("Error in  Network Failure",error.toJSON());
        return{
            isError:true,
            msg:API_NOTIFICATION_MESSAGES.networkError,
            code:''
        }

    }

}


const API={};

for (const [key, value] of Object.entries(SERVICE_URLS)) {
    API[key] = (body, showUploadProgress, showDownloadProgress) =>
        axiosinstance({
            method: value.method,
            url: value.url,
            data: value.method === 'DELETE' ? {} : body,
            responseType: value.responseType,
            headers: {
                authorization: getaccessToken(),
            },
            TYPE: getType(value, body),
            onUploadProgress: function(progressEvent) {
                if (showUploadProgress) {
                    let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showUploadProgress(percentCompleted);
                }
            },
            onDownloadProgress: function(progressEvent) {
                if (showDownloadProgress) {
                    let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showDownloadProgress(percentCompleted);
                }
            }
        });
}

export { API };