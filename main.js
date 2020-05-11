// 建立產品物件函式
function Bakery(name) {
  this.name = name
}
// 建立產品物件函式

// 產品對應金額函式

Bakery.prototype.price = function () {

  switch (this.name) {
    case '手工蛋糕':
      return 70
    case '虎掌燒':
      return 50
    case '生日蛋糕':
      return 500
    case '布丁燒':
      return 50
    case '手工麵包':
      return 60
    case '繪圖餅乾':
      return 30
    case '結婚小點':
      return 90
    case '節慶禮盒':
      return 120
    default:
      alert('No this Bakery')
  }
}
// 產品對應金額函式

// Pos函式庫

function Pos() { }

// Pos函式庫

// 獲得CheckedValue函式

Pos.prototype.getCheckedValue = function (inputName) {
  let selectedOption = ''
  document.querySelectorAll(`[name=${inputName}]`).forEach(function (item) {
    if (item.checked) {
      selectedOption = item.value
    }
  })
  return selectedOption
}

// 獲得CheckedValue函式

// 把產品加入左方清單列函式
const orderLists = document.querySelector('[data-order-lists]') // 抓[data-order-lists]節點
Pos.prototype.addBakery = function (bakery) {
  let orderListsCard = `
  <div class="card mb-3" style="width:100%;">
          <div class="card-body pt-3">
            <!-- delete drink icon -->
            <div class="text-right">
              <span data-pos="delete-drink">×</span>
            </div>
            <!-- /delete drink icon -->
            <img class="card-img-top" src="images/${bakery.name}.jpg" alt="${bakery.name}">
            <div class="card-title mb-1">${bakery.name}</div>
            <div class="card-footer text-right">
              <div class="card-text text-muted">
                $ <span data-bakery-price>${bakery.price()}</span>
              </div>
            </div>
          </div>
        </div>
  `
  orderLists.insertAdjacentHTML('afterbegin', orderListsCard)
}

// 把產品加入左方清單列函式

// 刪除orderListCard函式
Pos.prototype.deleteBakery = function (target) {
  target.remove()
}
// 刪除orderListCard函式

// checkout函式－計算總金額
Pos.prototype.checkout = function () {
  let totalFee = 0
  document.querySelectorAll('[data-bakery-price]').forEach(function (bakery) {
    totalFee += Number(bakery.textContent)
  })
  return totalFee
}
// checkout函式-計算總金額

// checkout函式－清空訂單
Pos.prototype.clearOrder = function (target) {
  target.querySelectorAll('.card').forEach(function (card) {
    card.remove()
  })
}

// checkout函式－清空訂單


const pos = new Pos() // new the Pos Instance
// ADD鍵
const addDrinkButton = document.querySelector('[data-pos="add-bakery"]')
addDrinkButton.addEventListener('click', function () {
  // 1. 取得店員選擇的產品品項內容
  const bakeryName = pos.getCheckedValue('bakery')
  console.log(`${bakeryName}`)
  // 1. 取得店員選擇的產品品項內容
  // 2. 若沒選取要提出警告通知
  if (!bakeryName) {
    alert('Please choose at least one item.')
    return
  }
  // 2. 若沒選取要提出警告通知
  // 3. 建立產品資料實例
  const bakery = new Bakery(bakeryName)
  console.log(bakery)
  console.log(bakery.price())
  // 3. 建立產品資料實例
  // 4. 將產品實例產生成左側訂單區的畫面
  pos.addBakery(bakery)
  // 4. 將產品實例產生成左側訂單區的畫面


})
// ADD鍵

// 刪除鍵
orderLists.addEventListener('click', function (event) {
  let isDeleteButton = event.target.matches('[data-pos="delete-drink"]')

  if (!isDeleteButton) {
    return
  }
  pos.deleteBakery(event.target.parentElement.parentElement.parentElement)
})
// 刪除鍵

// checkout鍵

const checkoutButton = document.querySelector('[data-pos="checkout"]')
checkoutButton.addEventListener('click', function () {
  // 1. 計算訂單總金額
  alert(`Total amount of product：$${pos.checkout()}`)
  // 2. 清空訂單
  pos.clearOrder(orderLists)
})

// checkout鍵








