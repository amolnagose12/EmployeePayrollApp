window.addEventListener('DOMContentLoaded', (event) => {
    const name = document.querySelector('#name');
    name.addEventListener('input', function() {
        if (name.value.length == 0) {
            setTextValue('.text-error',"");
            return;
        }
        try {
            (new EmployeePayrollData()).name = name.value;
            setTextValue('.text-error',"");
        } catch (e) {
            setTextValue('.text-error',e);
        }
    });

    const salary = document.querySelector("#salary");
    const output = document.querySelector('.salary-output');
    output.textContent = salary.value;
    salary.addEventListener('input', function() {
        output.textContent = salary.value;
    });

    const date = document.querySelector('#date');
    console.log(date);
    date.addEventListener('input',function(){
        let startDate = getInputValueById('#day')+" "+
                        getInputValueById('#month')+" "+
                        getInputValueById('#year');
        try{
            (new EmployeePayrollData()).startDate= new Date(Date.parse(startDate));
            setTextValue('.dates-error', "");
        }catch(e){
            setTextValue('.dates-error',e);
        }
    });

});

function save(event) {
    alert("save")

    event.preventDefault();
    event.stopPropagation();

    try {
       let employeePayrollData= createEmployeePayroll();
       createAndUpdateStorage(employeePayrollData);
        alert("Data Stored With name" + employeePayrollData.name);
    } catch (e) {
        return;
    }

}

const createEmployeePayroll=()=>{
    let employeePayrollData=new EmployeePayrollData();
    try {
        employeePayrollData.name=getInputValueById('#name');
    } catch (error) {
        setTextValue('.text-error',e);
        throw e;
    }

    employeePayrollData.profilePic=getSelectedValues('[name=profile]').pop();
    employeePayrollData.gender=getSelectedValues('[name=gender]').pop();
    employeePayrollData.department=getSelectedValues('[name=department]').pop();
    employeePayrollData.salary=getSelectedValues('#salary');
    employeePayrollData.note=getInputValueById('#notes');
    const startDate=getInputValueById('#day')+" "+getInputValueById('#month')+" "+
            getInputValueById('#year');
    employeePayrollData.startDate=new Date(Date.parse(startDate));
    alert(employeePayrollData.toString());
    return employeePayrollData;
}

const getSelectedValues=(propertyValue)=>{
    let allItmes=document.querySelectorAll(propertyValue);
    let selItems=[];
    allItmes.forEach(item =>{
        if(item.checked) selItems.push(item.value);
    });
    return selItems;
}

const getInputValueById=(id)=>{
    let value=document.querySelector(id).value;
    return value;
}

const getInputElementValue=(id)=>{
    let value=document.getElementById(id).value;
    return value;
}

function createAndUpdateStorage(employeePayrollData) {
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if (employeePayrollList == undefined) {
        employeePayrollList = [employeePayrollData];
    } else {
        employeePayrollList.push(employeePayrollData);
    }
    alert(employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollListList", JSON.stringify(employeePayrollList));
}

function resetButton() {
    setValue('#name', '');
    setValue('#salary', '400000');
    setValue('#notes', '');
    setValue('#day', '1');
    setValue('#month', 'January');
    setValue('#year', '2021');
    setTextValue('.text-error', '');
    setTextValue('.dates-error', '');
    unsetSelectedValues('[name=profile]');
    unsetSelectedValues('[name=gender]');
    unsetSelectedValues('[name=department]');
}

function setTextValue(id, value) {
    const textError = document.querySelector(id);
    textError.textContent = value;
}

function setValue(id, value) {
    let element = document.querySelector(id);
    element.value = value;
}

function unsetSelectedValues(propertyValue) {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        item.checked = false;
    });
}
const createId = () => {
    var id = localStorage.getItem("currentId");
    if (id == undefined) {
        localStorage.setItem("currentId", 1);
        return 2;
    } else {
        id = id + 1;
        localStorage.setItem("currentId", id);
        return id;
    }
};