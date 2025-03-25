const postList = document.querySelector('.post-list');

document.addEventListener('DOMContentLoaded', async () => {
  const res = await fetch(window.location.href + '/data');
  const datas = await res.json();

  datas.map(async (data) => {
    const id = data.id;
    const title = data.title;
    const content = data.content;

    const post = document.createElement('div');
    post.className = 'post';
    const postContent = document.createElement('div');
    postContent.className = 'post-content';
    const h2Title = document.createElement('h2');
    h2Title.innerText = title;
    const pContent = document.createElement('p');
    pContent.textContent = content;
    const postActions = document.createElement('div');
    postActions.className = 'post-actions';
    const btnEdit = document.createElement('button');
    btnEdit.className = 'btn edit-btn';
    btnEdit.textContent = '수정';
    const btnDel = document.createElement('button');
    btnDel.className = 'btn delete-btn';
    btnDel.textContent = '삭제';

    postList.append(post);
    post.appendChild(postContent);
    post.appendChild(postActions);
    postContent.appendChild(h2Title);
    postContent.appendChild(pContent);
    postActions.appendChild(btnEdit);
    postActions.appendChild(btnDel);

    btnEdit.addEventListener('click', () => {
      window.location.href = window.location.origin + '/update/' + id;
    });

    btnDel.addEventListener('click', async () => {
      const resDel = await fetch(window.location.href + '/delete/' + id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id }),
      });
      console.log(await resDel.json());
    });
  });

  document.querySelector('.add-button').addEventListener('click', () => {
    window.location.href = window.location.origin + '/post';
  });
});
