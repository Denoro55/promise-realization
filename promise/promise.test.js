const myPromise = require('./promise');

describe('My Promise', () => {
    let promise;
    let executorFn;

    let successValue = 2;
    let errorValue = 'error';

    beforeEach(() => {
        executorFn = jest.fn((resolve) => {
            setTimeout(() => {
                resolve(successValue);
            }, 150)
        });
        promise = new myPromise(executorFn);
    });

    test('promise should exists and typeof promise is function', () => {
        expect(typeof myPromise).toBeDefined();
        expect(typeof myPromise).toBe('function');
    });

    test('promise should has methods: then, catch, finally', () => {
        expect(promise.then).not.toBeUndefined();
        expect(promise.catch).not.toBeUndefined();
        expect(promise.finally).toBeDefined()
    });

    test('promise should has executor function', () => {
        expect(executorFn).toHaveBeenCalled();
    });

    test('promise should get data in then block and chain them', async () => {
        const result = await promise.then(v => v).then(v => v * v);
        expect(result).toBe(successValue * successValue);
    });

    test('promise should catches errors', () => {
        const errorExecutor = (_, reject) => setTimeout(() => {
            reject(errorValue)
        }, 150);
        const errorPromise = new myPromise(errorExecutor);

        return new Promise((resolve, reject) => {
            errorPromise.catch((data) => {
                expect(data).toBe(errorValue);
                resolve();
            })
        })
    });

    test('promise should has finally callback', async () => {
        const finallySpy = jest.fn(() => {});
        await promise.finally(finallySpy);

        expect(finallySpy).toHaveBeenCalled();
    });
});
