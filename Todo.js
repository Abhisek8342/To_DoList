let formTag=document.getElementById('sub-form');
let inpTask=document.getElementById('input-task');
let id=0;
// localStorage.clear();

formTag.addEventListener('submit', function(e) {
    e.preventDefault();
    let task=inpTask.value;
    
    let tasks=localStorage.getItem('tasks')?JSON.parse(localStorage.getItem('tasks')):[];

    let obj={
        id:++id,
        task:task
    }
  if(task.length>0) {
    tasks.unshift(obj);//add task at start index(start of array).
    }

    localStorage.setItem('tasks',JSON.stringify(tasks));

    displayTask();
      
    inpTask.value="";
});

function displayTask(){
    let tasks=JSON.parse(localStorage.getItem('tasks'));
        let eachTasks=``;
        
    tasks.forEach(function(task){
        eachTasks+=`<li class="list-group-item list-group-item-warning mt-2">
                            <span class="fs-5">${task.task}</span>
                            <button  class="btn btn-warning float-end ms-2 rounded-circle " id="deleteTask" onclick="deleteT(${task.id})">
                                <i class="fa-solid fa-circle-xmark text-white text-center"></i></button>
                            <button  class="btn btn-warning float-end rounded-circle" >
                                <i class="fa-solid fa-pen-to-square text-white text-center" id="editTask" onclick="editT(${task.id})"></i></button>
                        </li>`;
    });
    document.getElementById('display').innerHTML=eachTasks;
}

displayTask();

//delete and edit functionality

// let deleteBtn=document.getElementById('deleteTask');
// let editBtn=document.getElementById('editTask');

   function deleteT(id){
    let tasks=JSON.parse(localStorage.getItem('tasks'));
    let updatedTask= tasks.filter(function(task){
        
              return task.id !=id;
    });

    localStorage.setItem('tasks', JSON.stringify(updatedTask));
   displayTask();
}


//Update Task
let updForm=document.getElementById('up-form');
let origForm=document.getElementById('orig-form');

function editT(id){
    origForm.classList.add('hidden');
    updForm.classList.remove('hidden');

    let tasks=JSON.parse(localStorage.getItem('tasks'));

   let updateForm=document.getElementById('update-form');
   let updateInput=document.getElementById('input-update');
   
   tasks.forEach((task)=>{
     if(task.id==id){
        updateInput.value=task.task;
     }
   });

   updateForm.addEventListener('submit',function(e){
    e.preventDefault();
    updatValue=updateInput.value;

    if(updatValue.length>0){
        let updatedTasks= tasks.map(function(task){
              if(task.id == id){
                 let obj={...task, task:updatValue};
                 return obj;
              }
              else{
                 return task;
              }
         });
     
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
     }
     displayTask();
     origForm.classList.remove('hidden');
     updForm.classList.add('hidden');
   });

}

