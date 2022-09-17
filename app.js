
    window.onload = function(){
      
    }
    // Fonksiyonlar
    getCategories();
    function getITem(key) { return JSON.parse(localStorage.getItem(key))};
    function setITem(key,value) { localStorage.setItem(key,JSON.stringify(value));}
    function setITem(key,value) { localStorage.setItem(key,JSON.stringify(value));}
    function delITem(key) { localStorage.removeItem(key);}
    function getId(id){ return document.getElementById(id)}
    function queryS(id){ return document.querySelector(id)}
    function querySA(id){ return document.querySelectorAll(id)}
    function noHyphen(str){ let st = str.replaceAll('--', '') ; return st}

    // ****CATEGORIES****

    // Add category

    getId("category-add").addEventListener("click",() => {
        
        const cName =  noHyphen(getId("category-name").value);
        const cList = getITem("toDos") || [];
        
        if(cList.includes(cName)) {
            alert("This category is already registered!")
            getId("category-name").focus();
        }else{
        const newList = [cName, ...cList];
            setITem("toDos", newList);
            getId("category-name").value="";
            getId("category-name").focus();
            console.log(getITem("toDos"));
            getCategories();
        }                  
    })

    // get categories

    function getCategories(){

        const addLinks = getId("add-links");
        const cList = getITem("toDos") || [];
        addLinks.innerHTML = "";

        cList.forEach((category,i) => {
            addLinks.innerHTML += 
            `<div class="links">
            <button id="${i}"  onclick="itemList('${category}')" class="s-link">${category}</button>
          
            <span class="tasks"><p>Tasks 0</p></span>
            <span  class="trash "><button onclick='deleteCategory("${i}")'><i class="delete-category fa fa-trash-o" aria-hidden="true"></i></button></span>
        </div>`
            
        });
    }

    // Delete category

  
    function deleteCategory(id) {
               
        const cList = getITem("toDos");
        const deleted = cList[id];
            cList.splice(id,1);
            setITem("toDos",cList);
            delITem(deleted)
            getCategories()
           
    };

 
    // ****LISTS****

    // Add list

    function addList() {
       
    const cName = getId("ctgry-name").value
    if(cName == ""){alert("category name not found") ;   $('#add-item').modal("hide")}
    const todoList = getITem(cName) || [];
    const itemName = getId("item-name").value
    const importance = getId("importance").value
    var icolor
    const checkbox = document.querySelectorAll(".check")
    checkbox.forEach(check =>{
        check.checked ? icolor = check.value : null
    })

    const todo = {
        itemName:itemName,
        importance:importance,
        completed:false,
        color:icolor
        }
        todoList.push(todo)
        setITem(cName,todoList)

    const todoListh = getITem(cName)
            todoListh.forEach(item => {
            console.log(item.itemName);
            });
            getId("item-name").value = "";
            getId("item-name").focus();
            cName ? itemList(cName) : "";
            getId("add-ok").classList.remove("visible")
            getId("add-ok").innerText= "Added"
            setTimeout(function(){
            getId("add-ok").innerText= ""   
            getId("add-ok").classList.add("visible")
           }, 2000);
            
    }

    // item list

    function itemList(cName) {

        getId("add-task").classList.remove("d-none")
        const todoListh = getITem(cName) || []
        const itemList = getId("add-list")
        const categoryName = getId("ctgry-name")
        itemList.innerHTML = "";
        todoListh.forEach((item, i) => {
            const itemName =  item.itemName;
            const importance = item.importance;
            const completed = item.completed;
            let colors = ["color-1","color-1","color-2","color-3"]
            const color = colors[item.color];
            console.log(color);
            let importan = "";
            importance == "important" ? importan ='<div class="badge badge-danger ml-2">Important</div>' : importan = '';
            itemList.innerHTML += ` 
            <li class="list-group-item">
            <div class="todo-indicator ${color}"></div>
            <div class="widget-content p-0">
            <div class="widget-content-wrapper">
                <div class="widget-content-left mr-2">
                </div>
                <div class="widget-content-left">
                <div class="widget-heading"> ${itemName} ${importan} 
                </div>
                </div>
            <div class="widget-content-right">
                <input type="checkbox" id='${i}' onclick="completeTask('${i}--${cName}')" class="task-check" ${completed ? "checked" : null}>
                
                <button onclick='deleteList("${i}--${cName}")'  class="border-0 btn-transition btn btn-outline-danger">
                <i class="fa fa-trash"></i>
                
                </button>
            </div>
            </div>
            </div>
        </li> 
        `
        });
        categoryName.value = cName;   // task eklemek için kategori adını formdaki yerine yazdırdık
    }

    // delete list item

    function deleteList(item){
        
    }

    // complete task
    function completeTask(item){

    }
























    // const allCategoty = querySA(".delete-category");

    // for(let i = 0; i < allCategoty.length; i++){
            
    // }
    




 // querySA(".delete-category").forEach((category) => {
           
    //     category.addEventListener("click", () => {
               
    //         let id =  category.getAttribute("id");
    //             const cList = getITem("toDos");
    //             cList.splice(id,1);
    //             setITem("toDos",cList);
    //             getCategories()

    //         });
    // });








// function Setup(name,toDo,bol){
//   const list = getITem("toDos") || [];
  
//   const todo = {
//     name:name,
//     todos:toDo,
//     bol:bol
//   }
//   list.push(todo)
//    setITem("toDos",list)
//   }
// function geT(name){
//    const list = getITem("toDos") || [];
//   let liste = Array.from(list)
//   console.log(liste[0].name)
//   console.log(liste[0].todos)
//   console.log(liste[0].bol)
  
// }
// Setup("ali","ödev",false)
//  geT("ali")

//     // modal auto focus
    // $('.modal').on('shown.bs.modal', function() {
    //     $(this).find('[autofocus]').focus();
    //     });       