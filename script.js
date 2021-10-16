const card_container = document.querySelector('.main__users');
const sort_by_select = document.querySelector('.sort-by-select');
const api_url = 'https://reqres.in/api/users';


sort_by_select.addEventListener('change', e => {
    switch (e.target.selectedIndex) {
        case 0:
        	fetchApiData('id');
            break;
        case 1:
        	fetchApiData('name');
            break;
    }
})

async function fetchApiData(sort_by) {
    try {
        const res = await fetch(api_url);
        const data = await res.json();
        const users = data.data;

    if (sort_by && sort_by === 'name') {
        users.sort(sortByFirstName);
    } else if (sort_by && sort_by === 'id') {
    	users.sort(sortById);
    }

        showUsers(users);
    } catch (err) {
        console.log(err);
    }
}

function showUsers(users) {
    card_container.innerHTML = '';
    for (let user of users) {
        renderCard(user);
    }
}

function renderCard(data) {
    let p = '';
    let { id, avatar, first_name, last_name, email } = data;
    p = `
  <div class="card">
    <figure>
      <img src="${avatar}" alt="" class="card__image">
    </figure>
    <div class="card__body">
      <ul class="card__list">
        <li class="card__list-item">
          <span class="strong">Id:</span> 
          ${id}
          </li>
        <li class="card__list-item">
          <span class="strong">Name:</span> 
          ${first_name} ${last_name}
        </li>
        <li class="card__list-item">
          <span class="strong">Email:</span> 
          ${email}
        </li>
      </ul> 
    </div>
  </div>
`;
    card_container.insertAdjacentHTML('beforeend', p);
}

function sortByFirstName(a, b) {
    return (a.first_name > b.first_name) ? 1 :
        ((a.first_name < b.first_name) ? -1 : 0);
}

function sortById(a, b) {
    return (a.id > b.id) ? 1 :
        ((a.id < b.id) ? -1 : 0);
}

fetchApiData();