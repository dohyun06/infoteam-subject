const title = document.querySelector('#title').value;
const content = document.querySelector('#content').value;

document.querySelector('form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = document.querySelector('#title').value;
  const content = document.querySelector('#content').value;

  const res = await fetch('/post/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title: title, content: content }),
  });

  const result = await res.json();
  console.log(result);
});
