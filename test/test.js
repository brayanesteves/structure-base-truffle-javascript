const Hello = artifacts.require("Hello");

contract('Hello', accounts => {
    // console.log(accounts);

    it('Get name', async () => {
        const instance = await Hello.deployed();
        const msg      = await instance.getMessage.call({ from:accounts[0], });
        // console.log(msg);
        assert.equal(msg, 'Hello World');
    });

    it('Change messgae', async () => {
        const instance = await Hello.deployed();
        const tx       = await instance.setMessage('Bye', { from:accounts[4] });
        // console.log(accounts);
        // console.log(tx);
        const msg      = await instance.getMessage.call();
        // console.log(msg);
        assert.equal(msg, 'Bye');
    });
});