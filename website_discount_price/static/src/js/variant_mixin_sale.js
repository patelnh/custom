/** @odoo-module **/

import VariantMixin from "@website_sale/js/sale_variant_mixin";
import { patch } from "@web/core/utils/patch";
import Dialog from '@web/legacy/js/core/dialog';

/**
 * Update the renting text when the combination change.
 *
 * @param {Event} ev
 * @param {$.Element} $parent
 * @param {object} combination
 */


VariantMixin._onChangeCombination = function (ev, $parent, combination) {
        var parentElement = document.getElementById('variant-description');


        // Update the product variant information
        var $price = $parent.find(".oe_price:first .oe_currency_value");
        var $default_price = $parent.find(".oe_default_price:first .oe_currency_value");
        var $optional_price = $parent.find(".oe_optional:first .oe_currency_value");
        if (combination.discount_percentage){
            $price.text(this._priceToStr(combination.price - combination.discount_percentage));
        }
        else{
            $price.text(this._priceToStr(combination.price));
        }
        $default_price.text(this._priceToStr(combination.list_price));
        var isCombinationPossible = true;
        if (!_.isUndefined(combination.is_combination_possible)) {
            isCombinationPossible = combination.is_combination_possible;
        }
        this._toggleDisable($parent, isCombinationPossible);
        if (combination.has_discounted_price) {
            $default_price.closest('.oe_website_sale').addClass("discount");
            $optional_price.closest('.oe_optional').removeClass('d-none').css('text-decoration', 'line-through');
            $default_price.parent().removeClass('d-none');
        } else {
            $default_price.closest('.oe_website_sale').removeClass("discount");
            $optional_price.closest('.oe_optional').addClass('d-none');
            $default_price.parent().addClass('d-none');
        }
        var rootComponentSelectors = [
            'tr.js_product',
            '.oe_website_sale',
            '.o_product_configurator'
        ];
        if (!combination.product_id ||
            !this.last_product_id ||
            combination.product_id !== this.last_product_id) {
            this.last_product_id = combination.product_id;
            this._updateProductImage(
                $parent.closest(rootComponentSelectors.join(', ')),
                combination.display_image,
                combination.product_id,
                combination.product_template_id,
                combination.carousel,
                isCombinationPossible
            );
        }
        $parent.find('.product_id').first().val(combination.product_id || 0).trigger('change');
        $parent.find('.product_display_name').first().text(combination.display_name);
        $parent.find('.js_raw_price').first().text(combination.price).trigger('change');
        this.handleCustomValues($(ev.target));
    };
