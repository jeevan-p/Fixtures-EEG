import { isStatusSelectable } from "./isStatusSelectable";

const selectableDetails = {
    NOT_STARTED: true,
    IN_PLAY: true,
    SUSPENDED: false,
    FINISHED: false,
    SETTLED: false,
}

describe('Test suits for isStatusSelectable util', () => {
    it('return correct details for NOT_STARTED', () => {
        expect(isStatusSelectable("NOT_STARTED")).toBe(selectableDetails.NOT_STARTED);
    });

    it('return correct details for IN_PLAY', () => {
        expect(isStatusSelectable("IN_PLAY")).toBe(selectableDetails.IN_PLAY);
    });

    it('return correct details for SUSPENDED', () => {
        expect(isStatusSelectable("SUSPENDED")).toBe(selectableDetails.SUSPENDED);
    });
    
    it('return correct details for FINISHED', () => {
        expect(isStatusSelectable("FINISHED")).toBe(selectableDetails.FINISHED);
    });

    it('return correct details for SETTLED', () => {
        expect(isStatusSelectable("SETTLED")).toBe(selectableDetails.SETTLED);
    });

    it('return correct details for random string', () => {
        expect(isStatusSelectable("RandomString")).toBe(false);
    });

    it('return correct details for empty string', () => {
        expect(isStatusSelectable("")).toBe(false);
    });
});