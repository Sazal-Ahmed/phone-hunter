const loadPhone = async(searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
   dispalyPhones(phones, isShowAll);

}
const dispalyPhones = (phones, isShowAll) =>{
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';

    //display show all button
    const showAll = document.getElementById('show-all');
    if(phones.length > 6 && !isShowAll){
      showAll.classList.remove('hidden');
    }
    else{
      showAll.classList.add('hidden');
    }

    //display only first 6 phones if not show all
    if(!isShowAll){
      phones = phones.slice(0,6);
    }

    phones.forEach(phone => {
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card p-4 bg-gray-200 shadow-xl`;
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phone.phone_name}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-center">
            <button onclick ="handleShowDetail('${phone.slug}');" class="btn btn-primary">Show Details</button>
          </div>
        </div>
                                `;
        phoneContainer.appendChild(phoneCard);
    });

    //hide loading spinner
    toggleLoading(false);
}

// handle ShowDetails

const handleShowDetail = async (id) =>{

 const res = await fetch (`https://openapi.programming-hero.com/api/phone/${id}`);
 const data = await res.json();
 const phone = data.data;
 showPhoneDetails(phone);

}

const showPhoneDetails = (phone) =>{
  console.log(phone)
const phoneName = document.getElementById('phone-name');
phoneName.innerText = phone.name;

const ShowDetailsContainer = document.getElementById('show details-contsiner');
ShowDetailsContainer.innerHTML = `
<img src="${phone.image}" alt="" >
<p class="mt-4"><span class ="text-xl text-red-50">Storage:</span> ${phone?.mainFeatures?.storage}</p>
<p><span class ="text-xl text-red-50">GPS:</span> ${phone?.others?.GPS}</p>
<p><span class ="text-xl text-red-50">ChipSet:</span> ${phone?.mainFeatures?.chipSet}</p>
<p ><span class ="text-xl text-red-50">DisplaySize:</span> ${phone?.mainFeatures?.displaySize}</p>
<p><span class ="text-xl text-red-50">USB:</span> ${phone?.others ?.USB}</p>
<p><span class ="text-xl text-red-50">WLAN:</span> ${phone?.others ?.WLAN}</p>
      `;
  //show the modal
  my_modal.showModal();

}

//handle search button
const handleSearch = (isShowAll) =>{
  toggleLoading(true);
  const searchField = document.getElementById('search-filed');
  const searchText = searchField.value;
  loadPhone(searchText, isShowAll);

}

// const handleSearchtwo = () => {
//   toggleLoading(true);
//   const serachField = document.getElementById('search-field2');
//   const searchText = serachField.value;
//   loadPhone(searchText);
// }

const toggleLoading = (isLoading) =>{
  const loadingSpinner = document.getElementById('loading-spinner');
  if(isLoading){
    loadingSpinner.classList.remove('hidden');
  }
  else{
    loadingSpinner.classList.add('hidden');
  }
}

// Show all button

const handleShowall = () =>{
  handleSearch(true);
}
// loadPhone();