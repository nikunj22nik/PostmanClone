console.log("hello");

//initialize the parameters count

let paramscount=0;

function getElementfromString(string){
let div=  document.createElement('div');
div.innerHTML=string;
return div.firstChild;
}

let parameterbox=document.getElementById('parameterbox');

parameterbox.style.display="none";

//if user click the json  hide parameterbox

let jsonRadio=document.getElementById('json');

jsonRadio.addEventListener("click",()=>{
    parameterbox.style.display="none";
    document.getElementById('jsonbox').style.display="block";
});

//if user click the parameter button hide
let paramsradio=document.getElementById('params');
let jsonbox=document.getElementById('jsonbox');
paramsradio.addEventListener("click",()=>{
jsonbox.style.display="none";
parameterbox.style.display="flex";
});





 let addbtn=document.getElementById('addbtn');
   addbtn.addEventListener("click",(e)=>{
     let String=`<div class="container1 my-3">
     <div style="display: inline-block; width:8%;">
     <b>Parameter ${paramscount+2}</b>
    </div>
        <input type="text" class="key" id="key${paramscount+2}"  name="key" placeholder="Enter Key">
         <input type="text" class="value" id="valueinp${paramscount+2}" name="valueinp" placeholder="Enter value">
          <input type="button" value="-" class="removebtn">
            </div>`;
  let insert=document.getElementById('insert');
  let d=getElementfromString(String);
     insert.appendChild(d);
       paramscount++;

//delete any parameters
let deleteparams=document.getElementsByClassName('removebtn');

for(item of deleteparams){
  item.addEventListener("click",(e)=>{
    e.target.parentElement.remove();
  })
}

   })

//When user click submit button

let submit=document.getElementById('submit');

submit.addEventListener("click",()=>{
  document.getElementById("response").innerHTML="please wait......Response is fetching";

let url=document.getElementById("url").value;
let requestType=document.querySelector("input[name='Requesttype']:checked").value;
let contentType=document.querySelector("input[name='Contenettype']:checked").value;

console.log(url);
console.log(requestType);
console.log(contentType);




//if the user has used params option instead of json option  
if(contentType=="customparameter"){
  data={};

  for(let i=1;i<=paramscount+1;i++){
      if(document.getElementById("key"+i) !=undefined){
            let key=document.getElementById("key"+i).value;
            let value=document.getElementById("key"+i).value;    
           data[key]=value;
         }
    
   }
 
   data=JSON.stringify(data);
}

else{
  data=document.getElementById('requestjson').value;
}
console.log(data);

//if the request type is get invoke fetch api to create a get request
if(requestType=="GET"){
  fetch(url,{
    method:'GET',
  }).then((response) =>{ 
  return response.text()}).then((text)=>{
    document.getElementById('response').innerHTML=text;
  })

}
else{
  fetch(url, {
    method: 'POST', 
    body: data,
    headers: {
        "Content-type": "application/json; charset=UTF-8"
      }  
}).then(response=>response.text()).then((text)=>{
    document.getElementById('response').innerHTML=text;
  })
}



});



























