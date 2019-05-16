/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("digitalbusiness.states.custom_invoice", [])
        .config(function ($stateProvider, templateRoot) {
            $stateProvider.state('custom_invoice_i3space', {
                'url': '/:dealerInvoiceId/:orderHeadId/i3_space',
                'templateUrl': templateRoot + '/custom_invoice/i3_space.html',
                'controller': 'I3InvoiceController'
            });
        })
        .controller('I3InvoiceController', function (DealerInvoiceDetailsService, $scope, $stateParams, $state, paginationLimit) {
            
        });
        