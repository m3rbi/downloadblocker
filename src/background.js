const blockedReferrersContain = [
    "google.com"
]

function shouldBlockReferrer(referrer) {
    return blockedReferrersContain.some(function (value, index, array) {return referrer.search(value) > 0})
}

async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

async function blockDownload(downloadItem) {
    chrome.downloads.cancel(downloadItem.id)
    
    let tab = await getCurrentTab()
    chrome.tabs.sendMessage(tab.id, {action: "bgcolor", color: "red"})
}

chrome.downloads.onDeterminingFilename.addListener(
    async function(item, suggest) {
        suggest()
        console.log(item.referrer)
        if (!shouldBlockReferrer(item.referrer)) {
            console.log("not blocking")
            return
        }

        console.log("blocking")
        await blockDownload(item)
    }
)
