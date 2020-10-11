import Vue from 'vue'
import Router from 'vue-router'
let Login = () => import("@/views/login")
let Nav = () => import("@/components/nav")
let AccountManage = () => import("@/views/accountManage")

let BusinessList = () => import("@/views/business/businessList")
let PurchaseList = () => import("@/views/business/purchaseList")
let SaleList = () => import("@/views/business/saleList")

let AddOrderList = () => import('./views/business/addOrderList.vue')
let AddBusList = () => import('./views/business/addBusList.vue')
let AddPurList = () => import('./views/business/addPurList.vue')
let EditOrderList = () => import('./views/business/editOrderList.vue')
let EditPurList = () => import('./views/business/editPurList.vue')
let EditSaleList = () => import('./views/business/editSaleList.vue')

let GetDeposit = () => import('./views/business/deposit/getDeposit.vue')
let AddDeposit = () => import('./views/business/deposit/addDeposit.vue')
let EditDeposit = () => import('./views/business/deposit/editDeposit.vue')

let GetBalance = () => import('./views/business/balance/getBalance.vue')
let AddBalance = () => import('./views/business/balance/addBalance.vue')
let EditBalance = () => import('./views/business/balance/editBalance.vue')

let Menu = () => import('./views/setting/menu.vue')

let PurchaseContract = () => import('./views/contract/purchaseContract.vue')
let SaleContract = () => import('./views/contract/saleContract.vue')
let AddSale = () => import('./views/contract/addSale.vue')
let EditContract = () => import('./views/contract/editContract.vue')

let GetSupplier = () => import('./views/staff/supplier/getSupplier.vue')
let AddSupplier = () => import('./views/staff/supplier/addSupplier.vue')
let EditSupplier = () => import('./views/staff/supplier/editSupplier.vue')

let GetCustomer = () => import('./views/staff/customer/getCustomer.vue')
let AddCustomer = () => import('./views/staff/customer/addCustomer.vue')
let EditCustomer = () => import('./views/staff/customer/editCustomer.vue')

let GetFinance = () => import('./views/finance/financeManage/getFinance.vue')
let AddFinance = () => import('./views/finance/financeManage/addFinance.vue')
let EditFinance = () => import('./views/finance/financeManage/editFinance.vue')

let CarOutList = () => import('./views/cars/carOut/carOutList.vue')
let AddCars = () => import('./views/cars/addCars.vue')
let CarEnterList = () => import('./views/cars/carEnter/carEnterList.vue')
let EditCars = () => import('./views/cars/editCars.vue')

let GetTemporary = () => import('./views/cars/temporary/getTemporary.vue')
let AddTemporary = () => import('./views/cars/temporary/addTemporary.vue')
let EditTemporary = () => import('./views/cars/temporary/editTemporary.vue')

let GetNameplate = () => import('./views/cars/nameplate/getNameplate.vue')
let AddNameplate = () => import('./views/cars/nameplate/addNameplate.vue')
let EditNameplate = () => import('./views/cars/nameplate/editNameplate.vue')

let GetRoles = () => import('./views/staff/roles/getRoles.vue')
let AddRoles = () => import('./views/staff/roles/addRoles.vue')
let EditRoles = () => import('./views/staff/roles/editRoles.vue')

let GetAdmin = () => import('./views/staff/admin/getAdmin.vue')
let AddAdmin = () => import('./views/staff/admin/addAdmin.vue')
let EditAdmin = () => import('./views/staff/admin/editAdmin.vue')
let EditPassword = () => import('./views/staff/admin/editPassword.vue')

let GetNotice = () => import('./views/notice/getNotice.vue')
let AddNotice = () => import('./views/notice/addNotice.vue')

let LogList = () => import('./views/setting/logList.vue')
let GetNode = () => import('./views/setting/node/getNode.vue')
let AddNode = () => import('./views/setting/node/addNode.vue')
let EditNode = () => import('./views/setting/node/editNode.vue')

let GetCost = () => import('./views/finance/cost/getCost.vue')
let AddCost = () => import('./views/finance/cost/addCost.vue')
let EditCost = () => import('./views/finance/cost/editCost.vue')

let SalesInvoice = () => import('./views/invoice/salesInvoice')
let AddInvoice = () => import('./views/invoice/addInvoice')
let Editinvoice = () => import('./views/invoice/editinvoice')

let GetMark = () => import('./views/finance/mark/getMark.vue')
let AddMark = () => import('./views/finance/mark/addMark.vue')
let EditMark = () => import('./views/finance/mark/editMark.vue')


Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      redirect: 'Login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/nav',
      name: 'Nav',
      component: Nav,
      redirect: '/accountManage',
      children: [{
          path: '/accountManage',
          name: 'AccountManage',
          component: AccountManage,
          meta: {
            title: '首页'
          }
        },
        {
          path: '/businessList',
          name: 'BusinessList',
          component: BusinessList,
        },
        {
          path: '/purchase/index',
          name: 'PurchaseList',
          component: PurchaseList,
        },
        {
          path: '/sale/index',
          name: 'SaleList',
          component: SaleList,
        },
        {
          path: '/purchaseContract',
          name: 'PurchaseContract',
          component: PurchaseContract,
          meta: {
            title: '采购订单'
          },
        },
        {
          path: '/addPurList',
          name: 'AddPurList',
          component: AddPurList,
        },
        {
          path: '/editPurList',
          name: 'EditPurList',
          component: EditPurList,
        },
        {
          path: '/salecontract/index',
          name: 'SaleContract',
          component: SaleContract,
        },
        {
          path: '/addOrderList',
          name: 'AddOrderList',
          component: AddOrderList,
        },
        {
          path: '/addBusList',
          name: 'AddBusList',
          component: AddBusList,
        },
        {
          path: '/editOrderList',
          name: 'EditOrderList',
          component: EditOrderList,
        },
        {
          path: '/editSaleList',
          name: 'EditSaleList',
          component: EditSaleList,
        },

        {
          path: '/getDeposit',
          name: 'GetDeposit',
          component: GetDeposit,
        },
        {
          path: '/addDeposit',
          name: 'AddDeposit',
          component: AddDeposit,
        },
        {
          path: '/editDeposit',
          name: 'EditDeposit',
          component: EditDeposit,
        },
        {
          path: '/getBalance',
          name: 'GetBalance',
          component: GetBalance,
        },
        {
          path: '/addBalance',
          name: 'AddBalance',
          component: AddBalance,
        },
        {
          path: '/editBalance',
          name: 'EditBalance',
          component: EditBalance,
        },

        {
          path: '/menu/index',
          name: 'Menu',
          component: Menu,
        },
        {
          path: '/addSale',
          name: 'AddSale',
          component: AddSale,
        },
        {
          path: '/editContract',
          name: 'EditContract',
          component: EditContract,
        },
        {
          path: '/getSupplier',
          name: 'GetSupplier',
          component: GetSupplier,
        },
        {
          path: '/addSupplier',
          name: 'AddSupplier',
          component: AddSupplier,
        },
        {
          path: '/editSupplier',
          name: 'EditSupplier',
          component: EditSupplier,
        },
        {
          path: '/getCustomer',
          name: 'GetCustomer',
          component: GetCustomer,
        },
        {
          path: '/addCustomer',
          name: 'AddCustomer',
          component: AddCustomer,
        },
        {
          path: '/editCustomer',
          name: 'EditCustomer',
          component: EditCustomer,
        },
        {
          path: '/getFinance',
          name: 'GetFinance',
          component: GetFinance,
        },
        {
          path: '/addFinance',
          name: 'AddFinance',
          component: AddFinance,
        },
        {
          path: '/editFinance',
          name: 'EditFinance',
          component: EditFinance,
        },
        {
          path: '/carOutList',
          name: 'CarOutList',
          component: CarOutList,
        },
        {
          path: '/addCars',
          name: 'AddCars',
          component: AddCars,
        },
        {
          path: '/carEnterList',
          name: 'CarEnterList',
          component: CarEnterList,
        },
        {
          path: '/editCars',
          name: 'EditCars',
          component: EditCars,
        },
        {
          path: '/getTemporary',
          name: 'GetTemporary',
          component: GetTemporary,
        },
        {
          path: '/addTemporary',
          name: 'AddTemporary',
          component: AddTemporary,
        },
        {
          path: '/editTemporary',
          name: 'EditTemporary',
          component: EditTemporary,
        },
        {
          path: '/getNameplate',
          name: 'GetNameplate',
          component: GetNameplate,
        },
        {
          path: '/addNameplate',
          name: 'AddNameplate',
          component: AddNameplate,
        },
        {
          path: '/editNameplate',
          name: 'EditNameplate',
          component: EditNameplate,
        },
        {
          path: '/getRoles',
          name: 'GetRoles',
          component: GetRoles,
        },
        {
          path: '/addRoles',
          name: 'AddRoles',
          component: AddRoles,
        },
        {
          path: '/editRoles',
          name: 'EditRoles',
          component: EditRoles,
        },
        {
          path: '/getAdmin',
          name: 'GetAdmin',
          component: GetAdmin,
        },
        {
          path: '/addAdmin',
          name: 'AddAdmin',
          component: AddAdmin,
        },
        {
          path: '/editAdmin',
          name: 'EditAdmin',
          component: EditAdmin,
        },
        {
          path: '/editPassword',
          name: 'EditPassword',
          component: EditPassword,
        },
        {
          path: '/getNotice',
          name: 'GetNotice',
          component: GetNotice,
        },
        {
          path: '/addNotice',
          name: 'AddNotice',
          component: AddNotice,
        },
        {
          path: '/logList',
          name: 'LogList',
          component: LogList,
        },
        {
          path: '/getNode',
          name: 'GetNode',
          component: GetNode,
        },
        {
          path: '/addNode',
          name: 'AddNode',
          component: AddNode,
        },
        {
          path: '/editNode',
          name: 'EditNode',
          component: EditNode,
        },
        {
          path: '/getCost',
          name: 'GetCost',
          component: GetCost,
        },
        {
          path: '/addCost',
          name: 'AddCost',
          component: AddCost,
        },
        {
          path: '/editCost',
          name: 'EditCost',
          component: EditCost,
        },
        {
          path: '/salesInvoice',
          name: 'SalesInvoice',
          component: SalesInvoice,
        },
        {
          path: '/addInvoice',
          name: 'AddInvoice',
          component: AddInvoice,
        },
        {
          path: '/editinvoice',
          name: 'Editinvoice',
          component: Editinvoice,
        },
        {
          path: '/getMark',
          name: 'GetMark',
          component: GetMark,
        },
        {
          path: '/addMark',
          name: 'AddMark',
          component: AddMark,
        },
        {
          path: '/editMark',
          name: 'EditMark',
          component: EditMark,
        },
      ]
    },
  ]
})