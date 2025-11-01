document.body.addEventListener('click', ({target}) => {
  if (target.dataset.type === "remove") {
    const id = target.dataset.id

    remove(id).then(() => {
      target.closest("li").remove()
    })
  } else if (target.dataset.type === "edit") {
    const id = target.dataset.id
    const newTitle = prompt('Введите новое название')

    if (newTitle) {
      edit(id, newTitle).then(() => {
        target.closest("li").firstChild.nodeValue = newTitle
      })
    }
  }
})

async function remove(id) {
  await fetch(`/${id}`, {
    method: 'DELETE'
  })
}

async function edit(id, newTitle) {
  const data = JSON.stringify({
    id,
    title: newTitle
  })

  await fetch(`/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: data
  })
}