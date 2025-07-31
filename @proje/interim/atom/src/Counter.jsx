import { atom, useRecoilValue, useSetRecoilState } from 'recoil';

// Define the atom
export const counterState = atom({
    key: 'counterState',
    default: 0,
});

function Counter() {
    // Using useSetRecoilState for setting value
    const setCounter = useSetRecoilState(counterState);
    // Using useRecoilValue for reading value
    const count = useRecoilValue(counterState);

    const increment = () => {
        setCounter((prevCount) => prevCount + 1);
    };

    const decrement = () => {
        setCounter((prevCount) => prevCount - 1);
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl mb-4">Counter: {count}</h2>
            <div className="space-x-2">
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={increment}
                >
                    Increment
                </button>
                <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={decrement}
                >
                    Decrement
                </button>
            </div>
        </div>
    );
}

export default Counter;