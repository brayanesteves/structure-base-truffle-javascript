let app = {
    web3Provider:null,
    defaultAccount:null,
    contractAddress:null,
    sign:null,

    initWeb3: async () => {
        if(ethereum) {
            web3 = new Web3(ethereum);
            try {
                await ethereum.enable();
                app.defaultAccount = await web3.eth.accounts[0];
                $('#defaultAccount').val(app.defaultAccount);
            } catch(err) {
                alert(err);
            }
        } else if(typeof web3 !== 'undefined') {
            app.web3Provider   = web3.currentProvider;
            web3               = new Web3(app.web3Provider);
            app.defaultAccount = await web3.eth.accounts[0];
            $('#defaultAccount').val(app.defaultAccount);
        } else {
            alert('Necesitas tener "Metamask" instalado.');
            return;
        }
        return actualizar();
    }
};

function actualizar() {
    setInterval(async () => {
        app.defaultAccount = await web3.eth.accounts[0];
        $('#addressUsed').html(`<strong>Origen</strong>: ${app.defaultAccount}`);
        $('#defaultAccount').val(app.defaultAccount);
    }, 1000);
}

$('#sign').on('click', () => {
    const address = $('#pagadorAddress').attr('data-content');
    const hash    = $('#hash').attr('data-content');

    if(address === app.defaultAccount) {
        web3.personal.sign(hash, app.defaultAccount, (err, signature) => {
            app.sign = signature;

            Swal.fire({
                            title:'Firma:',
                             text:signature,
                             type:'success',
                confirmButtonText:'Ok',
            });
        });
    } else {
        alert('Error: Estas intentando firmar con una "address" diferente.');
    }
});

$(() => {
    $(window).load(() => {
        app.initWeb3();
    });
});