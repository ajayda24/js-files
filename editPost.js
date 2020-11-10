//Constants
const table = document.querySelector('#table')
const tableID = document.querySelector('#table_id')
const database = document.querySelector('#database')
const tableEdit = document.querySelector('#editPost')
const editForm = document.querySelector('#formEdit')
const updateButton = document.querySelector('#updatePost')

//Get Post
function renderData(doc) {
  tr = document.createElement('tr')
  tdTime = document.createElement('th')
  tdTitle = document.createElement('th')
  tdVED = document.createElement('td')
  btnView = document.createElement('a')
  btnEdit = document.createElement('a')
  btnDelete = document.createElement('a')

  //attribute
  tr.setAttribute('data-id', doc.id)
  tdVED.setAttribute('class', 'tdVED')

  btnView.setAttribute('class', 'btn')
  btnView.setAttribute('target', '_blank')
  btnView.classList.add('btn-primary')
  btnView.classList.add('class', 'btn-view')
  btnView.setAttribute('href', `https://msttirur.gq/#/post/${doc.id}`)

  btnEdit.setAttribute('class', 'btn')
  btnEdit.classList.add('btn-warning')
  btnEdit.classList.add('class', 'btn-view')
  // btnEdit.setAttribute('onclick', 'editPost()')

  btnDelete.setAttribute('class', 'btn')
  btnDelete.classList.add('btn-danger')
  btnDelete.classList.add('class', 'btn-view')

  //text
  btnView.textContent = 'Read'
  btnEdit.textContent = 'Edit'
  btnDelete.textContent = 'Delete'

  tdTime.textContent = doc.data().time
  tdTitle.textContent = doc.data().title

  tdVED.appendChild(btnView)
  tdVED.appendChild(btnEdit)
  tdVED.appendChild(btnDelete)

  tr.appendChild(tdTime)
  tr.appendChild(tdTitle)
  tr.appendChild(tdVED)

  database.appendChild(tr)

  //Editing Data
  btnEdit.addEventListener('click', (e) => {
    e.stopPropagation()
    let docID = e.target.parentElement.parentElement.getAttribute('data-id')
    table.style.display = 'none'
    tableEdit.style.display = 'block'
    console.log(docID);
    db.collection('details')
      .doc(docID)
      .onSnapshot((doc) => {
        editForm.uTitle.value = doc.data().title
        editForm.uContent.value = doc.data().content
      })
      updateButton.addEventListener('click', (e) => {
        e.stopPropagation()
        bootbox.confirm({
          title: 'Update this Post?',
          message:
            'Do you want to Update this Post now?',
          buttons: {
            cancel: {
              label: '<i class="fa fa-times"></i> Cancel',
            },
            confirm: {
              label: '<i class="fa fa-check"></i> Update',
            },
          },
          callback: function (result) {
            console.log('This was logged in the callback: ' + result)
            if (result) {
              db.collection('details').doc(docID).update({
                title: editForm.uTitle.value,
                content: editForm.uContent.value,
              })
              setTimeout(() => {
                location.reload()
              }, 1000)
            }
          },
        })
      })
  })


  //Deleting Data
  btnDelete.addEventListener('click', (e) => {
    e.stopPropagation()
    let docID = e.target.parentElement.parentElement.getAttribute('data-id')
    bootbox.confirm({
      title: 'Delete this Post?',
      message: 'Do you want to delete this Post now? This cannot be undone.',
      buttons: {
        cancel: {
          label: '<i class="fa fa-times"></i> Cancel',
        },
        confirm: {
          label: '<i class="fa fa-check"></i> Delete',
        },
      },
      callback: function (result) {
        console.log('This was logged in the callback: ' + result)
        if (result) {
          db.collection('details').doc(docID).delete()
          setTimeout(() => {
            location.reload()
          }, 500)
        }
      },
    })
  })
}

db.collection('details').onSnapshot((snapshot) => {
  let changes = snapshot.docChanges()
  changes.forEach((change) => {
    if (change.type == 'added') {
      renderData(change.doc)
      
    } else if(change.type == 'removed'){
      let tr = database.querySelector('[data-id='+change.doc.id+']');
      database.removeChild(tr);
      
    }
    $(document).ready(function () {
      $('#table_id').DataTable()
    })
    
  })
})


//Edit Post
// function editPost(){
// table.style.display = 'none'

// }
// function updateData(id) {
//   //  db.collection('details').doc(docID)
//   alert('Update changes'+"  " + id)
// }