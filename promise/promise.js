class MyPromise {
    constructor(executor) {
        this.queue = [];
        this.errorHandler = () => undefined;
        this.finallyHandler = () => undefined;

        try {
            executor.call(null, this.onResolve.bind(this), this.onReject.bind(this));
        } catch (e) {
            this.errorHandler(e);
        } finally {
            this.finallyHandler();
        }
    }

    onResolve(data) {
        this.queue.forEach(callback => {
            data = callback(data);
        });

        this.finallyHandler();
    }

    onReject(error) {
        this.errorHandler(error);

        this.finallyHandler();
    }

    then(fn) {
        this.queue.push(fn);
        return this;
    }

    catch(fn) {
        this.errorHandler = fn;
        return this;
    }

    finally(fn) {
        this.finallyHandler = fn;
        return this;
    }
}

// test promise
// const promise = new MyPromise((resolve, reject) => {
//     setTimeout(() => {
//         resolve('NgRx');
//     }, 250)
// });
//
// promise
//     .then((res) => {
//         console.log('success: ', res)
//     })
//     .catch((err) => {
//         console.log('error: ', err)
//     })
//     .finally(() => {
//         console.log('finally ')
//     });

module.exports = MyPromise;
