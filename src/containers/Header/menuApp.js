export const adminMenu = [
    { //hệ thống
        name: 'Tổng quan', menus: [
            {
                name: 'menu.system.system-administrator.header', link: '/system/user-manage'
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.product-manage', link: '/system/product-manage' },
                //     { name: 'menu.system.system-administrator.register-package-group-or-account', link: '/system/register-package-group-or-account' },
                // ]
            },
            {
                name: 'menu.system.system-administrator.user-manage', link: '/system/product-manage'
            }

        ]
    },
    {
        name: 'Hàng hóa', menus: [
            {
                name: 'Danh mục', link: '/system/user-manage'

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
                name: 'Đặt hàng', link: '/system/user-manage'

            },
            {
                name: 'Hóa đơn', link: '/system/product-manage'
            }
            ,
            {
                name: 'Nhập hàng', link: '/system/product-manage'
            }

        ]
    }
    ,
    {
        name: 'Đối tác', menus: [
            {
                name: 'Khách hàng', link: '/system/user-manage'

            },
            {
                name: 'Nhà cung cấp', link: '/system/product-manage'
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
                name: 'Bán hàng', link: '/system/user-manage'

            },
            {
                name: 'Đặt hàng', link: '/system/product-manage'
            },
            {
                name: 'Hàng hóa', link: '/system/product-manage'
            },
            {
                name: 'Khách hàng', link: '/system/product-manage'
            },
            {
                name: 'Nhà cung cấp', link: '/system/product-manage'
            },


        ]
    }
];