# -*- coding: utf-8 -*-

{
    'name': 'Website Discount Price',
    'category': 'website',
    'version': '17.0',
    'summary': 'Website Discount Price',

    'description': """

/Website/Discount Price
==============================
Provides Discount Price on the website. 

    """,
    
    'data': [
             'views/website.xml',
             'views/product_template_view.xml'
             ],

    'depends': [
        'website_sale', 'sale_management','website'
    ],
    'assets': {
        'web.assets_frontend': [
            'website_discount_price/static/src/js/variant_mixin_sale.js',
        ]
        },
    'installable': True,
    'application': True,
    'auto_install': True,
    'license': 'LGPL-3'
}
