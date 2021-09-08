import { dateUtil } from "./dateUtil";

describe('Test Suits for dateUtil', () => {
    it('Test util passed with random string', () => {
        const expectedResp = ['Comming', 'Soon'];
        const dateUtilResp = dateUtil('hfksdjhf');
        expect(dateUtilResp).toEqual(expectedResp);
    });

    it('Test util passed with proper string', () => {
        const expectedResp = ['7 Sep', '16:05'];
        const dateUtilResp = dateUtil('2021-09-07T15:05:22.909Z');
        expect(dateUtilResp).toEqual(expectedResp);
    });
});