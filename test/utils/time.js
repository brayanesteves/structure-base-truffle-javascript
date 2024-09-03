async function increase() {
    /**
     * Nomenclature:
     * 0) 60 => seg,
     * 1) 60 => min,
     * 2) 24 => 24 hours that the day has,
     * 3) 7  => 7 days of the week,
     * 4) 1  => seg
     * 
     * Equation:
     * oneWeek = (60(seg) * 60(min) * 24(24 hours that the day has) * 7(7 days of the week)) + 1(seg)
     */
    const oneWeek = (60 * 60 * 24 * 7) + 1;

    await web3.currentProvider.send({
        jsonrpc: '2.0',
         method: 'evm_increaseTime',
         params: [oneWeek],
             id: new Date().getTime(),
    }, () => {});

    // web3.currentProvider.send({
    //     jsonrpc: '2.0',
    //      method: 'evm_mine',
    //      params: [],
    //          id: new Date().getTime(),
    // }, () => {});
}

module.exports = {
    increase,
};