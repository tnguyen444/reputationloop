angular.module('myApp.services').service('businessService', function($q, $http, appUtils) {
	var objService = {
	};
	return objService;
});

angular.module('myApp.services').service('reviewService', function($q, $sce, $http, appParams, appUtils) {
	var objService = {
		loadData		: loadData,
		fetchBusiness	: fetchBusiness,
		fetchReviews	: fetchReviews,
		fetchReviewItem	: fetchReviewItem
	};
	return objService;
	
	/**
	 * Get Business Info
	 * @param Integer : page
	 * @param Integer : noOfReviews
	 * @return object
	 */
	function loadData(page, noOfReviews)
	{
		page        = page || 1;
		noOfReviews = noOfReviews || appParams.REVIEW.limit;
		var offset  = (page * noOfReviews) - noOfReviews;
		var defer = $q.defer();
		$http({
			url		: appUtils.getApiUrl(),
			params	: {
				noOfReviews	: noOfReviews,
				internal	: 1,
				yelp		: 1,
				google		: 1,
				offset		: offset,
				threshold	: 1
			}
		})
		.success(function (response) {
			var result	= {
				business	: objService.fetchBusiness(response.business_info),
				reviews		: objService.fetchReviews(response.reviews),
			};
			defer.resolve(result);
		})
		.error(function (response) {
			defer.reject(response);
		});
		return defer.promise;
	}
	
	/**
	 * Fetch Bussiness
	 * @param Object : data
	 * @return Object || Boolean
	 */
	function fetchBusiness(data)
	{
		if ( data === undefined || typeof data != 'object' ) {
			return false;
		}
		var result = angular.copy(data);
		result.getName		= function () {return this.business_name;};
		result.getAddress	= function () {return $sce.trustAsHtml(this.business_address);};
		result.getPhone		= function () {return this.business_phone;};
		result.getRating	= function () {return this.total_rating;};
		// Total Rating
		result.total_rating.getAvg		= function () {return parseFloat(this.total_avg_rating) || 0;};
		result.total_rating.getTotal	= function () {return parseInt(this.total_no_of_reviews) || 0;};
		result.getMapUrl	= function () {
			var url	= 'https://www.google.com/maps/embed/v1/place?key='+appParams.GOOGLE.key+'&q=' + this.getAddress();
			return $sce.trustAsResourceUrl(url);
		};
		return result;
	}
	
	/***
	 * Fetch Review Item
	 * @param Object : data
	 * @return Object
	 */
	function fetchReviewItem(data)
	{
		if ( data === undefined || typeof data != 'object' ) {
			return false;
		}
		var result	= angular.copy(data);
		result.getId			= function () {return parseInt(this.review_id);};
		result.getDate			= function () {return this.date_of_submission;};
		result.getDescription	= function () {return this.description;};
		result.getFrom			= function () {return this.review_from;};
		result.getRating		= function () {return parseFloat(this.rating) || 0;};
		result.getSource		= function () {return this.review_source;};
		result.getUrl			= function () {return this.review_url;};
		result.getCustomerName		= function () {return this.customer_name;};
		result.getCustomerLastName	= function () {return this.customer_last_name;};
		result.getCustomerUrl		= function () {return this.customer_url;};
		result.date_of_submission	= appUtils.dateTime(new Date(result.date_of_submission));
		result.getAvatar		= function () {
			var source	= this.getSource();
			if ( source == 'molomedia' ) {
				source	= 'SquareIcon';
			} else {
				source	= this.getSource() + '_logo';
			}
			return 'http://localreviewdirectory.com/resize/images/social_icon/'+source+'.png?w=40';
		};
		return result;
	}
	
	/**
	 * Fetch Reviews
	 * @param Array : data
	 * @return Array
	 */
	function fetchReviews(data)
	{
		if ( data === undefined || typeof data != 'object' ) {
			return [];
		}
		
		var list	= angular.copy(data);
		angular.forEach(list, function (item, index) {
			list[index]	= objService.fetchReviewItem(item);
		});
		return list;
	}
});