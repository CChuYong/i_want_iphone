const model = 'MU793KH/A'; //model name
const interval = 16; //seconds

let onceUponATime = 0;
let lastStockDescription = null;

async function retrieveCurrentStatus() {
    const currentTime = currentTimeMillis();
    const result = await fetch(`https://www.apple.com/kr/shop/retail/pickup-message?pl=true&searchNearby=true&store=R747&parts.0=${model}&_=${currentTime}`)

    const json = await result.json();
    const stores = json.body.stores;

    console.clear();
    console.log(`현재시간: ${Date()}`)
    console.log(`언젠가 재고가 있어진 카운트: ${onceUponATime}`)
    console.log('');
    stores.forEach((store) => {
        const storeName = store.storeName;
        const pickupDisplay = store.partsAvailability[model].pickupDisplay;
        console.log(`${storeName} -> ${pickupDisplay === 'available' ? '\x1b[32m재고 있음\x1b[0m' : '\x1b[31m재고 없음\x1b[0m'}`)

        if(pickupDisplay === 'available') {
            onceUponATime++;
            lastStockDescription = `${storeName}에서 ${Date()}에 있었음.`
        }
    });
    console.log('')
    if(lastStockDescription) {
        console.log(lastStockDescription);
    }
}

retrieveCurrentStatus();
setInterval(() => {
    retrieveCurrentStatus()
}, 1000 * interval);

function currentTimeMillis() {
    return new Date().getTime();
}
