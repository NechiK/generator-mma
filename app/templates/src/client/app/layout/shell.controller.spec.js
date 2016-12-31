/* jshint -W117, -W030 */
describe('ShellController', function() {
    var controller,
        httpBackend;

    beforeEach(function() {
        module('app.layout');
    });

    beforeEach(inject(function ($controller, $httpBackend) {
        controller = $controller('ShellController');
        httpBackend = $httpBackend;
    }));

    afterEach(function () {
        httpBackend.verifyNoOutstandingRequest();
    });

    describe('Shell controller', function() {
        it('should be created successfully', function () {
            expect(controller).to.be.defined;
        });
    });
});
