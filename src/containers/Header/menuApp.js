export const adminMenu = [
    { //hệ thống
        name: 'Tổng quan', menus: [
            {
                name: 'menu.system.system-administrator.header', link: '/system/aaaaaa'
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.product-manage', link: '/system/product-manage' },
                //     { name: 'menu.system.system-administrator.register-package-group-or-account', link: '/system/register-package-group-or-account' },
                // ]
            },
            {
                name: 'menu.system.system-administrator.user-manage', link: '/system/aaaa'
            }

        ]
    },
    {
        name: 'Hàng hóa', menus: [
            {
                name: 'Danh mục', link: '/system/product'

            },
            {
                name: 'Thiết lập giá', link: '/system/product-manage'
            }
            ,
            {
                name: 'Kiểm kho', link: '/system/product-manage'
            }

        ]
    }
    ,
    {
        name: 'Giao dịch', menus: [
            {
                name: 'Đặt hàng', link: '/system/order'

            },
            {
                name: 'Hóa đơn', link: '/system/receipt'
            }
            ,
            {
                name: 'Nhập hàng', link: '/system/purchase'
            }

        ]
    }
    ,
    {
        name: 'Đối tác', menus: [
            {
                name: 'Khách hàng', link: '/system/customer'

            },
            {
                name: 'Nhà cung cấp', link: '/system/supplier'
            }


        ]
    }
    ,
    {
        name: 'Sổ quỹ', link: '/system/user-manage'
    }
    ,
    {
        name: 'Báo cáo', menus: [
            {
                name: 'Bán hàng', link: '/system/aaa'

            },
            {
                name: 'Đặt hàng', link: '/system/aaaa'
            },
            {
                name: 'Hàng hóa', link: '/system/aaaa'
            },
            {
                name: 'Khách hàng', link: '/system/aaaa'
            },
            {
                name: 'Nhà cung cấp', link: '/system/aaaa'
            },


        ]
    }
];
export const adminMenuSale = [
    { //hệ thống
        name: 'Bán hàng', menus: [
            {
                name: 'Hóa đơn', link: '/system/sale'

            }

        ]
    }
];