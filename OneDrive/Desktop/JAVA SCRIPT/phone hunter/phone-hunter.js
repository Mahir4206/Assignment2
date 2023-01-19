const loadData = async (dynamic, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${dynamic}`;
    const fetchData = await fetch(url)
    const res = await fetchData.json()
    getData(res.data, dataLimit)
}

const getData = (data, dataLimit) => {
    const getCards = document.getElementById('card-container')
    getCards.innerHTML = ``;

    // all phones show

    const btnShow = document.getElementById('btn-show')
    if (dataLimit && data.length > 10) {
        data = data.slice(0, 10)
        btnShow.classList.remove('d-none')
    }
    else {
        btnShow.classList.add('d-none')
    }

    // warning show

    const warning = document.getElementById('warning-field')
    if (data.length === 0) {
        warning.classList.remove('d-none')
    }
    else {
        warning.classList.add('d-none')
    }

    data.forEach(element => {
        // console.log(element)
        const createDiv = document.createElement('div')
        createDiv.classList.add('col')
        createDiv.innerHTML = `
        <div class="card p-4">
            <img src="${element.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${element.phone_name}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in
                to additional content. This content is a little bit longer.</p>
                <button onclick="showDetails('${element.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">show details</button>
            </div>
        </div>
        `
        getCards.appendChild(createDiv)
    });
    // end loader
    toggoleLoader(false)
}

const fn = (dataLimit) => {
    // start loader
    toggoleLoader(true)
    const getInput = document.getElementById('input-field')
    const getInputValue = getInput.value;
    loadData(getInputValue, dataLimit);
    // getInput.value = ``;
}


document.getElementById('btn-placement').addEventListener('click', function () {
    fn(10)
})

document.getElementById('btn-show-all').addEventListener('click', function () {
    fn()
})

document.getElementById('input-field').addEventListener('keypress', function (event) {
    // console.log(event.key)
    if (event.key === "Enter") {
        fn(10)
    }
})

const toggoleLoader = isLoading => {
    const getLoader = document.getElementById('loader')
    if (isLoading) {
        getLoader.classList.remove('d-none')
    }
    else {
        getLoader.classList.add('d-none')
    }
}

// show details:

const showDetails = async (details) => {
    const url = `https://openapi.programming-hero.com/api/phone/${details}`;
    const getFetchDetails = await fetch(url)
    const convertToJson = await getFetchDetails.json()
    console.log(convertToJson)
}
