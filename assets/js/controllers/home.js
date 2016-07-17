/*global angular*/
angular.module('myApp.controllers').controller('homeController', function ($scope, reviewService) {
	var homeCtrl			= this;
	homeCtrl.isLoaded		= false;
	homeCtrl.isInProcess	= false;
	homeCtrl.reviews		= [];
	homeCtrl.business		= null;
	homeCtrl.page			= 0;
	homeCtrl.limit			= 10;
	homeCtrl.loadData		= loadData;
	homeCtrl.getTotalPage	= getTotalPage;
	
	/**
	 * Page Init
	 */
	function init()
	{
		homeCtrl.loadData();
	}
	// run init
	init();
	
	/**
	 * Get Total Page
	 */
	function getTotalPage()
	{
		var totalRating	= homeCtrl.business.getRating();
		return Math.ceil(totalRating.getTotal() / homeCtrl.limit);
	}
	
	/**
	 * Load More
	 * @param Integer : newPage
	 */
	function loadData(newPage)
	{
		if ( homeCtrl.isInProcess === true ) {
			return false;
		}
		newPage	= newPage || 1;
		homeCtrl.isInProcess	= true;
		reviewService.loadData(newPage, homeCtrl.limit).then(function (response) {
			homeCtrl.isLoaded	= true;
			homeCtrl.isInProcess= false;
			// Set Business
			if ( homeCtrl.business === null ) {
				homeCtrl.business	= response.business;
			}
			homeCtrl.reviews	= response.reviews;
			// Set new page
			homeCtrl.page		= angular.copy(newPage);
		}, function (response) {
			homeCtrl.isLoaded	= true;
			homeCtrl.isInProcess= false;
			console.info("Error : ", response);
		});
	}
});