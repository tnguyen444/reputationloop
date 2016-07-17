angular.module('myApp.factories').factory('appUtils', function(appParams) {
	var factoryObj	= {
		getApiUrl	: getApiUrl,
		dateTime	: dateTime
	};
	return factoryObj;
	
	/**
	 * Get API Url
	 * @param String Link
	 * @return String
	 */
	function getApiUrl(link)
	{
		link	= (link || '').trim();
		var apiParams	= appParams.API;
		return apiParams.url + '/' + link;
	}
	
	/**
	 * Function Date & Time
	 * @param String dateTimeStr
	 * @return Object
	 */
	function dateTime(dateTimeStr)
	{
		if ( dateTimeStr === undefined ) {
			return false;
		} else if (typeof dateTimeStr == 'string'){
			dateTimeStr	= dateTimeStr.replace(/-/g, '/');
		}
		var dayArr		= ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
		var dayMinArr	= ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
		var monthArr	= ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August','September', 'October', 'November', 'December'];
		var monthMinArr	= ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug','Sep', 'Oct', 'Nov', 'Dec'];
		
		var obj = new Date(dateTimeStr);
		obj.getStrDay	= function () {
			return dayArr[this.getDay()];
		};
		obj.getStrDayMin= function () {
			return dayMinArr[this.getDay()];
		};
		obj.getStrMonth	= function () {
			return monthArr[this.getMonth()];
		};
		obj.getStrMonthMin	= function () {
			return monthMinArr[this.getMonth()];
		};
		obj.getSuffix	= function () {
			var suffix	= 'th';
			var date	= this.getDate();
			if ( date >= 10 && date <= 19 ) {
				suffix	= 'th';
			} else {
				switch(date % 10)
				{
					case 1	: suffix = 'st'; break;
					case 2	: suffix = 'nd'; break;
					case 3	: suffix = 'rd'; break;
					default: suffix = 'th';
				}
			}
			return suffix;
		};
		obj.getDayOfMonth	= function () {
			var obj	= this;
			var pst	= 0;
			var newDate	= new Date(obj.getFormat("Y-m-d H:i:s"));
			do
			{
				newDate.setDate(newDate.getDate() - 7);
				pst++;
			}
			while(newDate.getMonth() == obj.getMonth());
			return pst;
		};
		obj.getFormat	= function (format) {
			format		= format || "m/d/Y";
			var result	= angular.copy(format).split('');
			var today	= this;
			
			var list = {};
			list.d	= today.getDate() < 10 ? '0' + today.getDate() : today.getDate();
			list.D	= today.getStrDayMin();
			list.j	= today.getDate();
			list.l	= today.getStrDay();
			list.L	= today.getStrDay();
			list.N	= today.getDay()+1;
			list.S	= today.getSuffix();
			list.w	= today.getDay();
			
			list.F	= today.getStrMonth();
			list.m	= today.getMonth()+1 < 10 ? '0' + (today.getMonth()+1) : today.getMonth()+1;
			list.M	= today.getStrMonthMin();
			list.n	= today.getMonth()+1;
			
			list.y	= today.getFullYear().toString().slice(2);
			list.Y	= today.getFullYear();
			
			// Time
			list.a	= today.getHours() >= 12 ? 'pm' : 'am';
			list.A	= angular.uppercase(list.a);
			
			list.h	= today.getHours() > 12 ? today.getHours() - 12 : ( today.getHours() === 0 ? 12 : today.getHours() );
			list.h	= list.h < 10 ? '0' + list.h : list.h;
			
			list.H	= today.getHours();
			list.H	= list.H < 10 ? '0'+list.H : list.H;
			list.i	= today.getMinutes() < 10 ? '0'+today.getMinutes() : today.getMinutes();
			list.s	= today.getSeconds() < 10 ? '0'+today.getSeconds() : today.getSeconds();
			
			angular.forEach(list, function (value, key) {
				angular.forEach(result, function (rp, ind) {
					if ( rp == key )
					{
						result[ind]	= value;
					}
				});
			});
			return result.join('');
		};
		return obj;
	}
});