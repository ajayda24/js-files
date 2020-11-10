var today = new Date()
var dd = String(today.getDate()).padStart(2, '0')
var mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
var yyyy = today.getFullYear()
today = mm + '/' + dd + '/' + yyyy

form.currentTime.value = today

//Add Post
function addData() {
  db.collection('details').add({
    title: form.title.value,
    content: form.content.value,
    time: form.currentTime.value,
  })
  form.title.value = ''
  form.content.value = ''
  form.currentTime.value = ''

  setTimeout(function () {
    window.location.href = 'Edit-Post.html'
    // location.reload()
  }, 1000)
}

