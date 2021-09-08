import { fetchApiUtil } from "./fetchApi";

global.fetch = (url: any): Promise<any> => {
    if(url === 'test-url-success') {
        return Promise.resolve({json: () => {
            return Promise.resolve([{
                id: 'test',
                name: 'testName'
            }]);
        }});
    } else {
        return Promise.reject({error: "test error message"});
    }
};

describe('Test Suits for fetchApiUtil', () => {
    it('fetch API - Success Scenario', () => {
        fetchApiUtil('test-url-success', (data: {}, error: boolean) => {
            expect(error).toBe(false);
            expect(data).toEqual([{
                id: 'test',
                name: 'testName'
            }]);
        });
    });

    it('fetch API - Error Scenario', () => {
        fetchApiUtil('test-url-error', (data: {}, error: boolean) => {
            expect(error).toBe(true);
            expect(data).toEqual({error: "test error message"});
        });
    });
});