// global variable
const cardArea = document.getElementById("card-area");
const showingTotalPhoneCount = document.getElementById("showingTotalPhoneCount");
const phoneNotAvailable = document.getElementById('phone_not_avabile');

// get  Phnone name using serach and connect with server
const searchPhone = () => {
  const searchField = document.getElementById("search-input");
  cardArea.textContent = "";
  showingTotalPhoneCount.textContent = "";
  phoneNotAvailable.textContent = '';
  const searchText = searchField.value;
  searchField.value = "";
  document.getElementById("phoneDetails").textContent = "";
  // spin or preloader on
  const bookLoading = document.getElementById("spinner");
  bookLoading.innerHTML = `
      <div class="spinner-border text-info m-auto" role="status">
          <span class="visually-hidden">Loading...</span>
      </div>
    `;

  //  api connection
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      displayPhoneResult(
        data.data,
        data.data.length,
        data.data.slice(0, 20),
        searchText
      );
    });
};

// display all phones
const displayPhoneResult = (phones, totalPhone, customlength, searchText) => {
  if (searchText == "") {
    // spiner or preloader off
    const showTitle = document.getElementById("spinner");
    showTitle.innerHTML = "";

    //if input is null then show this error messeage
    document.getElementById("phone_not_avabile").style.marginTop = '1rem';
    document.getElementById("phone_not_avabile").innerText =
      "please, enter a phone name🥺";
  } else {
    document.getElementById("showingTotalPhoneCount").innerHTML = `
  <div class="text-center text-white">
    <span class="fw-bold">Total Results:</span> ${totalPhone},
    <span class="fw-bold">Visible Results:</span> ${customlength.length}
  </div>`;

    const PhoneNotAvaileId = document.getElementById("phone_not_avabile");
    PhoneNotAvaileId.textContent = "";
    cardArea.textContent = "";

    if (phones.length === 0) {
      PhoneNotAvaileId.style.marginTop = '1rem';
      PhoneNotAvaileId.innerText = "no result found ☹️";
    } else {
      cardArea.textContent = "";
      customlength.forEach((phone) => {
        //for  Create a card
        const div = document.createElement("div");
        div.innerHTML = `
      <div class="col " >
        <div class="card rounded shadow p-5">
          <img src="${phone.image}" class="card-img-top w-75 mx-auto" alt="...">
          <div class="card-body text-center">
            <h5 class="card-title fw-bold">${phone.phone_name}</h5>
            <p class="card-text">Brand:${phone.brand}</p>
            <a href="#" onclick="PhoneInfomation('${phone.slug}')" class="btn btn-success mx-auto">Show Details</a>
          </div>
        </div>
      </div>
      `;
        cardArea.appendChild(div);
      });
    }

    // spiner or preloader finally off
    const showTitle = document.getElementById("spinner");
    showTitle.innerHTML = "";
  }
};

// phone information api get by phone
const PhoneInfomation = (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => displayPhoneDetails(data.data));
};

// for display phone full info
const displayPhoneDetails = (details) => {
  const detailSection = document.getElementById("phoneDetails");
  detailSection.textContent = "";
  const detailDiv = document.createElement("div");
  detailDiv.innerHTML = `
    
  <div class="product-detail rounded shadow">
      <div class="product-detail-left">
          <img src="${details.image}" class="img-fluid">
          <h4 class="text-primary">${details.name}</h4>
          <p class="text-danger text-center">${details.releaseDate ? details.releaseDate : "No Release Date !!!"
    }</p>
      </div>

      <div class="product-detail-middle">
          <h5 ><b><u>Main Features:</u></b> </h5>
          <p><b>Storage: </b><span>${details.mainFeatures.storage}</span></p>
          <p><b>Display Size: </b><span>${details.mainFeatures.displaySize
    }</span></p>
          <p><b>Chipset: </b><span>${details.mainFeatures.chipSet}</span></p>
          <p><b>Memory: </b><span>${details.mainFeatures.memory}</span></p>
          <p><b>Sensors: </b><span>${details.mainFeatures.sensors}</span></p>
      </div>

      <div class="product-detail-right">
          <h5><b><u>Other Features:</u></b> </h5>
          <p><b>WLAN: </b><span>${details.others ? details.others.WLAN : "No Information!"
    }</span></p>
          <p><b>Bluetooth: </b><span>${details.others ? details.others.Bluetooth : "No Information !"
    }</span></p>
          <p><b>GPS: </b><span>${details.others ? details.others.GPS : "No Information !"
    }</span></p>
          <p><b>NFC: </b><span>${details.others ? details.others.NFC : "No Information !"
    }</span></p>
          <p><b>Radio: </b><span>${details.others ? details.others.Radio : "No Information !"
    }</span></p>
          <p><b>USB: </b><span>${details.others ? details.others.USB : "No Information !"
    }</span></p>
      </div>
  </div>
`;
  detailSection.appendChild(detailDiv);
};
