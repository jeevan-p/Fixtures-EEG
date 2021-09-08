import { getIconClass } from "./getIconClass";

const classDetails = {
    NOT_STARTED: "not-started-icon",
    IN_PLAY: 'in-play-icon',
    SUSPENDED: "suspended-icon",
    FINISHED: "finished-icon",
    SETTLED: "settled-icon"
}

describe('Test suits for getIconClass util', () => {
    it('return correct class for NOT_STARTED', () => {
        const resp = getIconClass('NOT_STARTED');
        expect(resp).toBe(classDetails.NOT_STARTED);
    });

    it('return correct class for IN_PLAY', () => {
        const resp = getIconClass('IN_PLAY');
        expect(resp).toBe(classDetails.IN_PLAY);
    });

    it('return correct class for SUSPENDED', () => {
        const resp = getIconClass('SUSPENDED');
        expect(resp).toBe(classDetails.SUSPENDED);
    });

    it('return correct class for FINISHED', () => {
        const resp = getIconClass('FINISHED');
        expect(resp).toBe(classDetails.FINISHED);
    });

    it('return correct class for SETTLED', () => {
        const resp = getIconClass('SETTLED');
        expect(resp).toBe(classDetails.SETTLED);
    });

    it('return correct class for invalid data', () => {
        const resp = getIconClass('Some String');
        expect(resp).toBe('');
    });

    it('return correct class for empty string', () => {
        const resp = getIconClass('');
        expect(resp).toBe('');
    });
});