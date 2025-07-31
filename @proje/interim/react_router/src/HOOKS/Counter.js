import { atom, selector } from 'recoil';

export const counterAtom = atom({
    key: "counterAtom",
    default: 0
});
export const counterSelector = selector({
    key: 'isEvencounterSelector',
    get: function ({ get }) {
        const currntValue = get(counterAtom);
        const isEven = (currntValue % 2 == 0)
        return isEven
    }

})