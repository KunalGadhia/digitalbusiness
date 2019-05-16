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
        .controller('DealerInvoiceFormController', function (DealerInvoiceDetailsService, $scope, $stateParams, $state, paginationLimit) {
            $scope.editableDealerInvoiceDetails = {};
            $scope.$watch('editableDealerInvoiceDetails.billingShippingSame', function (shippingCheck) {
                console.log("Shipping Check:%O", shippingCheck);
                if (shippingCheck === true) {
                    $scope.editableDealerInvoiceDetails.shippingPartyName = $scope.editableDealerInvoiceDetails.billingPartyName;
                    $scope.editableDealerInvoiceDetails.shippingPartyAddress = $scope.editableDealerInvoiceDetails.billingPartyAddress;
                    $scope.editableDealerInvoiceDetails.shippingPartyGstin = $scope.editableDealerInvoiceDetails.billingPartyGstin;
                    $scope.editableDealerInvoiceDetails.shippingPartyState = $scope.editableDealerInvoiceDetails.billingPartyState;
                    $scope.editableDealerInvoiceDetails.shippingPartyCode = $scope.editableDealerInvoiceDetails.billingPartyCode;
                } else if (shippingCheck === false) {
                    $scope.editableDealerInvoiceDetails.shippingPartyName = '';
                    $scope.editableDealerInvoiceDetails.shippingPartyAddress = '';
                    $scope.editableDealerInvoiceDetails.shippingPartyGstin = '';
                    $scope.editableDealerInvoiceDetails.shippingPartyState = '';
                    $scope.editableDealerInvoiceDetails.shippingPartyCode = '';
                }
            });

            $scope.saveDealerInvoiceDetails = function (dealerInvoiceObject) {
                dealerInvoiceObject.orderHeadId = $stateParams.orderHeadId;
                DealerInvoiceDetailsService.save(dealerInvoiceObject, function (savedData) {
                    $state.go('custom_invoice_i3space', {
                        'dealerInvoiceId': savedData.id,
                        'orderHeadId': $stateParams.orderHeadId
                    }, {'target': '_blank',
                        'reload': true});
                });
            };
        });
        