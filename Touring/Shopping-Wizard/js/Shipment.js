let minDate = new Date();
let maxDate = new Date();
        const months = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

class Shipment {
    constructor() {
        this.type = '';
        this.cost = 0;
        this.isGift = false;
        this.titleGift = '';
        this.messageGift = '';
        this.imageGift = null;
    }

    submitShipment = (e) => {
        e.preventDefault();
        let type = null;
        const radioButtons = document.getElementsByName('radioShipType').forEach(el => {
            if (el.checked) {
                type = el.id;
                this.type = type;
            }
        });
        switch (type) {
            case 'freeShipment':
                this.cost = 0;
                break;
            case 'extraShipment':
                this.cost = 5;
                break;
            case 'premiumShipment':
                this.cost = 10;
                break;
        }

        const isGift = document.getElementById('isGift').checked;
        if (isGift) {
            this.isGift = true;
            this.titleGift = document.getElementById('giftTitle').value;
            this.messageGift = document.getElementById('giftMessage').value;
            this.imageGift = document.getElementById('giftImageFile').files[0];
        } else {
            this.isGift = false;
        }

        assignConfirmHtmlValues();
        changeDomToNextForm('ship', 'confirm');
    }

    chooseShipmentType = (event) => {
        dateShip.classList.add('visible-date');
        const hours = event.target.value;
        const now = new Date();

        switch (hours) {
            case '72':
                minDate.setDate(now.getDate() + 3);
                maxDate.setDate(now.getDate() + 4);
                break;
            case '48':
                minDate.setDate(now.getDate() + 2);
                maxDate.setDate(now.getDate() + 3);
                break;
            case '24':
                minDate.setDate(now.getDate() + 1);
                maxDate.setDate(now.getDate() + 2);
                break;
        }
        document.getElementById('minDate').style.fontWeight = 'bold';
        document.getElementById('maxDate').style.fontWeight = 'bold';
        document.getElementById('minDate').textContent = `${minDate.getDate()} de ${months[minDate.getMonth()]} de ${minDate.getFullYear()}`;
        document.getElementById('maxDate').textContent = `${maxDate.getDate()} de ${months[maxDate.getMonth()]} de ${maxDate.getFullYear()}`;
    }

    toggleGiftOptions = (event) => {
        if (event.target.checked) {
            giftOptions.classList.add('visible');
        } else {
            giftOptions.classList.remove('visible');
        }
    }

    resetShipment() {
        this.type = '';
        this.cost = 0;
        this.isGift = false;
        this.titleGift = '';
        this.messageGift = '';
        this.imageGift = null;
        dateShip.classList.remove('visible-date');

    }
}

// button submit custom

const realFileBtn = document.getElementById("giftImageFile");
const customBtn = document.getElementById("giftImageFile-button");
const customTxt = document.getElementById("custom-text");

customBtn.addEventListener("click", function() {
  realFileBtn.click();
});

realFileBtn.addEventListener("change", function() {
  if (realFileBtn.value) {
    customTxt.innerHTML = realFileBtn.value.match(
      /[\/\\]([\w\d\s\.\-\(\)]+)$/
    )[1];
  } else {
    customTxt.innerHTML = "No file chosen, yet.";
  }
});
