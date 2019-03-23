require('dotenv').config()
const EthereumTx = require('ethereumjs-tx')
const truffleContract = require('truffle-contract')
const debug = require('debug')('kubide:component:blockchain')
const log = require('ololog').configure({ time: true })
const ansi = require('ansicolor').nice

log ('Inicializando variables necesarias'.cyan)

var HDWalletProvider = require("truffle-hdwallet-provider")
var Web3 = require('web3')
var web3 = new Web3(new Web3.providers.HttpProvider(process.env.ACCESS_POINT))
var private = process.env.PRIVATE_KEY
var private2 = process.env.PRIVATE_KEY_2
var HDWallet = new HDWalletProvider(private, process.env.ACCESS_POINT)
var address = HDWallet.addresses[0]

log ('Importando contrato'.cyan)
let abiDefinitionStr = process.env.ABI_DEFINITION
web3.eth.defaultAccount = address
let abiDefinition = JSON.parse(abiDefinitionStr)
let addr = process.env.CONTRACT_ADDR
var Contract = web3.eth.contract(abiDefinition)
let contract = Contract.at(addr)

log ('Habilitando la gestión de eventos'.cyan)
let eventUser = contract.newLotteryEvent()

eventUser.watch(function(err,res){
	if(!err)
	{
		log(res.args.msg.magenta+res.args.hist)
	}
})

log ('El owner del contrato es: '+contract.owner().cyan)

/*
 * Se crea la transacción para la ejecución manual de la lotería
 */

log ('Creando la transacción de ejecución manual de la lotería'.cyan)
var txRaw_execute = {
nonce: web3.eth.getTransactionCount(address),
gasPrice: "0x174876e800",
gasLimit: 3000000,
from: address,
to: contract.address,
value: 0,
data: contract.execute.getData()
}

log ('Firmando la transacción'.cyan)
var tx_execute = new EthereumTx(txRaw_execute)
tx_execute.sign(Buffer.from(private2, 'hex'))
var serializedTx_execute = tx_execute.serialize()

var signData_execute = serializedTx_execute.toString('hex')

web3.eth.sendRawTransaction('0x' +signData_execute)
