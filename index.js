let dataEl = document.getElementById('data-el')
let listEl = document.getElementById('list-el')
let list = []

function handleSubmit() {
    if (!dataEl) return

    const value = dataEl.value.trim()
    if (value === '') return

    list.push(value)
    dataEl.value = ''
    readListItems()
}

function readListItems() {
    // clear current list to avoid duplicate entries when re-rendering
    listEl.innerHTML = ''

    if (list.length !== 0) {
        for (let i = 0; i < list.length; i++) {
            // escape values to avoid breaking attributes
            const safe = escapeHtml(list[i])
            listEl.innerHTML += `<li>` +
                `<button class="list-btn" onclick='handleUpdate(${i})'>Update</button>` +
                `<input type="text" value="${safe}" />` +
                `<button class="list-btn" onclick='handleDelete(${i})'>X</button>` +
                `</li>`
        }
    }
}


function handleDelete(id) {
    // coerce id (inline onclick may pass string)
    const idx = Number(id)
    if (!Number.isFinite(idx) || idx < 0 || idx >= list.length) return

    // remove the item from the array
    list.splice(idx, 1)

    // re-render the list
    readListItems()
}

// minimal update handler so Update button doesn't throw
function handleUpdate(id) {
    const idx = Number(id)
    if (!Number.isFinite(idx) || idx < 0 || idx >= list.length) return

    const li = listEl.children[idx]
    if (!li) return

    const input = li.querySelector('input[type="text"]')
    if (!input) return

    const newVal = input.value.trim()
    if (newVal === '') return

    list[idx] = newVal
    readListItems()
}

function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
}
