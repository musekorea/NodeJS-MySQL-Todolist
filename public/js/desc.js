const delBtn = document.querySelector('#delBtn');
const editBtn = document.querySelector('#editBtn');
const doneBtn = document.querySelector('#doneBtn');
const editForm = document.querySelector('#editForm');
const editInput = document.querySelector('input');
const h1 = document.querySelector('h1');

delBtn.addEventListener('click', async () => {
  const delID = delBtn.parentElement.id;
  try {
    const delFetch = await fetch(`http://localhost:8080/description/${delID}`, {
      method: 'DELETE',
    });
    console.log(typeof delFetch.status);
    if (delFetch.status === 200) {
      window.location.href = `http://localhost:8080/list`;
    }
  } catch (error) {
    console.log(error);
  }
});

editBtn.addEventListener('click', (e) => {
  editForm.classList.remove('hide');
  editBtn.parentElement.classList.add('hide');
  console.log(e);
});

doneBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  const currentURL = window.location.href;
  const id = currentURL.split('/')[4];
  const value = e.target.parentElement[0].value;
  try {
    const editFetch = await fetch(`/description/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ value }),
    });
    if (editFetch.status === 200) {
      editForm.classList.add('hide');
      editBtn.parentElement.classList.remove('hide');
      document.querySelector('p').innerHTML = value;
    }
  } catch (error) {
    console.log(error);
  }
});
