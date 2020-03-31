//App
angular.module('WebInterfaceApp', ['ui.router','youtube-embed','ngTouch'])
.config(['$stateProvider', '$locationProvider', '$httpProvider', function ($stateProvider, $locationProvider, $httpProvider) {
    $stateProvider
    .state('All', {
        url: '/:itemId',
        templateUrl: '/Home/Landing',
        controller: 'HomeController'
    }).state('Landing', {
        url: '/',
        templateUrl: '/Home/Landing',
        controller: 'HomeController'
    });

    $locationProvider.html5Mode(true);
    $httpProvider.defaults.timeout = 10000;
}])
.service('WebInterfaceService', ['$http', function ($http) {
    console.log("webservice");
    this.getTagItems = function (tag) {
        //return $http.get('http://52.63.119.118/api/api/item/GetItems?name=' + (tag.path() == "/" ? 'United Kingdom' : tag.path().replace('/', '')) + '&type=Partial');
        return $http.get('http://localhost:50322/api/item/GetItems?name=' + (tag.path() == "/" ? 'United Kingdom' : tag.path().replace('/', '')) + '&type=Partial');
    };
    this.getTagItemPage = function (tag, page, pageNo) {
        //return $http.get('http://52.63.119.118/api/api/item/GetItemPaging?name=' + (tag.path() == "/" ? 'United Kingdom' : tag.path().replace('/', '')) + '&page=' + page + '&pageNo=' + pageNo);
        return $http.get('http://localhost:50322/api/item/GetItemPaging?name=' + (tag.path() == "/" ? 'United Kingdom' : tag.path().replace('/', '')) + '&page=' + page + '&pageNo=' + pageNo);
    };

    this.startLoader = function () {
        $('ajaxLoader').css('position', 'absolute');
        $('ajaxLoader').height($('[ui-view]').height() < 100 ? $(window).height() : $('[ui-view]').height());
        $('ajaxLoader').width($('[ui-view]').width() < 100 ? $(window).width() : $('[ui-view]').width());
        $('ajaxLoader').html('<div style="z-index: 999;position: absolute;margin-top: 20%;margin-left: 50%;"><img src="~/Content/images/ajax-loader.gif" />LOADING...</div>').show();
    };
    this.stopLoader = function () {
        $('ajaxLoader').hide();
    };

}])
.controller('HomeController', ['$rootScope', '$scope', '$location', 'WebInterfaceService', function ($rootScope, $scope, $location, WebInterfaceService) {    
    $scope.flag = true;
if ($location.path() == '/') {
        $location.path('United Kingdom');
    }
    $scope.setData = function (data) {
        $scope.movies = data;
    };
    $rootScope.selectedMenu = 'Overview';
    $scope.topMenuAction = function (name, index) {
        // Begin our infinite scroll from the top
        window.scrollTo(0, 0);
        $rootScope.selectedMenu = name;
        // Load sections for current page
        $scope.sectionManage(index);
    };
    $scope.linkAction = function (act) {
        $location.path(act);
    };
    $scope.tagAction = function (tag) {
        WebInterfaceService.getTagItems(tag)
            .success(function (tagItems) {
                $scope.movies = tagItems;
                var scope = angular.element($('[ng-controller="HomeController"]')).scope();
                scope.setData(tagItems);
                // Load sections for the first page
                $scope.sectionManage(0);
            })
            .error(function (error) {
                $scope.status = 'Unable to load movie data: ' + error.message;
                console.log($scope.status);
            });
    };
    $scope.tagAction($location);  
    $scope.test =function(){
        console.log("hover");
    };
    $scope.pageManage = function(direction,page,index){
        if (page !== undefined && $scope.flag === true) {
            $scope.topMenuAction(page, index);
        }
        else{
            console.log("You are now in last/First");
        }
        console.log("direction-"+direction+'page-'+page);
    };
    // Function for loading sections for specific page in background
    $scope.sectionManage = function (pageIndex) {
        // If index is out of bound, just return
        if (pageIndex >= $scope.movies.pages.length)
            return;
        // Internal loop function, which is called after every ajax request if we need to load more sections
        var loop = function () {
            var page = $scope.movies.pages[pageIndex];
            // Number of section which will be loaded next
            var pageNo = page.sections.length;
            // If we already loading some sections, or already loaded all available sections, just return
            if (page.loadingSections || page.sectionsLoaded)
                return;
            // Set this as true to avoid many background requests
            page.loadingSections = true;

            WebInterfaceService.getTagItemPage($location, pageIndex, pageNo)
            .success(function (sections) {
                // Add each received section to our page
                angular.forEach(sections, function (section) {
                    page.sections.push(section);
                });
                // Set this as false to be able load new sections on the next time
                page.loadingSections = false;
                // If we get some sections
                if (sections.length > 0) {
                    // And our bottom anchor is still visible (which means that we have empty space from the bottom)
                    if ($scope.isBottomAnchorInViewport()) {
                        // Go to another iteration and call the function again
                        loop();
                    }
                } else {
                    // If we get empty sections array, that all available sections already loaded
                    page.sectionsLoaded = true;
                }
            })
            .error(function (error) {
                $scope.status = 'Unable to load page data: ' + error.message;
                console.log($scope.status);
                page.loadingSections = false;
            })
        }
        // Trigger this function for first iteration
        loop();
    };
    // Function for checking that our bottom anchor is still visible or not (which means that we have empty space from the bottom)
    $scope.isBottomAnchorInViewport = function () {
        var rect = angular.element('#bottomAnchor')[0].getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight+500 || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    };
}])
.directive('stopEvent',function() {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            element.on(attr.stopEvent, function(e) {
                scope.flag = false;
                // e.stopPropagation();
            });
        }
    };
})
.directive('carousel',function () {
    return{
        restrict: 'A',
        link: function(scope){
            scope.initCarousel = function(element) {
                $(element).owlCarousel({
                    navigation: false,
                    pagination: false,
                    autoWidth: true,
                    loop: false
                });
                $(element).on('drag.owl.carousel', function(event) {
                    console.log("elem",event);
                    event.preventDefault();
                    event.stopPropagation();
                    return false;
                });
                $(element).on('dragged.owl.carousel', function(event) {
                    console.log("elem",event);
                    event.preventDefault();
                    event.stopPropagation();
                    return false;
                });
                // console.log("I'm in");
                // var swiper = new Swiper('.swiper-container', {
                //     pagination: '.swiper-pagination',
                //     slidesPerView: 0,
                //     paginationClickable: true,
                //     spaceBetween: 30,

                // });
            };
        }
    }
})
.directive('carouselItem',function() {
    return {
        restrict: 'E',
        transclude: false,
        link: function(scope, element) {
          // wait for the last item in the ng-repeat then call init
          // $(element).find('img').css('width',150);
            if(scope.$last) {
                scope.initCarousel(element.parent());
                // $(element).find('img').load(function() {
                //     console.log("load");
                //     
                // })
            }
        }
    };
})
// Directive for loading page sections when user scroll the page
.directive('pageInfiniteScroll', function () {
    return function ($scope, $element, $attrs) {
        angular.element(window).bind('scroll', function () {
            if ($scope.isBottomAnchorInViewport()) {
                $scope.$apply($attrs.pageInfiniteScroll);
            }
        });
    };
});

