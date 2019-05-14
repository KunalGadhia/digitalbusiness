/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("digitalbusiness.states.dealer_invoice_details", [])
        .config(function ($stateProvider, templateRoot) {
            $stateProvider.state('admin.dealers_order_history.form', {
                'url': '/:orderHeadId/dealer_invoice_form',
                'templateUrl': templateRoot + '/masters/dealer_invoice_details/form.html',
                'controller': 'DealerInvoiceFormController'
            });            
        })
        .controller('DealerInvoiceFormController', function ($scope, $stateParams, $state, paginationLimit) {
            
        });
        