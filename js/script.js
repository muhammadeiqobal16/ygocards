// let url = `https://db.ygoprodeck.com/api/v7/cardinfo.php`;
let ex = `https://ygoprodeck.com/card-database/?&fname=magician&desc=magician&sort=name&num=24&offset=0`

const searchBtn = document.querySelector(`.search-button`);
searchBtn.addEventListener(`click`, function(){

    const inputKeyword = document.querySelector(`.input-keyword`);
    fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?&fname=${inputKeyword.value}&desc=${inputKeyword.value}&sort=name`)
        .then(response => response.json()).then(result => {
            let cardResult = result.data;
            console.log(cardResult)
            let cards = ``;
            cardResult.forEach(card => {
                cards += showCard(card);
            });
            const cardsContainer = document.querySelector(`.cards-container`);
            cardsContainer.innerHTML = cards;

            const cardImages = document.querySelectorAll(`.card img`);
            cardImages.forEach(cardImage => {
                cardImage.addEventListener(`click`, function(){
                    const cardid = this.dataset.cardid;
                    fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${cardid}`)
                        .then(response => response.json()).then(result => {
                            const cardDetails = result.data[0];
                            console.log(cardDetails);

                            const modalContent = showModalContent(cardDetails);

                            const modalBody = document.querySelector(`.modal-body`);
                            modalBody.innerHTML = modalContent;
                        });
                });
            });
        })
});

function showCard(card){
    return `<div class="col-4 col-md-2 mb-3">
                <div class="card" type="button">
                    <img src="${card.card_images[0].image_url}" class="card-img-top" alt="${card.name}" data-bs-toggle="modal" data-bs-target="#cardsModal" data-cardid="${card.id}">
                </div>
            </div>`
}

function showModalContent(cardDetails){
    return `<div class="container-fluid">
                <div class="row">
                <div class="col-12 col-sm-4">
                    <img src="${cardDetails.card_images[0].image_url}" class="card-img-top" alt="">
                </div>
                <div class="col">
                    <table class="table">
                        <thead>
                            <tr>
                                <th colspan="3"><h3>${cardDetails.name}</h3></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td scope="col"><strong>Type:</strong><br>${cardDetails.type}</td>
                                <td scope="col"><strong>Attribute:</strong><br>${cardDetails.attribute}</td>
                                <td scope="col"><strong>Typing:</strong><br>${cardDetails.race}</td>
                            </tr>
                            <tr>
                                <td scope="row"><strong>Level/Rank:</strong><br>${cardDetails.level}</td>
                                <td><strong>ATK:</strong><br>${cardDetails.atk}</td>
                                <td><strong>DEF:</strong><br>${cardDetails.def}</td>
                            </tr>
                            <tr>
                                <td scope="row" colspan="3"><strong>Archetype:</strong><br>${cardDetails.archetype}</td>
                            </tr>
                            <tr>
                                <td scope="row" colspan="3"><strong>Card Text:</strong><br>${cardDetails.desc}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                </div>
            </div>`
}