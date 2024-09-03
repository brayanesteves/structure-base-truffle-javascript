const Money  = artifacts.require('Money');
const expect = require('chai').expect;
const time   = require('./utils/time');

contract('Money', accounts =>{
    const [alice, bob] = accounts;
    // console.log(`Alice address ${alice}`);
    // console.log(`Bob address ${bob}`);

    let moneyInstance;
    beforeEach(async () => {
        moneyInstance = await Money.new();
    });

    // <Constructor> //
    context('Constructor:', async () => {        
        it('Init supply should be 1000.', async () => {
            const supply = await moneyInstance.supply();
            
            expect(supply.toNumber()).to.equal(1000);
        });
    
        it('Init balance "Alice" should be 1000.', async () => {
            const balance = await moneyInstance.balance(alice);
            
            expect(balance.toNumber()).to.equal(1000);
        });
    });
    // <.Constructor> //

    // <Execution> //
    context('Execution:', async () => {
        it('Unable to make a transfer without sufficient balance.', async () => {
            try {
                const result = await moneyInstance.transfer(1001, bob, { from:alice, });
                
                expect(result.receipt.status).to.equal(false);
            } catch(error) {
                expect(error.reason).to.equal('Insufficient balance.');
            }
        });

        it('Enable to make a transfer with sufficient balance.', async () => {
                                 await moneyInstance.transfer(100, bob, { from:alice, });
            const balanceAlice = await moneyInstance.balances(alice);
            const balanceBob   = await moneyInstance.balance(bob);

            expect(balanceAlice.toNumber()).to.equal(900);
            expect(balanceBob.toNumber()).to.equal(100);
        });

        it('Enable to supply with time.', async () => {
                               await time.increase();
                               await moneyInstance.addSupply({ from:bob, });
            const balanceBob = await moneyInstance.balance(bob);
            const supply     = await moneyInstance.supply();

            expect(balanceBob.toNumber()).to.equal(1000);
            expect(supply.toNumber()).to.equal(2000);
        });

        it('Add function.', async () => {
            try {
                const result = await moneyInstance.add(10, 5, { from:bob });
                
                expect(result.receipt.status).to.equal(false);
            } catch(error) {
                const result = await moneyInstance.add(10, 5, { from:alice });
                expect(result.toNumber()).to.equal(15);
            }
        });
    });
    // <.Execution> //
});