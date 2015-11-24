import SearchDirective from './search.directive.js';
describe('SearchDirective', () => {

    let sut;
    let mockTemplate = '<github-search></github-search>'

    it('should be a function', () => {
        expect(SearchDirective).toEqual(jasmine.any(Function));
    });

    describe('when invoked', () => {

        beforeEach(() => {
            sut = SearchDirective(mockTemplate);
        });

        describe('should return an object', () => {

            it('. It should be an object', () => {
                expect(sut).toEqual(jasmine.any(Object));
            });

            it('with a template property', () => {
                expect(sut.template).toEqual(jasmine.any(String));
            });

        });
    });
});