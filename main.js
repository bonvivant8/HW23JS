const ulElement=document.querySelector('ul');
const btn = document.querySelectorAll('.btn')
const form=document.getElementById('singup');
const formName=document.getElementById('name');
const formRequire=form.querySelectorAll('.required')
const allSel = document.querySelectorAll('.select');
const radioBTN=document.getElementsByName('radio')
const EMTY_Field='*The field is empty';
let radioAnsw='';
const basket=document.querySelector('.basket')
const drop=document.querySelectorAll('.dropdown2')
const tasksUl = document.querySelector('.tasks');
const submit=document.querySelector('.btn-submit');
const del=document.querySelectorAll('.del')


ulElement.addEventListener('click',(event)=>{
if (event.target.classList.value.includes('nav-link')){
  const activeEl=document.querySelector('.active');
  if(activeEl){
    activeEl.classList.remove('active');
  }
  event.target.classList.add('active');

  closeDropdown()
  closeDropdown2()
  event.target.nextElementSibling.classList.toggle('has-drop');
}
  if (event.target.classList.value.includes('drop-link')){
    const activeEl=document.querySelector('.active')
    if(activeEl){
      activeEl.classList.remove('active')
    }
    event.target.classList.add('active')
    closeDropdown2()
    event.target.nextElementSibling.classList.toggle('has-drop')
  }

});

function closeDropdown(){
  const drop=document.querySelectorAll('.dropdown')
  Array.from(drop).forEach(item=>item.classList.remove('has-drop'));
}

function closeDropdown2(){

  Array.from(drop).forEach(item=>item.classList.remove('has-drop'));
}
Array.from(btn).forEach(item => item.addEventListener('click', hideEverything))
function hideEverything(){
  closeDropdown()
  closeDropdown2()

}

function myForm() {
  function add() {
    form.classList.add('has-drop')
  }

  const btn = document.querySelectorAll('.btn')
  Array.from(btn).forEach(item => item.addEventListener('click', add))
};
myForm()

form.addEventListener('submit',(e)=>{
  e.preventDefault();
 let valid=true;
  formRequire.forEach((field)=>{
    if(field.value===''){
     valid=false;
      printErr(field.id,EMTY_Field)
    }
    if(document.getElementById('radio1').checked==true){
     radioAnsw=document.getElementById('radio1').value
      console.log(radioAnsw)
    }
    else if(document.getElementById('radio2').checked==true){
      radioAnsw=document.getElementById('radio2').value
      console.log(radioAnsw)
    }
    else{
      form.querySelector('.radio-massage').textContent=EMTY_Field
      valid=false;
    }
  })

  allSel.forEach((sel) => {
      const selNum = sel.selectedIndex
      if(selNum === 0){
        printErr(sel.id,EMTY_Field)
        valid=false;
      }
  });

if (valid){


    form.classList.remove('has-drop')
}

})
formName.addEventListener('input',(e)=>{
  if (e.target.value.length>0){
    form.elements.name.nextElementSibling.textContent='';
    form.elements.name.classList.remove('error')
  }
  else {
    form.elements.name.nextElementSibling.textContent=EMTY_Field
  }
})
allSel.forEach(item=>item.addEventListener('click',color));
radioBTN.forEach(item=>item.addEventListener('click',errRadio));


function color(e){
  const selNum = e.target.selectedIndex
  if(selNum !== 0){
    e.target.nextElementSibling.textContent='';
    e.target.classList.remove('error')
  }
  else{
    e.target.nextElementSibling.textContent=EMTY_Field
  }
}
function errRadio(){
  if(document.getElementById('radio1').checked==true||document.getElementById('radio2').checked==true){
    form.querySelector('.radio-massage').textContent=''

}
}
function printErr(element,massage){
  form.elements[element].nextElementSibling.textContent=massage
  if (massage){
    form.elements[element].classList.add('error')
  }
  else {
    form.elements[element].classList.remove('error')
  }
}



if (window.localStorage.getItem('tasks')) {

  const allTasks = JSON.parse(window.localStorage.getItem('tasks'));

  for (let i = 0; i < allTasks.length; i++) {
    const li = document.createElement('li');

    li.classList.add('basket-li')
    li.dataset.index=i;
    const a=document.createElement('a')
    a.classList.add('basket-list')
    const span=document.createElement('span');
    span.classList.add('del')
    const inputString=allTasks[i].task;
    const splitString = inputString.split(":")[1].split(",")[0];
    const productName = splitString.trim();
    a.textContent=productName
    const insideUl = document.createElement('ul');
    insideUl.classList.add('inside-Ul');
    insideUl.classList.add('has-hide');
    const insideLi = document.createElement('li');
    insideLi.classList.add('inside-li');
    insideLi.textContent = allTasks[i].task;
    insideUl.append(insideLi);
    insideUl.append(span)
    li.append(a)
    li.append(insideUl);
    tasksUl.append(li);



  }
} else {

  window.localStorage.setItem('tasks', JSON.stringify([]));
}

Array.from(btn).forEach(item => item.addEventListener('click', (e)=>{
  const li = document.createElement('li');
  const span=document.createElement('span');
  span.classList.add('del')
  li.classList.add('basket-li')
  const a=document.createElement('a')
  a.classList.add('basket-list')
  a.textContent = e.target.parentElement.previousElementSibling.textContent;
  const insideUl = document.createElement('ul');
  insideUl.classList.add('inside-Ul');
  insideUl.classList.add('has-hide');
  const insideLi = document.createElement('li');
  insideLi.classList.add('inside-li');
  insideLi.textContent = Array.from(e.target.parentElement.querySelectorAll('p:not(:last-child)')).map(p => p.textContent).join(', ');
  insideUl.append(insideLi);
  insideUl.append(span)
  li.append(a)
  li.append(insideUl);
  tasksUl.append(li);



  let allTasks = JSON.parse(window.localStorage.getItem('tasks'));
  const task={
    task:Array.from(e.target.parentElement.querySelectorAll('p:not(:last-child)')).map(p => p.textContent).join(', ')
  }
allTasks.push(task)
  window.localStorage.setItem('tasks', JSON.stringify(allTasks));


}));
function deleteTask(parent){
const allTasks=JSON.parse(window.localStorage.getItem('tasks'))
  allTasks.forEach(task=>{
    if (parent.textContent===task.task){
      allTasks.splice(allTasks.indexOf(task),1);
    }
  })
  window.localStorage.setItem('tasks', JSON.stringify(allTasks));
  parent.previousElementSibling.remove();
  parent.remove();
}

tasksUl.addEventListener('click',(event)=>{
  if (event.target.classList.value.includes('basket-list')){
    event.target.nextElementSibling.classList.toggle('has-hide');
  }
  if (event.target.tagName==='SPAN'){
    const parent=event.target.parentElement;
  deleteTask(parent);

  }
})

basket.addEventListener('click',()=>{
  ulElement.classList.toggle('has-hide');
  tasksUl.classList.toggle('has-drop');

})
