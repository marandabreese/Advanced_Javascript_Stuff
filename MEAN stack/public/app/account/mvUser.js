angular.module('app').factory('mvUser', function($resource) {
    let UserResource = $resource('/api/users/:id', {_id: '@id'});

    UserResource.prototype.isAdmin = function() {
        return this.roles && this.roles.indexOf('admin') > -1;
    }

    return UserResource;
})