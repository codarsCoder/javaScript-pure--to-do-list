
    window.onload = function(){
        getCategories();
    }
    // Functions
  
    function getITem(key) { return JSON.parse(localStorage.getItem(key))};
    function setITem(key,value) { localStorage.setItem(key,JSON.stringify(value));}
    function delITem(key) { localStorage.removeItem(key);}
    function getId(id){ return document.getElementById(id)}
    function queryS(id){ return document.querySelector(id)}
    function querySA(id){ return document.querySelectorAll(id)}
    function noHyphen(str){ let st = str.replaceAll('--', '') ; return st}
    function counter(key){ return  Array.from(JSON.parse(localStorage.getItem(key))).length  }
   function message(message){ alert(message) }
   
    // ****CATEGORIES****

    // Add category

    getId("category-add").addEventListener("click",() => {
        
        const cName =  noHyphen(getId("category-name").value.toUpperCase());
        if(cName.length > 14) {  
            message("max 14 character!") 
        } else {
            console.log(cName);
            const cList = getITem("toDos") || [];
            
            if(cList.includes(cName)) {
                alert("This category is already registered!")
                getId("category-name").focus();
            }else{
                const newList = [cName, ...cList]                     //const newList = [cName, ...cList];
                setITem("toDos", newList);
                setITem(cName,[])  // aynı zamanda yeni kategori için  boş bir diziekliyoruz yoksa sayma işlemi yaparken onun karşılığını bulamadığından dolayı hata veriyor 
                getId("category-name").value="";
                getId("category-name").focus();
                getCategories();
            }
        }                      
    })


    // get categories

    function getCategories(){

        const addLinks = getId("add-links");
        const cList = getITem('toDos') ||  []   //JSON.parse(localStorage.getItem('toDos')) // getITem('toDos') || [];
        addLinks.innerHTML = "";
        for(let i= 0; i<cList.length ; i++) {
           let cName = cList[i];
            let count = counter(cName) // getITem(cName)  //  JSON.parse(localStorage.getItem(cName)) 
            console.log(count , "count tipi")
          
            addLinks.innerHTML += 
            `<div class="links">
            <button id="${i}"  onclick="itemList('${cName}')" class="s-link">${cName}</button>
            <span class="tasks-num">${i+1}</span>
            <span class="tasks"><p>Tasks ${count}</p></span>
            <span  class="trash "><button onclick='deleteCategory("${i}")'><i class="delete-category fas fa-trash-alt" aria-hidden="true"></i></button></span>
        </div>`
            
        };
    }



    // Delete category

  
    function deleteCategory(id) {
        const warnng = confirm("are you sure you want to delete?")
        if(warnng) {
        const cList = getITem("toDos");
        const deleted = cList[id];
            cList.splice(id,1);
            setITem("toDos",cList);
            delITem(deleted)
            getCategories()
        }
           
    };

 
    // ****LISTS****

    // Add list

    function addList() {
       
    const cName = getId("ctgry-name").value
    if(cName == ""){alert("category name not found!") ;   $('#add-item').modal("hide")}
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
        todoList.unshift(todo)
        setITem(cName,todoList)

    const todoListh = getITem(cName)
            todoListh.forEach(item => {
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
        getId("plus-add-item").classList.remove("d-none")
        getId("task-name").innerText= cName
        const todoListh = getITem(cName) || []
        getId("task").innerHTML = `<strong>${counter(cName) ? counter(cName) : 0}</strong>`
        const itemList = getId("add-list")  ; let say = todoListh.length;
        if(say == 0){ getId("add-list").innerHTML = `<h2 style="margin:auto">list ${cName} is empty</h2>` }; 
        const categoryName = getId("ctgry-name")
        itemList.innerHTML = "";
        todoListh.forEach((item, i) => {
            const itemName =  item.itemName;
            const importance = item.importance;
            const completed = item.completed;
            let colors = ["color-1","color-1","color-2","color-3"]
            const color = colors[item.color];
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
                <div class="widget-heading ${completed ? "line-through" : null}"> ${itemName} ${importan} 
                </div>
                </div>
            <div class="widget-content-right">
                <input type="checkbox" id='${i}' onclick="completeTask('${i}--${cName}')" class="task-check " ${completed ? "checked" : null}>
                
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
        const pieces = item.split("--",2);
        let todo = getITem(pieces[1]);
        let count = todo.length
        todo.splice(pieces[0], 1)
        setITem(pieces[1],todo)
        itemList(pieces[1])
        count == 1 ? getId("add-list").innerHTML = `<h2 style="margin:auto">list ${pieces[1]} is empty</h2>` : null   // listede bir eleman kalmışsa sildikten sonnra liste boşalacağından empty ekledik
        getId("task").innerHTML = `<strong>${count-1}</strong>`
        getCategories()
    }

    // complete task

    function completeTask(item){
        const pieces = item.split("--",2);
        let todo = getITem(pieces[1]);
        let last = todo[pieces[0]];
        todo[pieces[0]].completed ? last.completed = false : last.completed = true;  // completed true ise false , false ise true olacak
        todo.splice(pieces[0], 1, last )
        setITem(pieces[1],todo)
        itemList(pieces[1])
       
    }

    // All tasks
    function allTasks() {

        let todos = getITem("toDos") || [];
        let count = 0;
    

        todos.forEach(todo => {
           
         count += getITem(todo).length   //  Object.keys(getITem(todo)).length;
        })
        
        getId("task").innerHTML = `<strong>${count}</strong>`

    }allTasks();

    function saveJson() {
         
        let saveObj = [];
        let todos = getITem("toDos") || [];
        let count = 0;
        todos.forEach(todo => { 
            let todoValue =  getITem(todo) ;
            let todoPack = [];
            todoPack = [todo, ...todoValue];
            saveObj.unshift(todoPack)
        })
        
        // file setting
        const text = JSON.stringify(saveObj);
        const name = "toDo.json";
        const type = "text/plain";
    
        // create file
        const a = document.createElement("a");
        const file = new Blob([text], { type: type });
        a.href = URL.createObjectURL(file);
        a.download = name;
        document.body.appendChild(a);
        a.click();
        a.remove();
    }
 

     $('.modal').on('shown.bs.modal', function() {
         $(this).find('[autofocus]').focus();
     });    













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






//     // modal auto focus
     