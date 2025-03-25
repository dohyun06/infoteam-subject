const title = document.querySelector('#title');
const content = document.querySelector('#content');
let id = undefined;

document.addEventListener('DOMContentLoaded', async () => {
  const res = await fetch(window.location.href + '/post');
  const data = await res.json();

  id = data.id;
  title.value = data.title;
  content.value = data.content;
});

document.querySelector('form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const res = await fetch(window.location.href + '/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title: title.value, content: content.value }),
  });

  const result = await res.json();
  console.log(result);
});
