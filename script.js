const tableKey = 'cms-table';

let cmsTable;
let cmsTableDemo = {
    'Shikhar Asthana': {
        'phone': '72451574235'
    },
    'Castiel Gabriel':{
        'phone': '54654654464'
    }

};

let enableDisableNameInput = (option) => {
    let newPersonName = document.getElementById('newPersonName');

    if(option === 'enable')
        newPersonName.disabled = false;
    else if(option === 'disable')
        newPersonName.disabled = true;

}

let refreshDOMTable = () => {

    
    let cmsTableKeys = Object.keys(cmsTable);
    let tableContainer = document.getElementById('tableContainer');
    let oldTableBody = document.getElementById('tableBody');
    tableContainer.removeChild(oldTableBody);

    let newTableBody = document.createElement('span');
    newTableBody.id = 'tableBody';
    tableContainer.appendChild(newTableBody);

    for (let i=0; i < cmsTableKeys.length; i++) {

        let currentRow = document.createElement('div');
        let currentNameCol = document.createElement('div');
        let currentPhoneCol = document.createElement('div');
        let currentEditBtn = document.createElement('div');
        let currentDeleteBtn = document.createElement('div');

        currentRow.className = 'table-row';
        currentNameCol.className = 'table-column Name';
        currentPhoneCol.className = 'table-column Phone';
        currentEditBtn.className = 'table-column Edit';
        currentDeleteBtn.className = 'table-column Delete';

        currentNameCol.innerHTML = cmsTableKeys[i];
        currentPhoneCol.innerHTML = cmsTable[cmsTableKeys[i]].phone;

        currentEditBtn.innerHTML = '<i class="fas fa-edit"></i>';
        currentDeleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
        
        currentRow.appendChild(currentNameCol);
        currentRow.appendChild(currentPhoneCol);
        currentRow.appendChild(currentEditBtn);
        currentRow.appendChild(currentDeleteBtn);
        newTableBody.appendChild(currentRow);
    }

    let enableDisableNewUserModal = (option) => {
        let newPersonName = document.getElementById('NewPersonName');
        let newPersonPhone = document.getElementById('NewPersonPhone');
        newPersonName.value = '';
        newPersonPhone.value = '';

        let newPersonModal = document.getElementById('newPersonModal');
        let backdrop = document.getElementById('backdrop');

        newPersonModal.className = `${option}-modal`;
        backdrop.className = `${option}-modal`;

    }

    let addNewEntryBtn = document.getElementById('AddNewEntry');
    let editBtns = document.getElementsByClassName('Edit');
    let deleteBtns = document.getElementsByClassName('Delete');

    let newPersonSubmitBtn = document.getElementById('newPersonSubmitBtn');
    let newPersonCancelBtn = document.getElementById('newPersonCancelBtn');

    newPersonSubmitBtn.addEventListener('click', () => {
        let newPersonName = document.getElementById('NewPersonName').value.trim();
        let newPersonPhone = document.getElementById('NewPersonPhone').value.trim();

        if(newPersonName === '')
            document.getElementById('NewPersonName').className = 'input-err';
        else 
            document.getElementById('NewPersonName').className = '';

        if(newPersonPhone === '')
            document.getElementById('NewPersonPhone').className = 'input-err';
        else 
            document.getElementById('NewPersonPhone').className = '';

        if(newPersonName !== '' && newPersonPhone !== ''){
            let newPerson = {};
            cmsTable[newPersonName] = {
                'phone': newPersonPhone
            }
            localStorage.setItem(tableKey, JSON.stringify(cmsTable));
            enableDisableNewUserModal('disable');
            refreshDOMTable();
        }
    });
    
    newPersonCancelBtn.addEventListener('click', () => {
        enableDisableNewUserModal('disable');
    })

    addNewEntryBtn.addEventListener('click', () => {
        enableDisableNewUserModal('enable');

    });

    for(let i = 0; i < editBtns.length; i++){
        editBtns[i].addEventListener('click', ($event) => {
            let nameToEdit = $event.target.parentElement.children[0].innerText;
            let personToEdit = cmsTable[nameToEdit];

            enableDisableNewUserModal('enable');

            let newPersonName = document.getElementById('NewPersonName');
            let newPersonPhone = document.getElementById('NewPersonPhone');

            newPersonName.value = nameToEdit;
            newPersonPhone.value = personToEdit.phone;

            enableDisableNameInput('disable');
        })
    }

    for(let i = 0; i < deleteBtns.length; i++){
        deleteBtns[i].addEventListener('click', ($event) => {
            let nameToDelete = $event.target.parentElement.children[0].innerText;
            let isSure = window.confirm('Permanently Delete this phone record ' + nameToDelete + '?');

            if(isSure){
                deleteUserFromTable(nameToDelete);
            }

        })
    }
}

let deleteUserFromTable = (userName) => {
    let tempTable = {};
    let cmsTableKeys = Object.keys(cmsTable);

    for(let i = 0; i < cmsTableKeys.length; i++ ){
        if(userName !== cmsTableKeys[i]){
            tempTable[cmsTableKeys[i]] = cmsTable[cmsTableKeys[i]];
        }
    }

    cmsTable = tempTable;
    localStorage.setItem(tableKey, JSON.stringify(cmsTable));
    refreshDOMTable();
}

let init = () => {

    if(localStorage.getItem(tableKey)){
        cmsTable = JSON.parse(localStorage.getItem(tableKey));
    } else {
        cmsTable = cmsTableDemo;
        localStorage.setItem(tableKey, JSON.stringify(cmsTable));
    }

    refreshDOMTable();

}

init();

