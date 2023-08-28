const loadPhone = async(searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
   dispalyPhones(phones);

}
const dispalyPhones = phones =>{
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';
    phones.forEach(phone => {
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card p-4 bg-gray-200 shadow-xl`;
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phone.phone_name}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary">Buy Now</button>
          </div>
        </div>
                                `;
        phoneContainer.appendChild(phoneCard);
    });
}
//handle search button
const handleSearch = () =>{
  const searchField = document.getElementById('search-filed');
  const searchText = searchField.value;
  console.log(searchText);
  loadPhone(searchText);

}
// loadPhone();