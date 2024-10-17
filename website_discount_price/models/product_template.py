from odoo import models, fields, api

class ProductTemplate(models.Model):
    _inherit = 'product.template'

    discount_percentage = fields.Float(string="Discount (%)", default=0.0)


    def _get_additionnal_combination_info(self, product_or_template, quantity, date, website):
        res = super()._get_additionnal_combination_info(product_or_template, quantity, date, website)

        if self.discount_percentage > 0:
            discount_percentage = self.list_price * (1 - self.discount_percentage / 100)
            res.update({
                'discount_percentage': discount_percentage,
            })
            return res
        return {
                **res,
                'discount_percentage': False,
                }
