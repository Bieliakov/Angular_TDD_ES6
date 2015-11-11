
import HomeController from './HomeController';

let homeController;

export default describe('HomeController controller', () => {

    beforeEach(function(){
        homeController = new HomeController();
        console.log('homeController', homeController)
    });

    it('should have clickSubmitButton function', () => {
        expect(homeController.clickSubmitButton).toEqual(jasmine.any(Function));
    });

});

