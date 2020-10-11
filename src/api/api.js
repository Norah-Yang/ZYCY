const BASEURL = '/api'
const URL = {
    //登录
    getlogin: BASEURL + '/mapi/login',
    //菜单栏
    getMenu: BASEURL + '/mapi/menu',
    //权限
    // getRole : BASEURL+'/mapi/node',
    //首页信息
    getInfo: BASEURL + '/mapi/info',
    //后台首页
    index: BASEURL + '/mapi/index',

    //业务列表
    getBusinessList: BASEURL + '/mapi/business',
    //获取业务详情
    businessInfo: BASEURL + '/mapi/businessInfo',
    //添加业务
    addBusiness: BASEURL + '/mapi/addBusiness',
    //修改业务
    editBusiness: BASEURL + '/mapi/editBusiness',
    //审核业务
    clickExamine: BASEURL + '/mapi/clickExamine',
    //删除业务
    delBusiness: BASEURL + '/mapi/delBusiness',

    //销售订单列表
    saleList: BASEURL + '/mapi/sale',
    //添加销售订单
    addSale: BASEURL + '/mapi/addSale',
    //获取销售订单详情
    saleInfo: BASEURL + '/mapi/saleInfo',
    //修改销售订单
    editSale: BASEURL + '/mapi/editSale',
    //删除销售订单
    delSale: BASEURL + '/mapi/delSale',

    //获取供应商
    getSupplier: BASEURL + '/mapi/getSupplier',
    //获取客户
    getSalesman: BASEURL + '/mapi/getSalesman',
    //获取采购订单
    getPurchase: BASEURL + '/mapi/getPurchase',
    //获取业务id
    getBusiness: BASEURL + '/mapi/getBusiness',
    //获取销售id
    getSale: BASEURL + '/mapi/getSale',

    //采购订单列表
    purchaseList: BASEURL + '/mapi/purchase',
    //采购订单添加
    addPurchase: BASEURL + '/mapi/addPurchase',
    //采购订单详情
    purchaseInfo: BASEURL + '/mapi/purchaseInfo',
    //采购订单修改
    editPurchase: BASEURL + '/mapi/editPurchase',
    //采购订单删除
    delPurchase: BASEURL + '/mapi/delPurchase',

    //定金列表
    deposit: BASEURL + '/mapi/deposit',
    //定金添加
    addDeposit: BASEURL + '/mapi/addDeposit',
    //定金详情
    depositInfo: BASEURL + '/mapi/depositInfo',
    //定金修改
    editDeposit: BASEURL + '/mapi/editDeposit',
    //定金删除
    delDeposit: BASEURL + '/mapi/delDeposit',


    //尾款列表
    balance: BASEURL + '/mapi/balance',
    //尾款添加
    addBalance: BASEURL + '/mapi/addBalance',
    //尾款详情
    balanceInfo: BASEURL + '/mapi/balanceInfo',
    //尾款修改
    editBalance: BASEURL + '/mapi/editBalance',
    //尾款删除
    delBalance: BASEURL + '/mapi/delBalance',

    //合同列表
    getContract: BASEURL + '/mapi/contract',
    //添加合同
    addContract: BASEURL + '/mapi/addContract',
    //上传照片
    upload: BASEURL + '/mapi/upload',
    //合同详情
    contractInfo: BASEURL + '/mapi/contractInfo',
    //修改合同
    editContract: BASEURL + '/mapi/editContract',
    //删除合同
    delContract: BASEURL + '/mapi/delContract',

    //供应商列表
    gatSupplier: BASEURL + '/mapi/supplier',
    //添加供应商
    addSupplier: BASEURL + '/mapi/addSupplier',
    //供应商详情
    supplierInfo: BASEURL + '/mapi/supplierInfo',
    //修改供应商
    editSupplier: BASEURL + '/mapi/editSupplier',
    //删除供应商
    delSupplier: BASEURL + '/mapi/delSupplier',

    //客户列表
    getCustomer: BASEURL + '/mapi/customer',
    //添加客户
    addCustomer: BASEURL + '/mapi/addCustomer',
    //客户详情
    customerInfo: BASEURL + '/mapi/customerInfo',
    //修改客户
    editCustomer: BASEURL + '/mapi/editCustomer',
    //删除客户
    delCustomer: BASEURL + '/mapi/delCustomer',

    //角色列表
    role: BASEURL + '/mapi/role',
    //角色添加
    addRole: BASEURL + '/mapi/addRole',
    //角色详情
    roleInfo: BASEURL + '/mapi/roleInfo',
    //修改角色
    editRole: BASEURL + '/mapi/editRole',
    //删除角色
    delRole: BASEURL + '/mapi/delRole',
    //角色分配
    assignRole: BASEURL + '/mapi/assignRole',
    //获取角色信息
    getRole: BASEURL + '/mapi/getRole',
    //获取管理员信息
    getAdmin: BASEURL + '/mapi/getAdmin',

    //管理员列表
    admin: BASEURL + '/mapi/admin',
    //管理员添加
    addAdmin: BASEURL + '/mapi/addAdmin',
    //管理员详情
    adminInfo: BASEURL + '/mapi/adminInfo',
    //修改管理员
    editAdmin: BASEURL + '/mapi/editAdmin',
    //修改密码
    editPassword: BASEURL + '/mapi/editPassword',
    //注销管理员
    delAdmin: BASEURL + '/mapi/delAdmin',

    //财务列表
    getFinance: BASEURL + '/mapi/finance',
    //添加财务
    addFinance: BASEURL + '/mapi/addFinance',
    //财务详情
    financeInfo: BASEURL + '/mapi/financeInfo',
    //修改财务
    editFinance: BASEURL + '/mapi/editFinance',
    //删除财务
    delFinance: BASEURL + '/mapi/delFinance',

    //费用分类列表
    cost: BASEURL + '/mapi/cost',
    //添加费用分类
    addCost: BASEURL + '/mapi/addCost',
    //费用分类详情
    costInfo: BASEURL + '/mapi/costInfo',
    //修改费用分类
    editCost: BASEURL + '/mapi/editCost',
    //删除费用分类
    delCost: BASEURL + '/mapi/delCost',


    //车辆列表
    getCart: BASEURL + '/mapi/cart',
    //添加车辆
    addCart: BASEURL + '/mapi/addCart',
    //车辆出入库详情
    cartInfo: BASEURL + '/mapi/cartInfo',
    //车辆出入库修改
    editCart: BASEURL + '/mapi/editCart',
    //车辆出入库删除
    delCart: BASEURL + '/mapi/delCart',
    //车辆出库
    warehouseCart: BASEURL + '/mapi/warehouseCart',

    //获取所有临牌列表
    getTemporaryu: BASEURL + '/mapi/temporary',
    //临牌添加
    addTemporary: BASEURL + '/mapi/addTemporary',
    //临牌详情
    temporaryInfo: BASEURL + '/mapi/temporaryInfo',
    //临牌修改
    editTemporary: BASEURL + '/mapi/editTemporary',
    //删除临牌
    delTemporary: BASEURL + '/mapi/delTemporary',

    //获取所有铭牌列表
    getNameplate: BASEURL + '/mapi/nameplate',
    //铭牌添加
    addNameplate: BASEURL + '/mapi/addNameplate',
    //铭牌详情
    nameplateInfo: BASEURL + '/mapi/nameplateInfo',
    //铭牌修改
    editNameplate: BASEURL + '/mapi/editNameplate',
    //删除铭牌
    delNameplate: BASEURL + '/mapi/delNameplate',

    //获取车辆ID
    getCartID: BASEURL + '/mapi/getCart',


    //获取所有父级菜单
    getParentMenu: BASEURL + '/mapi/getParentMenu',
    //菜单详情
    menuInfo: BASEURL + '/mapi/menuInfo',
    //添加菜单
    addMenu: BASEURL + '/mapi/addMenu',
    //修改菜单
    editMenu: BASEURL + '/mapi/editMenu',
    //删除菜单
    delMenu: BASEURL + '/mapi/delMenu',

    //公告列表
    notice: BASEURL + '/mapi/notice',
    //公告添加
    addNotice: BASEURL + '/mapi/addNotice',
    //日志列表
    logList: BASEURL + '/mapi/log',

    //权限列表
    nodeList: BASEURL + '/mapi/nodeList',
    //获取父级信息
    getParentNode: BASEURL + '/mapi/getParentNode',
    //权限添加
    addNode: BASEURL + '/mapi/addNode',
    //权限详情
    nodeInfo: BASEURL + '/mapi/nodeInfo',
    //权限修改
    editNode: BASEURL + '/mapi/editNode',
    //权限删除
    delNode: BASEURL + '/mapi/delNode',
    //权限分配
    assignNode: BASEURL + '/mapi/assignNode',
    //获取权限
    getNode: BASEURL + '/mapi/getNode',

    // 发票列表
    invoiceList: BASEURL + '/mapi/tax',
    // 添加发票
    addInvoice: BASEURL + '/mapi/addTax',
    // 发票详情
    invoiceDetails: BASEURL + '/mapi/taxInfo',
    // 修改发票
    modifyInvoice: BASEURL + '/mapi/editTax',
    // 删除发票
    deleteInvcice: BASEURL + '/mapi/delTax',
    // 销售订单  mapi/getSale
    salesOrder: BASEURL + '/mapi/getSale',
    //获取可以开发票但是没有发票的订单列表
    getSaleNoTax: BASEURL + '/mapi/getSaleNoTax',
    // 采购订单
    procurementOrder: BASEURL + '/mapi/getPurchase',
    //获取可以开发票但是没有发票的订单列表
    getPurchaseNoTax: BASEURL + '/mapi/getPurchaseNoTax',
    // 发票申请列表  invoice 
    applicationList: BASEURL + '/mapi/invoice',
    // 发票审核
    create: BASEURL + '/mapi/create',

    // 销售费用列表
    mark: BASEURL + '/mapi/mark',
    // 销售费用添加
    addMark: BASEURL + '/mapi/addMark',
    // 销售费用详情
    markInfo: BASEURL + '/mapi/markInfo',
    // 销售费用修改
    editMark: BASEURL + '/mapi/editMark',
    // 销售费用删除
    delMark: BASEURL + '/mapi/delMark',
    // 获取类型列表
    getCost: BASEURL + '/mapi/getCost',
    

}
module.exports = URL